import React, { useState } from 'react';
import { DFA } from '../types/dfa';
import { Settings, Plus, Trash2 } from 'lucide-react';

interface DFABuilderProps {
  onDFACreated: (dfa: DFA) => void;
}

export const DFABuilder: React.FC<DFABuilderProps> = ({ onDFACreated }) => {
  const [numberOfAlph, setNumberOfAlph] = useState(2);
  const [numberOfStates, setNumberOfStates] = useState(3);
  const [initialState, setInitialState] = useState(0);
  const [finalStates, setFinalStates] = useState<number[]>([]);
  const [alphabetType, setAlphabetType] = useState<'binary' | 'letters'>('binary');
  const [transitionTable, setTransitionTable] = useState<number[][]>([]);
  const [newFinalState, setNewFinalState] = useState('');

  React.useEffect(() => {
    // Initialize transition table when states or alphabet changes
    const newTable = Array(numberOfStates).fill(null).map(() => 
      Array(numberOfAlph).fill(0)
    );
    setTransitionTable(newTable);
  }, [numberOfStates, numberOfAlph]);

  const handleTransitionChange = (state: number, symbol: number, nextState: number) => {
    const newTable = [...transitionTable];
    newTable[state][symbol] = nextState;
    setTransitionTable(newTable);
  };

  const addFinalState = () => {
    const state = parseInt(newFinalState);
    if (!isNaN(state) && state >= 0 && state < numberOfStates && !finalStates.includes(state)) {
      setFinalStates([...finalStates, state]);
      setNewFinalState('');
    }
  };

  const removeFinalState = (state: number) => {
    setFinalStates(finalStates.filter(s => s !== state));
  };

  const createDFA = () => {
    if (finalStates.length === 0) {
      alert('Please add at least one final state');
      return;
    }

    const dfa: DFA = {
      numberOfAlph,
      numberOfStates,
      initialState,
      finalStates,
      transitionTable,
      alphabetType
    };

    onDFACreated(dfa);
  };

  const getAlphabetSymbol = (index: number) => {
    return alphabetType === 'binary' ? index.toString() : String.fromCharCode(97 + index);
  };

  return (
    <div className="card p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-6 h-6 text-primary-600" />
        <h2 className="text-2xl font-bold text-slate-800">DFA Configuration</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Alphabet Type
          </label>
          <select
            value={alphabetType}
            onChange={(e) => setAlphabetType(e.target.value as 'binary' | 'letters')}
            className="input-field"
          >
            <option value="binary">Binary (0, 1)</option>
            <option value="letters">Letters (a, b, c...)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Number of Alphabet Symbols (Σ)
          </label>
          <input
            type="number"
            min="2"
            max="10"
            value={numberOfAlph}
            onChange={(e) => setNumberOfAlph(parseInt(e.target.value) || 2)}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Number of States (Q)
          </label>
          <input
            type="number"
            min="1"
            max="20"
            value={numberOfStates}
            onChange={(e) => setNumberOfStates(parseInt(e.target.value) || 1)}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Initial State (q₀)
          </label>
          <select
            value={initialState}
            onChange={(e) => setInitialState(parseInt(e.target.value))}
            className="input-field"
          >
            {Array.from({ length: numberOfStates }, (_, i) => (
              <option key={i} value={i}>State {i}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-slate-700 mb-3">
          Final States (F)
        </label>
        <div className="flex gap-2 mb-3">
          <select
            value={newFinalState}
            onChange={(e) => setNewFinalState(e.target.value)}
            className="input-field flex-1"
          >
            <option value="">Select a state</option>
            {Array.from({ length: numberOfStates }, (_, i) => (
              <option key={i} value={i}>State {i}</option>
            ))}
          </select>
          <button
            onClick={addFinalState}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {finalStates.map(state => (
            <div
              key={state}
              className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-2 text-sm font-medium"
            >
              State {state}
              <button
                onClick={() => removeFinalState(state)}
                className="text-green-600 hover:text-green-800 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-3">Transition Table</h3>
        <div className="overflow-x-auto">
          <table className="transition-table w-full">
            <thead>
              <tr>
                <th>State</th>
                {Array.from({ length: numberOfAlph }, (_, i) => (
                  <th key={i}>δ(q, {getAlphabetSymbol(i)})</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: numberOfStates }, (_, state) => (
                <tr key={state} className="hover:bg-slate-50 transition-colors">
                  <td className="font-medium">
                    q{state} {state === initialState && '(start)'}
                    {finalStates.includes(state) && ' (final)'}
                  </td>
                  {Array.from({ length: numberOfAlph }, (_, symbol) => (
                    <td key={symbol}>
                      <select
                        value={transitionTable[state]?.[symbol] || 0}
                        onChange={(e) => handleTransitionChange(state, symbol, parseInt(e.target.value))}
                        className="w-full px-2 py-1 border border-slate-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        {Array.from({ length: numberOfStates }, (_, i) => (
                          <option key={i} value={i}>q{i}</option>
                        ))}
                      </select>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button
        onClick={createDFA}
        className="btn-primary w-full text-lg py-3"
      >
        Create DFA
      </button>
    </div>
  );
};
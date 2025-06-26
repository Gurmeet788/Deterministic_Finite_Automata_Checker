import React, { useState } from 'react';
import { DFA, SimulationResult } from '../types/dfa';
import { DFASimulator } from '../utils/dfaSimulator';
import { Play, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface StringTesterProps {
  dfa: DFA;
  onReset: () => void;
}

export const StringTester: React.FC<StringTesterProps> = ({ dfa, onReset }) => {
  const [inputString, setInputString] = useState('');
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [error, setError] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);

  const simulator = new DFASimulator(dfa);

  const testString = async () => {
    if (!inputString.trim()) {
      setError('Please enter a string to test');
      return;
    }

    setIsSimulating(true);
    setError('');
    
    try {
      // Add a small delay for animation effect
      await new Promise(resolve => setTimeout(resolve, 300));
      
      if (!simulator.validateInput(inputString)) {
        throw new Error(`Invalid characters in input string for ${dfa.alphabetType} alphabet`);
      }

      const simulationResult = simulator.simulate(inputString);
      setResult(simulationResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResult(null);
    } finally {
      setIsSimulating(false);
    }
  };

  const getAlphabetInfo = () => {
    if (dfa.alphabetType === 'binary') {
      return 'Binary alphabet (0, 1)';
    } else {
      const symbols = Array.from({ length: dfa.numberOfAlph }, (_, i) => 
        String.fromCharCode(97 + i)
      ).join(', ');
      return `Letter alphabet (${symbols})`;
    }
  };

  const getStepByStepTrace = () => {
    if (!result || !inputString) return [];
    
    try {
      return simulator.getSimulationSteps(inputString);
    } catch {
      return [];
    }
  };

  return (
    <div className="space-y-6">
      {/* DFA Summary */}
      <div className="card p-6 animate-slide-up">
        <h3 className="text-xl font-bold text-slate-800 mb-4">DFA Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-semibold text-slate-600">Alphabet:</span> {getAlphabetInfo()}
          </div>
          <div>
            <span className="font-semibold text-slate-600">States:</span> {dfa.numberOfStates} states
          </div>
          <div>
            <span className="font-semibold text-slate-600">Initial State:</span> q{dfa.initialState}
          </div>
          <div>
            <span className="font-semibold text-slate-600">Final States:</span> {
              dfa.finalStates.map(s => `q${s}`).join(', ')
            }
          </div>
        </div>
      </div>

      {/* String Input */}
      <div className="card p-6 animate-slide-up">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Test String</h3>
        <div className="flex gap-3">
          <input
            type="text"
            value={inputString}
            onChange={(e) => setInputString(e.target.value)}
            placeholder={`Enter string (${dfa.alphabetType === 'binary' ? '0,1' : 'a,b,c...'})`}
            className="input-field flex-1"
            onKeyPress={(e) => e.key === 'Enter' && testString()}
          />
          <button
            onClick={testString}
            disabled={isSimulating}
            className="btn-primary flex items-center gap-2 min-w-[120px] justify-center"
          >
            {isSimulating ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            ) : (
              <>
                <Play className="w-4 h-4" />
                Test
              </>
            )}
          </button>
        </div>
        
        {error && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}
      </div>

      {/* Results */}
      {result && (
        <div className="card p-6 animate-slide-up">
          <div className="flex items-center gap-3 mb-4">
            {result.accepted ? (
              <CheckCircle className="w-6 h-6 text-green-600" />
            ) : (
              <XCircle className="w-6 h-6 text-red-600" />
            )}
            <h3 className="text-xl font-bold text-slate-800">
              String {result.accepted ? 'Accepted' : 'Rejected'}
            </h3>
          </div>

          <div className={`p-4 rounded-lg mb-4 ${
            result.accepted 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            <div className="font-semibold mb-2">Result Summary:</div>
            <div>Input: "{inputString}"</div>
            <div>Final State: q{result.finalState}</div>
            <div>Status: {result.accepted ? 'ACCEPTED' : 'REJECTED'}</div>
          </div>

          {/* Step-by-step trace */}
          {inputString && (
            <div>
              <h4 className="font-semibold text-slate-700 mb-3">Execution Trace:</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-16 text-center font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    q{dfa.initialState}
                  </div>
                  <span className="text-slate-600">Initial state</span>
                </div>
                
                {getStepByStepTrace().map((step, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-16 text-center font-mono bg-slate-100 text-slate-700 px-2 py-1 rounded">
                      q{step.currentState}
                    </div>
                    <span className="text-slate-500">→</span>
                    <div className="w-8 text-center font-mono bg-amber-100 text-amber-800 px-2 py-1 rounded">
                      {step.inputChar}
                    </div>
                    <span className="text-slate-500">→</span>
                    <div className="w-16 text-center font-mono bg-slate-100 text-slate-700 px-2 py-1 rounded">
                      q{step.nextState}
                    </div>
                  </div>
                ))}
                
                <div className={`flex items-center gap-2 text-sm font-semibold ${
                  result.accepted ? 'text-green-700' : 'text-red-700'
                }`}>
                  <div className={`w-16 text-center font-mono px-2 py-1 rounded ${
                    result.accepted 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    q{result.finalState}
                  </div>
                  <span>
                    {result.accepted ? '✓ Final state (ACCEPT)' : '✗ Not a final state (REJECT)'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Reset Button */}
      <div className="flex justify-center">
        <button
          onClick={onReset}
          className="btn-secondary flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Create New DFA
        </button>
      </div>
    </div>
  );
};
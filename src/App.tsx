import React, { useState } from 'react';
import { DFABuilder } from './components/DFABuilder';
import { StringTester } from './components/StringTester';
import { DFA } from './types/dfa';
import { Cpu, Github, University } from 'lucide-react';

function App() {
  const [dfa, setDFA] = useState<DFA | null>(null);

  const handleDFACreated = (newDFA: DFA) => {
    setDFA(newDFA);
  };

  const handleReset = () => {
    setDFA(null);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary-100 rounded-xl">
              <Cpu className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
              DFA Simulator
            </h1>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Design and simulate Deterministic Finite Automata with an intuitive web interface. 
            Define states, transitions, and test string acceptance in real-time.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {!dfa ? (
            <DFABuilder onDFACreated={handleDFACreated} />
          ) : (
            <StringTester dfa={dfa} onReset={handleReset} />
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-slate-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <University className="w-4 h-4" />
              <span>DHA Suffa University</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Theory of Computation Project</span>
              <a
                href="https://github.com/gurmeet788"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-primary-600 transition-colors"
              >
                <Github className="w-4 h-4" />
                gurmeet788
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
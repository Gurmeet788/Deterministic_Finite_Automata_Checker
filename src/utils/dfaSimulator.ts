import { DFA, SimulationResult, SimulationStep } from '../types/dfa';

export class DFASimulator {
  private dfa: DFA;

  constructor(dfa: DFA) {
    this.dfa = dfa;
  }

  simulate(inputString: string): SimulationResult {
    const path: number[] = [this.dfa.initialState];
    let currentState = this.dfa.initialState;

    for (const char of inputString) {
      const symbolIndex = this.getSymbolIndex(char);
      
      if (symbolIndex === -1) {
        throw new Error(`Invalid character '${char}' for the given alphabet`);
      }

      currentState = this.dfa.transitionTable[currentState][symbolIndex];
      path.push(currentState);
    }

    const accepted = this.dfa.finalStates.includes(currentState);

    return {
      accepted,
      path,
      finalState: currentState
    };
  }

  getSimulationSteps(inputString: string): SimulationStep[] {
    const steps: SimulationStep[] = [];
    let currentState = this.dfa.initialState;

    for (const char of inputString) {
      const symbolIndex = this.getSymbolIndex(char);
      
      if (symbolIndex === -1) {
        throw new Error(`Invalid character '${char}' for the given alphabet`);
      }

      const nextState = this.dfa.transitionTable[currentState][symbolIndex];
      
      steps.push({
        currentState,
        inputChar: char,
        nextState
      });

      currentState = nextState;
    }

    return steps;
  }

  private getSymbolIndex(char: string): number {
    if (this.dfa.alphabetType === 'binary') {
      if (char === '0') return 0;
      if (char === '1') return 1;
      return -1;
    } else {
      const charCode = char.toLowerCase().charCodeAt(0);
      const aCode = 'a'.charCodeAt(0);
      const index = charCode - aCode;
      
      if (index >= 0 && index < this.dfa.numberOfAlph) {
        return index;
      }
      return -1;
    }
  }

  validateInput(inputString: string): boolean {
    for (const char of inputString) {
      if (this.getSymbolIndex(char) === -1) {
        return false;
      }
    }
    return true;
  }
}
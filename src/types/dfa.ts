export interface DFA {
  numberOfAlph: number;
  numberOfStates: number;
  initialState: number;
  finalStates: number[];
  transitionTable: number[][];
  alphabetType: 'binary' | 'letters';
}

export interface SimulationResult {
  accepted: boolean;
  path: number[];
  finalState: number;
}

export interface SimulationStep {
  currentState: number;
  inputChar: string;
  nextState: number;
}
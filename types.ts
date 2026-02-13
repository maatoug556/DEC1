
export interface Riddle {
  id: number;
  question: string;
  answer: string;
  hint: string;
}

export enum AppTab {
  HOME = 'home',
  ORGANIZE = 'organize',
  RELAX = 'relax',
  GAMES = 'games',
  ABOUT = 'about'
}

export interface Task {
  id: string;
  text: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

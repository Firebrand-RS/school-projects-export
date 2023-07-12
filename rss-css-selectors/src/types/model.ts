import { BaseComponent } from '../components/base.component';

export interface IGameLevel {
  helpTitle?: string;
  selectorName?: string;
  doThis: string;
  selector: string;
  syntax: string;
  help: string;
  examples?: string[];
  boardMarkup: string;
  isComplete?: boolean;
  isWithHelp?: boolean;
  isNew?: boolean;
}

export interface ISelectedLevel {
  levels: IGameLevel[];
  currentLevel: IGameLevel;
}

export interface ICodeViewConfig {
  title: string;
  filename: string;
  content: BaseComponent<HTMLElement>[];
}

export interface IStoredProgress {
  [key: string]: {
    isComplete?: boolean;
    isWithHelp?: boolean;
  };
}

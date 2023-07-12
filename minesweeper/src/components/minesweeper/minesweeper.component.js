import './minesweeper.component.scss';
import { BaseComponent } from '../base.component';

export class MinesweeperComponent extends BaseComponent {
  constructor() {
    super({ className: ['minesweeper'] });
  }
}

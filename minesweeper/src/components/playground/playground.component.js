import './playground.component.scss';
import { BaseComponent } from '../base.component';
import { TimerComponent } from '../timer/timer.component';
import { InfoFieldComponent } from '../info-field/info-field.component';

export class PlaygroundComponent extends BaseComponent {
  infoBar = null;
  board = null;
  timer = null;
  time = null;
  steps = null;
  unmarkedMines = null;
  constructor({ className }) {
    super({ className: [className, 'playground'] });

    this.steps = new InfoFieldComponent({ labelText: 'moves' });
    this.timer = new TimerComponent({ className: 'minesweeper__timer' });
    this.time = new InfoFieldComponent({ labelText: 'seconds' });
    this.unmarkedMines = new InfoFieldComponent({ labelText: 'unmarked' });
    this.infoBar = new BaseComponent({ className: 'minesweeper__info-bar' });
    this.infoBar.append(this.time, this.steps, this.unmarkedMines);

    this.board = new BaseComponent({
      className: ['minesweeper__board', 'board'],
    });

    this.append(this.infoBar, this.board);
  }

  setStepsComponentValue(value) {
    const formattedValue = value.toString().padStart(2, '0');
    this.steps.setValue(formattedValue);
  }

  setTimerValue(seconds) {
    const formattedTime = {
      minutes: Math.floor(seconds / 60)
        .toString()
        .padStart(2, '0'),
      seconds: (seconds % 60).toString().padStart(2, '0'),
    };
    this.timer.setTime(formattedTime);
  }

  setTimeValue(seconds) {
    const formattedValue = seconds.toString().padStart(2, '0');
    this.time.setValue(formattedValue);
  }

  setUnmarkedMinesValue(value) {
    let formattedValue;
    if (value < 0 && value > -10) {
      formattedValue = value.toString().split('');
      formattedValue = [].concat(formattedValue[0], '0', formattedValue[1]).join('');
    } else {
      formattedValue = value.toString().padStart(2, '0');
    }
    this.unmarkedMines.setValue(formattedValue);
  }

  setContextHandler(handler) {
    this.node.addEventListener('contextmenu', handler);
  }
}

import './timer.component.scss';
import { BaseComponent } from '../base.component';
import { InfoFieldComponent } from '../info-field/info-field.component';

export class TimerComponent extends BaseComponent {
  constructor({ className }) {
    super({ className: [className, 'timer'] });
    this.minutesComponent = new InfoFieldComponent({
      labelText: 'minutes',
      className: 'timer__minutes',
    });
    this.secondsComponent = new InfoFieldComponent({
      labelText: 'seconds',
      className: 'timer__seconds',
    });
    this.append(this.minutesComponent, this.secondsComponent);
    this.append(
      new BaseComponent({
        tagName: 'p',
        className: 'timer__divider',
        textContent: ':',
      })
    );
  }

  setTime({ minutes, seconds }) {
    this.minutesComponent.setValue(minutes);
    this.secondsComponent.setValue(seconds);
  }
}

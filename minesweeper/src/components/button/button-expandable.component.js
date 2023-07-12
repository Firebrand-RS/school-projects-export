import './button-expandable.component.scss';
import { BaseComponent } from '../base.component';
import { RangeInputComponent } from '../input/range-input.component';
import { SVGComponent } from '../svg.component';

export class ButtonExpandableComponent extends BaseComponent {
  constructor({ icon, className = [], min, max, value }) {
    super({ className: [className, 'button-expandable', 'button'] });

    if (icon) {
      this.append(new SVGComponent(icon));
    }

    this.rangeInputComponent = new RangeInputComponent({ min: min, max: max, value: value });
    this.outputField = new BaseComponent({ tagName: 'output', className: 'button-expandable__output' });
    this.append(this.outputField, this.rangeInputComponent);
  }

  getSliderValue() {
    return this.rangeInputComponent.getValue();
  }

  setSliderValue(value) {
    this.rangeInputComponent.setValue(value);
  }

  setOutputValue(value) {
    this.outputField.getElement().textContent = value;
  }
}

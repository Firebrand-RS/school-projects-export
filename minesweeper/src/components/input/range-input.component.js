import './range-input.component.scss';
import { BaseComponent } from '../base.component';

export class RangeInputComponent extends BaseComponent {
  constructor({ className = [], min = '0', max = '10', value = '0', step = '1' }) {
    super({ tagName: 'input', className: [className, 'range-slider'] });
    this.node.setAttribute('type', 'range');
    this.node.setAttribute('min', min.toString());
    this.node.setAttribute('max', max.toString());
    this.node.setAttribute('value', value.toString());
    this.node.setAttribute('step', step.toString());
  }

  getValue() {
    return this.node.value;
  }

  setValue(value) {
    this.node.value = value;
  }
}

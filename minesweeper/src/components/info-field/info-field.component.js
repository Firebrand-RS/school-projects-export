import './info-field.component.scss';
import { BaseComponent } from '../base.component';

export class InfoFieldComponent extends BaseComponent {
  constructor({ labelText, className = [] }) {
    super({ tagName: 'p', className: [className, 'info-field'] });
    const labelComponent = new BaseComponent({
      tagName: 'span',
      textContent: labelText,
      className: 'info-field__label',
    });
    this.valueComponent = new BaseComponent({
      tagName: 'output',
      textContent: '00',
      className: 'info-field__value',
    });
    this.append(labelComponent, this.valueComponent);
  }

  setValue(value) {
    this.valueComponent.getElement().textContent = value;
  }
}

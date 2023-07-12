import './button.component.scss';
import { BaseComponent } from '../base.component';

export class ButtonComponent extends BaseComponent {
  iconComponent = null;
  constructor({ textContent, a11yLabel, iconComponent, className = [] }) {
    super({ tagName: 'button', className: [className, 'button'], textContent });
    this.iconComponent = iconComponent;

    if (this.iconComponent) {
      this.append(this.iconComponent);
    }

    if (a11yLabel) {
      const label = new BaseComponent({
        tagName: 'span',
        className: 'visually-hidden',
        textContent: a11yLabel,
      });
      this.append(label);
    }
  }

  switchIcon(newIconComponent) {
    if (this.iconComponent) {
      this.iconComponent.getElement().replaceWith(newIconComponent.getElement());
      this.iconComponent = newIconComponent;
    } else {
      this.iconComponent = newIconComponent;
      this.append(this.iconComponent);
    }
  }
}

import './modal.component.scss';
import { BaseComponent } from '../base.component';
import { ButtonComponent } from '../button/button.component';

export class EndGameModalComponent extends BaseComponent {
  constructor({ className = [], textContent }) {
    super({ className: [className, 'modal'] });

    this.background = new BaseComponent({ className: 'modal__background' });
    const container = new BaseComponent({ className: 'modal__container' });
    const text = new BaseComponent({ className: 'modal__text', textContent });
    this.submitButton = new ButtonComponent({ className: 'modal__button', textContent: 'OK' });

    container.append(text, this.submitButton);
    this.background.append(container);
    this.append(this.background);
  }

  setSubmitClickHandler(handler) {
    this.submitButton.getElement().addEventListener('click', handler);
  }
}

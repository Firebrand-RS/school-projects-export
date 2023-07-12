import './modal.component.scss';
import { BaseComponent } from '../base.component';
import { ListComponent } from '../list.component';
import { ButtonComponent } from '../button/button.component';

export class ScoreTableModalComponent extends BaseComponent {
  constructor({ className = [], items } = {}) {
    super({ className: [className, 'modal'], tagName: 'article' });
    let content = null;
    if (items) {
      content = new ListComponent({ tagName: 'ul', className: 'modal__list', items: items });
    } else {
      content = new BaseComponent({ className: 'modal__text', textContent: 'No records' });
    }

    this.background = new BaseComponent({ className: 'modal__background' });
    const container = new BaseComponent({ className: 'modal__container' });
    const title = new BaseComponent({ tagName: 'h1', className: 'modal__title', textContent: 'score table' });
    this.submitButton = new ButtonComponent({ className: 'modal__button', textContent: 'OK' });

    container.append(title, content, this.submitButton);
    this.background.append(container);
    this.append(this.background);
  }

  setSubmitClickHandler(handler) {
    this.submitButton.getElement().addEventListener('click', handler);
  }
}

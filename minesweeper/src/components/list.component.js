import { BaseComponent } from './base.component';

export class ListComponent extends BaseComponent {
  constructor({ tagName, className, items }) {
    super({ tagName, className });

    if (!items) {
      throw new Error('items have not been added');
    } else {
      for (let item of items) {
        if (item instanceof BaseComponent) {
          const listItemComponent = new BaseComponent({ tagName: 'li' });
          listItemComponent.append(item);
          this.append(listItemComponent);
        } else {
          throw new Error('item is not a component');
        }
      }
    }
  }
}

import './tile.component.scss';
import { BaseComponent } from '../base.component';
import { SVGComponent } from '../svg.component';
import { SvgIcons } from '../../enums/svg-icons';

const MINE_CHAR = '*';
const COLOR_VARIANT_CLASSES = [
  'tile__content--color-variant-1st',
  'tile__content--color-variant-2nd',
  'tile__content--color-variant-3rd',
];

export class TileComponent extends BaseComponent {
  constructor({ cellData, className = [] }) {
    super({ className: [className, 'tile'] });

    const { id, isMarked, isCovered, value } = cellData;
    this.isMarked = isMarked;
    this.isCovered = isCovered;
    this.value = value;
    this.id = id;

    if (this.value === MINE_CHAR) {
      this.content = new BaseComponent({
        tagName: 'span',
        className: 'tile__content',
      });
      this.content.append(new SVGComponent({ template: SvgIcons.MINE }));
    } else {
      let colorVariantClass;
      if (this.value === MINE_CHAR) {
        colorVariantClass = '';
      } else {
        const cycle = COLOR_VARIANT_CLASSES.length;
        const index = this.value % cycle;
        colorVariantClass = COLOR_VARIANT_CLASSES[index];
      }
      this.content = new BaseComponent({
        tagName: 'span',
        className: [colorVariantClass, 'tile__content'],
        textContent: this.value === 0 ? '' : this.value,
      });
    }
    this.append(this.content);
    if (isCovered) {
      this.cover = new BaseComponent({ className: 'tile__cover' });
      if (this.isMarked) {
        this.cover.append(new SVGComponent({ template: SvgIcons.MARK }));
      }
      this.append(this.cover);
    }
  }

  setLeftClickHandler(handler) {
    this.leftClickHandler = handler;
    this.node.addEventListener('click', this.leftClickHandler);
  }

  setRightClickHandler(handler) {
    this.rigthClickHandler = handler;
    this.node.addEventListener('contextmenu', this.rigthClickHandler);
  }

  removeHandlers() {
    this.node.removeEventListener('click', this.leftClickHandler);
    this.node.removeEventListener('contextmenu', this.rigthClickHandler);
  }
}

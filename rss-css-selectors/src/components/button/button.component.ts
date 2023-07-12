import './button.component.scss';
import { IButtonConfig } from '../../types/constructor-config-options';
import { mergeConfigs } from '../../utils/merge-configs';
import { BaseComponent } from '../base.component';
import { getElementFromTemplate } from '../../utils/get-element-from-template';
import { Svg } from '../../enums/svg';

type NodeInterface = HTMLButtonElement;

const componentBaseConfig: IButtonConfig = {
  tagName: 'button',
  className: 'button',
};

export class ButtonComponent extends BaseComponent<NodeInterface> {
  constructor(constructorConfig?: IButtonConfig) {
    const resultConfig = mergeConfigs<IButtonConfig>(componentBaseConfig, constructorConfig);
    super(resultConfig);
    this.node.type = resultConfig.type ?? 'button';
    if (resultConfig.svgIcon) {
      const icon = getElementFromTemplate<Svg>(resultConfig.svgIcon);
      this.setSvgIcon(icon);
    }
    if (resultConfig.allyLabel) {
      this.append(
        new BaseComponent({ tagName: 'span', className: 'visually-hidden', textContent: resultConfig.allyLabel })
      );
    }
  }

  private setSvgIcon(icon: SVGElement) {
    this.node.append(icon);
  }

  public setClickHandler(handler: unknown) {
    if (typeof handler !== 'function') {
      return;
    }

    this.getNode().addEventListener('click', (evt) => {
      if (evt.target instanceof Element) {
        const isButton = evt.target.closest('button');
        if (isButton) {
          handler();
        }
      }
    });
  }
}

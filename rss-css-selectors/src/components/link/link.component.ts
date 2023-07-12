import './link.component.scss';
import { mergeConfigs } from '../../utils/merge-configs';
import { BaseComponent } from '../base.component';
import { ILinkConfig } from '../../types/constructor-config-options';
import { getElementFromTemplate } from '../../utils/get-element-from-template';
import { Svg } from '../../enums/svg';

type NodeInterface = HTMLAnchorElement;

const componentBaseConfig: ILinkConfig = {
  tagName: 'a',
  className: 'link',
};

export class LinkComponent extends BaseComponent<NodeInterface> {
  constructor(constructorConfig?: ILinkConfig) {
    const resultConfig = mergeConfigs<ILinkConfig>(componentBaseConfig, constructorConfig);
    super(resultConfig);

    if (resultConfig.svgIcon) {
      const icon = getElementFromTemplate<Svg>(resultConfig.svgIcon);
      this.setSvgIcon(icon);
    }

    if (resultConfig.allyLabel) {
      this.append(
        new BaseComponent({ tagName: 'span', className: 'visually-hidden', textContent: resultConfig.allyLabel })
      );
    }

    if (resultConfig.href) {
      this.node.href = resultConfig.href;
    }
  }

  private setSvgIcon(icon: SVGElement) {
    this.node.append(icon);
  }
}

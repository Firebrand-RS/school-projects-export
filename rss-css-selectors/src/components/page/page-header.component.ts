import { IBaseConfig, ILinkConfig } from '../../types/constructor-config-options';
import { mergeConfigs } from '../../utils/merge-configs';
import { BaseComponent } from '../base.component';
import { Svg } from '../../enums/svg';
import { LinkComponent } from '../link/link.component';

type NodeInterface = HTMLElement;

const componentBaseConfig: IBaseConfig = {
  tagName: 'header',
};

const headerLinks: ILinkConfig[] = [
  {
    className: 'logo',
    svgIcon: Svg.LOGO,
  },
];

export class PageHeaderComponent extends BaseComponent<NodeInterface> {
  constructor(constructorConfig?: IBaseConfig) {
    const resultConfig = mergeConfigs<IBaseConfig>(componentBaseConfig, constructorConfig);
    super(resultConfig);
    this.append(...this.setLinks(headerLinks));
  }

  private setLinks(linksObject: typeof headerLinks) {
    return linksObject.map((linkRecord) => new LinkComponent(linkRecord));
  }
}

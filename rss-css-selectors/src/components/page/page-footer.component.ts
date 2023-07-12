import { IBaseConfig, ILinkConfig } from '../../types/constructor-config-options';
import { mergeConfigs } from '../../utils/merge-configs';
import { BaseComponent } from '../base.component';
import { Svg } from '../../enums/svg';
import { LinkComponent } from '../link/link.component';

type NodeInterface = HTMLElement;

const componentBaseConfig: IBaseConfig = {
  tagName: 'footer',
};

const headerLinks: ILinkConfig[] = [
  {
    className: 'link--contact-icon',
    href: 'https://github.com/Firebrand-RS',
    svgIcon: Svg.GITHUB_ICON,
    allyLabel: 'To author Github',
  },
  {
    className: 'link--contact-icon',
    href: 'https://rs.school',
    svgIcon: Svg.SCHOOL_ICON,
    allyLabel: 'To school page',
  },
];

export class PageFooterComponent extends BaseComponent<NodeInterface> {
  constructor(constructorConfig?: IBaseConfig) {
    const resultConfig = mergeConfigs<IBaseConfig>(componentBaseConfig, constructorConfig);
    super(resultConfig);
    this.append(...this.setLinks(headerLinks));
    this.append(new BaseComponent({ tagName: 'p', textContent: '2023' }));
  }

  private setLinks(linksObject: typeof headerLinks) {
    return linksObject.map((linkRecord) => new LinkComponent(linkRecord));
  }
}

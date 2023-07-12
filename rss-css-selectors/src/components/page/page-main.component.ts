import './page.component.scss';
import { mergeConfigs } from '../../utils/merge-configs';
import { BaseComponent } from '../base.component';
import { IBaseConfig } from '../../types/constructor-config-options';

type NodeInterface = HTMLElement;

const componentBaseConfig: IBaseConfig = {
  tagName: 'main',
};

export class PageMainComponent extends BaseComponent<NodeInterface> {
  constructor(constructorConfig?: IBaseConfig) {
    const resultConfig = mergeConfigs<IBaseConfig>(componentBaseConfig, constructorConfig);
    super(resultConfig);
  }
}

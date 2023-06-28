import { mergeConfigs } from '../utils/merge-configs';
import { BaseComponent } from '../components/base.component';
import { IBaseConfig, IInputConfig } from '../types/constructor-config-options';

const componentBaseConfig: IBaseConfig = {
  tagName: 'input',
  className: 'input',
};

export class InputComponent extends BaseComponent<HTMLInputElement> {
  constructor(constructorConfig?: IInputConfig) {
    const resultConfig = mergeConfigs<IInputConfig>(componentBaseConfig, constructorConfig);
    super(resultConfig);
    this.node.type = resultConfig.type || 'text';
    this.node.placeholder = resultConfig.placeholder || '';
  }
}

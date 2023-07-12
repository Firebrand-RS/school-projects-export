import { BaseComponent } from '../components/base.component';
import { IBaseConfig } from '../types/constructor-config-options';
import { mergeConfigs } from '../utils/merge-configs';

describe('mergeConfigs', () => {
  test('should return new config object with same props', () => {
    const baseConfig: IBaseConfig = {
      tagName: 'button',
      className: 'button',
      parentComponent: new BaseComponent(),
    };
    const additConfig = {
      className: 'game__button',
      title: 'test title',
    };
    const resultConfig = {
      tagName: 'button',
      className: ['button', 'game__button'],
      parentComponent: new BaseComponent(),
      title: 'test title',
    };

    expect(mergeConfigs(baseConfig, additConfig)).toEqual(resultConfig);
  });
});

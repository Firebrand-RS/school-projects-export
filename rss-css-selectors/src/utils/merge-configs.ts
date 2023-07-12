import { IBaseConfig } from '../types/constructor-config-options';

export type MergeConfigs = <T extends IBaseConfig>(baseConfig: T, additionalConfig?: T) => T;

export const mergeConfigs: MergeConfigs = (baseConfig, additionalConfig) => {
  const configClone = Object.assign({}, baseConfig, additionalConfig);

  if (baseConfig.className || additionalConfig?.className) {
    configClone.className = [];
    const baseConfigClass = baseConfig.className || [];
    const additionConfigClass = additionalConfig?.className || [];
    const mergedClasses = [baseConfigClass, additionConfigClass].flat(1);
    configClone.className.push(...mergedClasses);
  }

  if (additionalConfig?.tagName) {
    configClone.tagName = baseConfig.tagName;
  }

  return configClone;
};

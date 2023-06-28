import { BaseComponent } from '../components/base.component';
import { Svg } from '../enums/svg';

export interface IBaseConfig {
  tagName?: string;
  className?: string | string[];
  textContent?: string;
  parentComponent?: BaseComponent<HTMLElement>;
}

export type IAdaptedConfig<ExtendElementInterface> = IBaseConfig &
  Omit<Partial<ExtendElementInterface>, keyof IBaseConfig>;

interface IIconized {
  svgIcon: Svg;
}

interface IAllyLabeled {
  allyLabel: string;
}

export interface IButtonConfig extends IAdaptedConfig<HTMLButtonElement>, Partial<IIconized>, Partial<IAllyLabeled> {}
export interface ILinkConfig extends IAdaptedConfig<HTMLAnchorElement>, Partial<IIconized>, Partial<IAllyLabeled> {}
export interface IInputConfig extends IAdaptedConfig<HTMLInputElement>, Partial<IAllyLabeled> {}
export interface ISvgConfig extends IBaseConfig, IIconized {}

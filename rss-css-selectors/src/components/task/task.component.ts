import './task.component.scss';
import { IBaseConfig } from '../../types/constructor-config-options';
import { mergeConfigs } from '../../utils/merge-configs';
import { BaseComponent } from '../base.component';
import { Svg } from '../../enums/svg';
import { ButtonComponent } from '../button/button.component';

export const componentBaseConfig: IBaseConfig = {
  tagName: 'section',
  className: 'task',
};

const ChildrenClasses = {
  ROOT: componentBaseConfig.className,
  BUTTON_PANEL: `${componentBaseConfig.className}__button-side-panel`,
  BUTTONS: 'button--navigation',
};

const ElementsText = {
  ALLY_MENU: 'Menu',
  ALLY_HELP: 'Level description',
};

export class TaskComponent extends BaseComponent<HTMLElement> {
  buttonPanel: BaseComponent<HTMLElement>;
  panelMenuButton: ButtonComponent;
  panelHelpButton: ButtonComponent;

  constructor(constructorConfig?: IBaseConfig) {
    const resultConfig = mergeConfigs<IBaseConfig>(componentBaseConfig, constructorConfig);
    super(resultConfig);

    const { buttonPanel, panelMenuButton, panelHelpButton } = this.setButtonPanel();
    this.panelMenuButton = panelMenuButton;
    this.panelHelpButton = panelHelpButton;
    this.buttonPanel = buttonPanel;
  }

  private setButtonPanel() {
    const buttonPanel = new BaseComponent({
      tagName: 'div',
      className: ChildrenClasses.BUTTON_PANEL,
      parentComponent: this,
    });
    const panelMenuButton = new ButtonComponent({
      className: ChildrenClasses.BUTTONS,
      svgIcon: Svg.MENU,
      allyLabel: ElementsText.ALLY_MENU,
      parentComponent: buttonPanel,
    });
    const panelHelpButton = new ButtonComponent({
      className: ChildrenClasses.BUTTONS,
      svgIcon: Svg.DESCRIPTION,
      allyLabel: ElementsText.ALLY_HELP,
      parentComponent: buttonPanel,
    });
    return { buttonPanel, panelMenuButton, panelHelpButton };
  }

  public setPanelMenuButtonClickHandler(handler: unknown) {
    this.panelMenuButton.setClickHandler(handler);
  }
  public setPanelHelpButtonClickHandler(handler: unknown) {
    this.panelHelpButton.setClickHandler(handler);
  }

  public setAreaClickHandler(handler: (evt: MouseEvent) => void) {
    this.getNode().addEventListener('click', (evt) => handler(evt));
  }
}

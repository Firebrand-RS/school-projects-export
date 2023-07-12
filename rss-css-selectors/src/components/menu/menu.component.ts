import './menu.component.scss';
import { BaseComponent } from '../base.component';
import { ButtonComponent } from '../button/button.component';
import { Svg } from '../../enums/svg';
import { IconClass } from '../../enums/icon-class';
import { IBaseConfig, IButtonConfig } from '../../types/constructor-config-options';
import { getElementFromTemplate } from '../../utils/get-element-from-template';
import { mergeConfigs } from '../../utils/merge-configs';
import { GlobalClass } from '../../enums/global-class';
import { ISelectedLevel } from '../../types/model';

const componentBaseConfig: IBaseConfig = {
  tagName: 'section',
  className: 'menu',
};

const ElementsText = {
  HEADLINE: 'Choose a level',
  RESET_BUTTON: 'Reset Progress',
};

const ChildrenClasses = {
  ROOT: componentBaseConfig.className,
  TITLE: `${componentBaseConfig.className}__title`,
  HEADLINE: `${componentBaseConfig.className}__headline`,
  CLOSE_BUTTON: [`${componentBaseConfig.className}__button`, 'button--navigation'],
  LIST: `${componentBaseConfig.className}__task-list`,
  LIST_ITEM: `${componentBaseConfig.className}__item`,
  LIST_ITEM_CURRENT: `${componentBaseConfig.className}__item--current`,
  LIST_ITEM_NUMBER: `${componentBaseConfig.className}__item-number`,
  LIST_ITEM_NAME: `${componentBaseConfig.className}__item-name`,
  LIST_ITEM_COMPELTE: `${componentBaseConfig.className}__item--complete`,
  COMPLETE_MARK: `${componentBaseConfig.className}__complete-mark`,
  RESET_BUTTON: [`${componentBaseConfig.className}__reset-button`, 'button--bordered'],
};

export class MenuComponent extends BaseComponent<HTMLElement> {
  taskItemComponents: BaseComponent<HTMLElement>[];
  closeButton: ButtonComponent;
  resetButton: ButtonComponent;

  constructor(levelInfoObject: ISelectedLevel, constructorConfig?: IButtonConfig) {
    const resultConfig = mergeConfigs<IButtonConfig>(componentBaseConfig, constructorConfig);
    super(resultConfig);
    const { taskItemComponents, closeButton, resetButton } = this.setChildComponents(levelInfoObject);
    this.taskItemComponents = taskItemComponents;
    this.closeButton = closeButton;
    this.resetButton = resetButton;
  }

  private setTaskListComponent(levelInfoObject: ISelectedLevel) {
    const { levels, currentLevel } = levelInfoObject;
    const levelIndex = levels.findIndex((item) => item === currentLevel);
    const listComponent = new BaseComponent({ tagName: 'ol', className: ChildrenClasses.LIST });
    const taskItemComponents = levels.map((task, index) => {
      const listItem = new BaseComponent({
        tagName: 'li',
        className: [
          ChildrenClasses.LIST_ITEM,
          task.isComplete ? ChildrenClasses.LIST_ITEM_COMPELTE : ChildrenClasses.LIST_ITEM,
          levelIndex === index ? ChildrenClasses.LIST_ITEM_CURRENT : ChildrenClasses.LIST_ITEM,
        ],
      });
      const svgIcon = getElementFromTemplate<Svg>(Svg.CHECK_MARK, IconClass.CHECK);
      const itemNumber = new BaseComponent({
        tagName: 'span',
        className: ChildrenClasses.LIST_ITEM_NUMBER,
        textContent: (index + 1).toString(),
      });
      const itemName = new BaseComponent({
        tagName: 'span',
        className: ChildrenClasses.LIST_ITEM_NAME,
        textContent: task.syntax,
      });
      listItem.append(svgIcon, itemNumber, itemName);

      if (task.isWithHelp) {
        listItem.append(getElementFromTemplate<Svg>(Svg.HELP_MARK, IconClass.HELP));
      }

      if (task.isNew) {
        listItem.append(getElementFromTemplate<Svg>(Svg.NEW_MARK, IconClass.NEW));
      }

      return listItem;
    });
    listComponent.append(...taskItemComponents);

    return { taskItemComponents, listComponent };
  }

  private setChildComponents(levelInfoObject: ISelectedLevel) {
    const allyHeader = new BaseComponent({
      tagName: 'h3',
      className: [ChildrenClasses.TITLE, GlobalClass.ALLY_HIDDEN],
      textContent: 'Menu',
    });

    const closeButton = new ButtonComponent({
      className: ChildrenClasses.CLOSE_BUTTON,
      allyLabel: 'Close menu',
      svgIcon: Svg.CROSS,
    });

    const headLine = new BaseComponent({
      tagName: 'p',
      className: ChildrenClasses.HEADLINE,
      textContent: ElementsText.HEADLINE,
    });
    headLine.append(closeButton);

    const resetButton = new ButtonComponent({
      className: ChildrenClasses.RESET_BUTTON,
      textContent: ElementsText.RESET_BUTTON,
    });

    const { taskItemComponents, listComponent } = this.setTaskListComponent(levelInfoObject);

    this.append(allyHeader, headLine, listComponent, resetButton);

    return { closeButton, resetButton, taskItemComponents };
  }

  public setCloseButtonClickHandler(handler: unknown) {
    this.closeButton.setClickHandler(handler);
  }
  public setResetButtonClickHandler(handler: unknown) {
    this.resetButton.setClickHandler(handler);
  }
  public setListItemClickHandler(handler: unknown) {
    for (const item of this.taskItemComponents) {
      item.getNode().addEventListener('click', (evt) => {
        if (typeof handler !== 'function') {
          return;
        }
        if (!(evt.target instanceof Element)) {
          return;
        }
        const listItemElement = evt.target.closest(`.${ChildrenClasses.LIST_ITEM}`);
        if (listItemElement) {
          const listElement = listItemElement.parentElement as HTMLElement;
          const selectedItemIndex = Array.from(listElement.children).findIndex((item) => item === listItemElement);
          handler(selectedItemIndex);
        }
      });
    }
  }
}

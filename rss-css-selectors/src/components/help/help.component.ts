import './help.component.scss';
import { GlobalClass } from '../../enums/global-class';
import { IconClass } from '../../enums/icon-class';
import { Svg } from '../../enums/svg';
import { IBaseConfig } from '../../types/constructor-config-options';
import { getElementFromTemplate } from '../../utils/get-element-from-template';
import { mergeConfigs } from '../../utils/merge-configs';
import { BaseComponent } from '../base.component';
import { ButtonComponent } from '../button/button.component';
import { ISelectedLevel } from '../../types/model';

const componentBaseConfig: IBaseConfig = {
  tagName: 'section',
  className: 'help',
};

const ElementsText = {
  EXAMPLES_TITLE: 'Examples',
  COMPONENT_ALLY_TITLE: 'Help',
};

const ChildrenClasses = {
  ROOT: componentBaseConfig.className,
  TITLE: `${componentBaseConfig.className}__title`,
  HEADLINE: `${componentBaseConfig.className}__headline`,
  MENU_BUTTON: `button--burger-menu`,
  NAVIGATION: `${componentBaseConfig.className}__navigation`,
  NAVIGATION_SIGN: `${componentBaseConfig.className}__navigation-sign`,
  NAVIGATION_SIGN_TEXT: `${componentBaseConfig.className}__navigation-sign-text`,
  NAVIGATION_SIGN_MARKS_CONT: `${componentBaseConfig.className}__sign-marks`,
  NAVIGATION_CONTROLS: `${componentBaseConfig.className}__navigation-controls`,
  TEXT: `${componentBaseConfig.className}__text`,
  TEXT_SELECTOR_NAME: `${componentBaseConfig.className}__text-title`,
  TEXT_HELP_TITLE: `${componentBaseConfig.className}__text-description`,
  TEXT_SYNTAX: `${componentBaseConfig.className}__text-syntax`,
  TEXT_HINT: `${componentBaseConfig.className}__text-hint`,
  TEXT_EXAMPLE_LIST: `${componentBaseConfig.className}__text-examples`,
  TEXT_EXAMPLE: `${componentBaseConfig.className}__text-example`,
  TEXT_EXAMPLE_TITLE: `${componentBaseConfig.className}__examples-title`,
};

export class HelpComponent extends BaseComponent<HTMLElement> {
  prevLevelButton: ButtonComponent;
  nextLevelButton: ButtonComponent;
  menuButton: ButtonComponent;

  constructor(selectedLevel: ISelectedLevel, constructorConfig?: IBaseConfig) {
    const resultConfig = mergeConfigs<IBaseConfig>(componentBaseConfig, constructorConfig);
    super(resultConfig);

    const allyHeader = new BaseComponent({
      tagName: 'h3',
      className: [ChildrenClasses.TITLE, GlobalClass.ALLY_HIDDEN],
      textContent: ElementsText.COMPONENT_ALLY_TITLE,
    });

    const { headLine, prevLevelButton, nextLevelButton, menuButton } = this.setHeadline(selectedLevel);
    this.prevLevelButton = prevLevelButton;
    this.nextLevelButton = nextLevelButton;
    this.menuButton = menuButton;

    const textContainer = this.setTextContent(selectedLevel);
    this.append(allyHeader, headLine, textContainer);
  }

  private setNavigationSign(selectedLevel: ISelectedLevel) {
    const navigationSign = new BaseComponent({
      tagName: 'div',
      className: ChildrenClasses.NAVIGATION_SIGN,
    });

    const { levels, currentLevel } = selectedLevel;
    const currentIndex = levels.findIndex((item) => item === currentLevel);

    const navigationSignText = new BaseComponent({
      tagName: 'span',
      className: ChildrenClasses.NAVIGATION_SIGN_TEXT,
      textContent: `Level ${currentIndex + 1} of ${levels.length}`,
    });

    const signMarkContainer = new BaseComponent({
      tagName: 'div',
      className: ChildrenClasses.NAVIGATION_SIGN_MARKS_CONT,
    });

    if (currentLevel.isComplete) {
      signMarkContainer.append(getElementFromTemplate<Svg>(Svg.CHECK_MARK, IconClass.CHECK));
    }
    if (currentLevel.isWithHelp) {
      signMarkContainer.append(getElementFromTemplate<Svg>(Svg.HELP_MARK, IconClass.HELP));
    }
    if (currentLevel.isNew) {
      signMarkContainer.append(getElementFromTemplate<Svg>(Svg.NEW_MARK, IconClass.NEW));
    }

    navigationSign.append(navigationSignText, signMarkContainer);
    return navigationSign;
  }

  private setHeadline(selectedLevel: ISelectedLevel) {
    const headLine = new BaseComponent({ tagName: 'div', className: ChildrenClasses.HEADLINE });
    const navigation = new BaseComponent({
      tagName: 'div',
      className: ChildrenClasses.NAVIGATION,
    });
    const navigationSign = this.setNavigationSign(selectedLevel);
    const prevLevelButton = new ButtonComponent({
      className: ['button--navigation', 'button--navigation-prev'],
      allyLabel: 'previous task',
      svgIcon: Svg.ARROW,
    });
    const nextLevelButton = new ButtonComponent({
      className: ['button--navigation', 'button--navigation-next'],
      allyLabel: 'next task',
      svgIcon: Svg.ARROW,
    });
    const navigationControls = new BaseComponent({
      tagName: 'div',
      className: ChildrenClasses.NAVIGATION_CONTROLS,
    });
    navigationControls.append(prevLevelButton, nextLevelButton);
    navigation.append(navigationSign, navigationControls);

    const menuButton = new ButtonComponent({
      className: ChildrenClasses.MENU_BUTTON,
      allyLabel: 'Open / close menu',
      svgIcon: Svg.MENU,
    });

    headLine.append(navigation, menuButton);
    return { headLine, prevLevelButton, nextLevelButton, menuButton };
  }

  private setTextContent(selectedLevel: ISelectedLevel) {
    const { currentLevel } = selectedLevel;
    const textContainer = new BaseComponent({ tagName: 'div', className: ChildrenClasses.TEXT });
    if (currentLevel.selectorName) {
      new BaseComponent({
        tagName: 'p',
        className: ChildrenClasses.TEXT_SELECTOR_NAME,
        textContent: currentLevel.selectorName,
        parentComponent: textContainer,
      });
    }

    if (currentLevel.helpTitle) {
      new BaseComponent({
        tagName: 'p',
        className: ChildrenClasses.TEXT_HELP_TITLE,
        textContent: currentLevel.helpTitle,
        parentComponent: textContainer,
      });
    }

    new BaseComponent({
      tagName: 'p',
      className: ChildrenClasses.TEXT_SYNTAX,
      textContent: currentLevel.syntax,
      parentComponent: textContainer,
    });

    if (currentLevel.help) {
      const hint = new BaseComponent({
        tagName: 'p',
        className: ChildrenClasses.TEXT_HINT,
        parentComponent: textContainer,
      });
      hint.getNode().append(getElementFromTemplate<string>(currentLevel.help));
    }

    if (currentLevel.examples) {
      new BaseComponent({
        tagName: 'p',
        className: ChildrenClasses.TEXT_EXAMPLE_TITLE,
        textContent: ElementsText.EXAMPLES_TITLE,
        parentComponent: textContainer,
      });
      const listComponent = new BaseComponent({
        tagName: 'ul',
        className: ChildrenClasses.TEXT_EXAMPLE_LIST,
        parentComponent: textContainer,
      });

      for (const example of currentLevel.examples) {
        const listItem = new BaseComponent({
          tagName: 'li',
          className: ChildrenClasses.TEXT_EXAMPLE,
        });
        listItem.getNode().innerHTML = example;

        listComponent.append(listItem);
      }
    }

    return textContainer;
  }

  public setPrevLevelButtonClickHandler(handler: unknown) {
    this.prevLevelButton.setClickHandler(handler);
  }
  public setNextLevelButtonClickHandler(handler: unknown) {
    this.nextLevelButton.setClickHandler(handler);
  }
  public setMenuButtonClickHandler(handler: unknown) {
    this.menuButton.setClickHandler(handler);
  }
}

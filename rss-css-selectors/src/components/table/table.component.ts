import './table.component.scss';
import { IBaseConfig } from '../../types/constructor-config-options';
import { mergeConfigs } from '../../utils/merge-configs';
import { BaseComponent } from '../base.component';
import { GlobalClass } from '../../enums/global-class';
import { IGameLevel } from '../../types/model';

const componentBaseConfig: IBaseConfig = {
  tagName: 'section',
  className: 'table',
};

const ElementsText = {
  COMPONENT_ALLY_TITLE: 'CSS representation table',
};

const winText = {
  title: 'You did it!',
  body: 'You rock at CSS.',
};

export const ChildrenClasses = {
  ROOT: componentBaseConfig.className,
  SURFACE: `${componentBaseConfig.className}__surface`,
  NAMETAG_PLACE: `${componentBaseConfig.className}__nametag-place`,
  NAMETAG: `${componentBaseConfig.className}__nametag`,
  DISHES_PLACE: `${componentBaseConfig.className}__dishes`,
  WIN_TEXT_CONTAINER: `${componentBaseConfig.className}__win-text`,
  WIN_TEXT_TITLE: `${componentBaseConfig.className}__win-text-title`,
  WIN_TEXT_BODY: `${componentBaseConfig.className}__win-text-body`,
  EDGE: `${componentBaseConfig.className}__edge`,
  LEG: `${componentBaseConfig.className}__leg`,
};

const AnimationClasses = {
  START: 'pop',
  TARGET_ELEMENT: 'strobe',
  WRONG_ELEMENT: 'shake',
  RIGHT_ELEMENT: 'clean',
};

export class TableComponent extends BaseComponent<HTMLElement> {
  levelElements: Element[];
  targetElements: Element[];
  tableSurface: BaseComponent<HTMLElement>;
  dishesPlace: BaseComponent<HTMLElement>;

  constructor(level: IGameLevel, constructorConfig?: IBaseConfig) {
    const resultConfig = mergeConfigs<IBaseConfig>(componentBaseConfig, constructorConfig);
    super(resultConfig);

    new BaseComponent({
      tagName: 'h3',
      className: GlobalClass.ALLY_HIDDEN,
      textContent: ElementsText.COMPONENT_ALLY_TITLE,
      parentComponent: this,
    });

    const { boardMarkup, selector } = level;
    this.tableSurface = new BaseComponent({ className: ChildrenClasses.SURFACE, parentComponent: this });
    this.dishesPlace = new BaseComponent({
      className: ChildrenClasses.DISHES_PLACE,
      parentComponent: this.tableSurface,
    });

    const tableEdge = new BaseComponent({ className: ChildrenClasses.EDGE, parentComponent: this });
    const legsCount = 2;
    new Array(legsCount)
      .fill(0)
      .forEach(() => new BaseComponent({ className: ChildrenClasses.LEG, parentComponent: tableEdge }));

    this.dishesPlace.getNode().innerHTML = boardMarkup;
    this.setNametagPlace();
    this.levelElements = Array.from(this.dishesPlace.getNode().children);
    this.targetElements = Array.from(this.dishesPlace.getNode().querySelectorAll(selector));
    this.setInitAnimation();
  }

  private setInitAnimation() {
    for (const element of this.levelElements) {
      element.classList.add(AnimationClasses.START);
    }
    this.animateTargetSelectorElements();
  }

  private setNametagPlace() {
    const nametagPlace = new BaseComponent({
      className: ChildrenClasses.NAMETAG_PLACE,
      parentComponent: this.tableSurface,
    });
    const elementsWithTags = Array.from(this.dishesPlace.getNode().querySelectorAll('[for]')) as HTMLElement[];
    if (elementsWithTags.length > 0) {
      elementsWithTags.forEach((element) => {
        const nametag = new BaseComponent({
          tagName: 'div',
          className: ChildrenClasses.NAMETAG,
          textContent: element.getAttribute('for') ?? '',
        });
        nametagPlace.append(nametag);
        const setNametagPosition = () => {
          const left = element.offsetLeft;
          const elementWidth = element.clientWidth;
          const elementHeight = this.dishesPlace.getNode().clientHeight;
          nametag.getNode().style.translate = '-50% 0%';
          nametag.getNode().style.left = `${left + elementWidth / 2}px`;
          nametag.getNode().style.top = `${-20}px`;
          nametag.getNode().style.width = `${elementHeight * 0.8}px`;
          nametag.getNode().style.fontSize = `${elementHeight * 0.25}px`;
        };
        setTimeout(() => {
          setNametagPosition();
        }, 0);
        window.addEventListener('resize', setNametagPosition);
      });
    }
  }

  private animateTargetSelectorElements() {
    this.levelElements[0].addEventListener('animationend', () => {
      for (const element of this.levelElements) {
        element.classList.remove(AnimationClasses.START);
      }
      for (const element of this.targetElements) {
        element.classList.add(AnimationClasses.TARGET_ELEMENT);
      }
    });
  }

  public animateUserSelectorInput(selector: string) {
    let userSelectElements: Element[] = [];
    try {
      userSelectElements = Array.from(this.dishesPlace.getNode().querySelectorAll(selector));
    } catch {
      return;
    }
    if (userSelectElements.length === 0) {
      return;
    }
    const isRightUserSelector = userSelectElements.every(
      (userSelectElement, index) => userSelectElement === this.targetElements[index]
    );
    if (isRightUserSelector) {
      userSelectElements.forEach((element) => {
        element.classList.add(AnimationClasses.RIGHT_ELEMENT);
      });
    } else {
      userSelectElements.forEach((element) => {
        if (element.classList.contains(AnimationClasses.TARGET_ELEMENT)) {
          element.classList.remove(AnimationClasses.TARGET_ELEMENT);
          element.classList.add(AnimationClasses.WRONG_ELEMENT);
          element.addEventListener('animationend', () => {
            element.classList.remove(AnimationClasses.WRONG_ELEMENT);
            element.classList.add(AnimationClasses.TARGET_ELEMENT);
          });
        } else {
          element.classList.add(AnimationClasses.WRONG_ELEMENT);
          element.addEventListener('animationend', () => element.classList.remove(AnimationClasses.WRONG_ELEMENT));
        }
      });
    }
  }

  public setElementsHoverHandler(handler: (evt: MouseEvent) => void) {
    if (!(typeof handler === 'function')) {
      return 0;
    }
    this.getNode().addEventListener('mouseover', (evt) => {
      handler(evt);
    });
  }

  public setWinText() {
    const textComponent = new BaseComponent({ tagName: 'div', className: ChildrenClasses.WIN_TEXT_CONTAINER });
    const textTitle = new BaseComponent({
      tagName: 'p',
      className: ChildrenClasses.WIN_TEXT_TITLE,
      textContent: winText.title,
    });
    const textBody = new BaseComponent({
      tagName: 'p',
      className: ChildrenClasses.WIN_TEXT_BODY,
      textContent: winText.body,
    });
    textComponent.append(textTitle, textBody);

    this.dishesPlace.getNode().innerHTML = '';
    this.dishesPlace.append(textComponent);
  }
}

import { PlaygroundComponent } from '../components/playground/playground.component';
import { IBaseConfig } from '../types/constructor-config-options';
import { IGameLevel } from '../types/model';
import { ChildrenClasses as TableClasses } from '../components/table/table.component';
import { ChildrenClasses as EditorClasses } from '../components/editor/editor.component';
import { GlobalClass } from '../enums/global-class';
import { StateService } from './state.service';
import { TaskModel } from '../models/task.model';

export class PlaygroundService {
  container: HTMLElement;
  playgroundComponent: PlaygroundComponent;
  tableElements: Element[];
  markupElements: Element[];
  taskModel: TaskModel;
  level: IGameLevel;
  constructor(container: HTMLElement, level: IGameLevel, taskModel: TaskModel, constructorConfig?: IBaseConfig) {
    this.container = container;
    this.level = level;
    this.taskModel = taskModel;
    this.playgroundComponent = new PlaygroundComponent(this.level, constructorConfig);
    this.container.append(this.playgroundComponent.getNode());

    this.tableElements = Array.from(document.querySelectorAll(`.${TableClasses.DISHES_PLACE} *`));
    this.markupElements = Array.from(document.querySelectorAll(`.${EditorClasses.HTML_VIEWER_CONTENT} div`));

    this.playgroundComponent.setCsssHoverHandler(
      this.onElementHover.bind(this, this.tableElements, this.markupElements)
    );
    this.playgroundComponent.setMarkupHoverHandler(
      this.onElementHover.bind(this, this.markupElements, this.tableElements)
    );
    this.playgroundComponent.setSelectorKeydownHandler(this.onInputFieldKeydownHandler.bind(this));
    this.playgroundComponent.setSelectorEnterButtonClickHandler(this.onSelectorEnterButtonClickHandler.bind(this));
    this.playgroundComponent.setSelectorHelpButtonClickHandler(this.onSelectorHelpButtonClickHandler.bind(this));
  }

  private onElementHover(masterElements: Element[], slaveElements: Element[], evt: MouseEvent) {
    const elementsIndex = masterElements.findIndex((element) => element === evt.target);
    if (elementsIndex >= 0) {
      slaveElements[elementsIndex].classList.add(GlobalClass.LIGHTUP);
      masterElements[elementsIndex].addEventListener('mouseout', () => {
        slaveElements[elementsIndex].classList.remove(GlobalClass.LIGHTUP);
      });
      masterElements[elementsIndex].classList.add(GlobalClass.LIGHTUP);
      masterElements[elementsIndex].addEventListener('mouseout', () => {
        masterElements[elementsIndex].classList.remove(GlobalClass.LIGHTUP);
      });
      this.showTooltip(elementsIndex);
    }
    return this;
  }

  private onInputFieldKeydownHandler(evt: KeyboardEvent) {
    if (evt.key !== 'Enter') {
      return;
    }
    this.sendSelector();
  }

  private onSelectorEnterButtonClickHandler() {
    this.sendSelector();
  }

  private sendSelector() {
    const inputElement = this.playgroundComponent.getSelectorInput();
    const inputValue = inputElement.value;

    if (!inputValue) {
      return;
    }

    this.playgroundComponent.animateUserSelectorInput(inputValue);
    const userInputElements = this.playgroundComponent.getQueryElements(inputValue);
    const userSelectElements = Array.from(userInputElements);
    if (userSelectElements.length === 0) {
      this.playgroundComponent.animateWrongInput();
    } else {
      const { selector } = this.level;
      const targetElements = Array.from(this.playgroundComponent.getQueryElements(selector));
      const isRightUserSelector = userSelectElements.every(
        (userSelectElement, index) => userSelectElement === targetElements[index]
      );
      if (isRightUserSelector) {
        this.level.isComplete = true;
        const levelsCount = this.taskModel.getLevels().length - 1;
        this.playgroundComponent.getNode().addEventListener(
          'animationend',
          () => {
            if (StateService.getCurrentLevel() < levelsCount) {
              StateService.setNextLevel();
            } else {
              this.playgroundComponent.setWinText();
            }
          },
          { once: true }
        );
      }
    }
  }

  private onSelectorHelpButtonClickHandler() {
    this.level.isWithHelp = true;
    const inputElement = this.playgroundComponent.getSelectorInput();
    inputElement.value = '';

    const helpText = this.level.selector;
    const chars = helpText.split('');
    let index = 0;
    inputElement.value += chars[index];
    index += 1;
    const id = setInterval(() => {
      if (index < chars.length) {
        inputElement.value += chars[index];
        index += 1;
      } else {
        inputElement.focus();
        clearInterval(id);
      }
    }, 30);
  }

  public destroy() {
    this.playgroundComponent.destroy();
  }

  private showTooltip(index: number) {
    const tableElement = this.tableElements[index];
    const markupElement = this.markupElements[index];
    this.playgroundComponent.setTooltip(tableElement, markupElement);
  }
}

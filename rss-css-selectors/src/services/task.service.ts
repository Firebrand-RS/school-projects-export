import { BaseComponent } from '../components/base.component';
import { HelpComponent } from '../components/help/help.component';
import { MenuComponent } from '../components/menu/menu.component';
import { TaskComponent, componentBaseConfig } from '../components/task/task.component';
import { TaskModel } from '../models/task.model';
import { IGameLevel, ISelectedLevel } from '../types/model';
import { PlaygroundService } from './playground.service';
import { StateService } from './state.service';

export const ChildrenClasses = {
  PLAYGROUND: `${componentBaseConfig.className}__playground`,
  HELP: `${componentBaseConfig.className}__help`,
  HELP_SELECTED_STATUS: `${componentBaseConfig.className}__help--selected`,
  MENU: `${componentBaseConfig.className}__menu`,
  MENU_SELECTED_STATUS: `${componentBaseConfig.className}__menu--selected`,
};

export class TaskService {
  taskModel: TaskModel = new TaskModel();
  levels: IGameLevel[] = this.taskModel.getLevels();
  taskComponent: TaskComponent = new TaskComponent();
  helpComponent: HelpComponent;
  menuComponent: MenuComponent;
  playgroundService: PlaygroundService;
  container: HTMLElement;

  constructor(container: BaseComponent<HTMLElement>) {
    this.container = container.getNode();
    this.container.append(this.taskComponent.getNode());
    this.setComponentHandlers();
    StateService.setChangeLevelHandler(this.onChangeLevelHandler.bind(this));
    const currentLevelIndex = StateService.getCurrentLevel();

    const { helpComponent, menuComponent, playgroundService } = this.render(currentLevelIndex);
    this.helpComponent = helpComponent;
    this.menuComponent = menuComponent;
    this.playgroundService = playgroundService;

    window.addEventListener('beforeunload', () => {
      StateService.saveToStorage();
      this.taskModel.saveToStorage();
    });
  }

  private onChangeLevelHandler() {
    this.helpComponent.destroy();
    this.menuComponent.destroy();
    this.playgroundService.destroy();
    this.render(StateService.getCurrentLevel());
  }

  private render(levelIndex: number) {
    this.levels = this.taskModel.getLevels();
    const currentLevel = this.levels[levelIndex];

    const playgroundService = new PlaygroundService(this.taskComponent.getNode(), currentLevel, this.taskModel, {
      className: ChildrenClasses.PLAYGROUND,
    });

    const levels = this.levels;
    const levelInfoObject: ISelectedLevel = { levels, currentLevel };
    const helpComponent = new HelpComponent(levelInfoObject, {
      className: ChildrenClasses.HELP,
    });
    const menuComponent = new MenuComponent(levelInfoObject, {
      className: ChildrenClasses.MENU,
    });

    this.playgroundService = playgroundService;
    this.helpComponent = helpComponent;
    this.menuComponent = menuComponent;
    this.taskComponent.append(helpComponent, menuComponent);

    this.setChildComponentsHandlers();
    return { playgroundService, helpComponent, menuComponent };
  }

  private setComponentHandlers() {
    this.taskComponent.setPanelHelpButtonClickHandler(this.onPanelHelpButtonClickHandler.bind(this));
    this.taskComponent.setPanelMenuButtonClickHandler(this.onPanelMenuButtonClickHandler.bind(this));
    this.taskComponent.setAreaClickHandler(this.onTaskAreaClickHandler.bind(this));
  }

  private setChildComponentsHandlers() {
    this.menuComponent.setCloseButtonClickHandler(this.onMenuCloseButtonClickHandler.bind(this));
    this.menuComponent.setResetButtonClickHandler(this.onMenuResetButtonClickHandler.bind(this));
    this.menuComponent.setListItemClickHandler(this.onMenuListItemClickHandler);

    this.helpComponent.setPrevLevelButtonClickHandler(this.onHelpPrevLevelButtonClickHandler.bind(this));
    this.helpComponent.setNextLevelButtonClickHandler(this.onHelpNextLevelButtonClickHandler.bind(this));
    this.helpComponent.setMenuButtonClickHandler(this.onHelpMenuButtonClickHandler.bind(this));
  }

  private onPanelMenuButtonClickHandler() {
    this.menuComponent.addClass(ChildrenClasses.MENU_SELECTED_STATUS);
  }

  private onPanelHelpButtonClickHandler() {
    this.helpComponent.addClass(ChildrenClasses.HELP_SELECTED_STATUS);
  }

  private onMenuCloseButtonClickHandler() {
    this.menuComponent.removeClass(ChildrenClasses.MENU_SELECTED_STATUS);
  }

  private onMenuResetButtonClickHandler() {
    this.taskModel.resetLevels();
  }

  private onMenuListItemClickHandler(itemIndex: number) {
    StateService.setLevel(itemIndex);
  }

  private onHelpPrevLevelButtonClickHandler() {
    if (StateService.getCurrentLevel() === 0) {
      return;
    }
    StateService.setPrevLevel();
  }

  private onHelpNextLevelButtonClickHandler() {
    if (StateService.getCurrentLevel() >= this.levels.length - 1) {
      return;
    }
    StateService.setNextLevel();
  }

  private onHelpMenuButtonClickHandler() {
    this.menuComponent.addClass(ChildrenClasses.MENU_SELECTED_STATUS);
  }

  private onTaskAreaClickHandler(evt: MouseEvent) {
    if (!(evt.target instanceof Element)) {
      return;
    }
    const isHelpComponent = !!evt.target.closest('.' + ChildrenClasses.HELP_SELECTED_STATUS);
    const isPanelButtonComponent = !!evt.target.closest('.' + this.taskComponent.buttonPanel.getNode().className);

    if (!isHelpComponent && !isPanelButtonComponent) {
      this.helpComponent.removeClass(ChildrenClasses.HELP_SELECTED_STATUS);
    }
  }
}

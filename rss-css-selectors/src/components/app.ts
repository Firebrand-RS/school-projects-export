import { getRandomInteger } from '../utils/get-random-integer';
import { BaseComponent } from './base.component';
import { ButtonComponent } from './button/button.component';
import { HelpComponent } from './help/help.component';
import { MenuComponent } from './menu/menu.component';
import { PageFooterComponent } from './page/page-footer.component';
import { PageHeaderComponent } from './page/page-header.component';
import { PageMainComponent } from './page/page-main.component';
import { GameLevelModel } from '../model/levels.model';
import { ISelectedLevel } from '../types/model';
import { EditorComponent } from './editor/editor.component';
import { TableComponent } from './table/table.component';

const pageClass = 'page';
const ChildElementsClasses = {
  HEADER: `${pageClass}__header`,
  MAIN: `${pageClass}__container`,
  FOOTER: `${pageClass}__footer`,
};

export class App {
  pageHeader: BaseComponent<HTMLElement>;
  mainContainer: BaseComponent<HTMLElement>;
  pageFooter: BaseComponent<HTMLElement>;

  constructor() {
    this.pageHeader = new PageHeaderComponent({ className: ChildElementsClasses.HEADER });
    this.mainContainer = new PageMainComponent({ className: ChildElementsClasses.MAIN });
    this.pageFooter = new PageFooterComponent({ className: ChildElementsClasses.FOOTER });

    document.body.classList.add(pageClass);
    [this.pageHeader, this.mainContainer, this.pageFooter].forEach((component) =>
      document.body.append(component.getNode())
    );
  }

  getContainer() {
    return this.mainContainer;
  }
}

const app = new App();
const levels = new GameLevelModel().getLevels();
const currentIndex = getRandomInteger(0, levels.length - 1);
// const currentIndex = 13;
const currentLevel = levels[currentIndex];
const mainContainer = app.getContainer();
const levelInfoObject: ISelectedLevel = { levels, currentLevel, currentIndex };

const table = new TableComponent(currentLevel, { parentComponent: mainContainer });
const menu = new MenuComponent(levels, { className: 'task__menu', parentComponent: mainContainer });
const help = new HelpComponent(levelInfoObject, {
  className: 'task__help',
  parentComponent: mainContainer,
});

const editor = new EditorComponent(currentLevel, { className: 'task__editor', parentComponent: mainContainer });

const simpleButton = new ButtonComponent({
  textContent: `Help, Im stuck!`,
  parentComponent: mainContainer,
});

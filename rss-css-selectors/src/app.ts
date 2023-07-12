import { TaskService } from './services/task.service';
import { PageFooterComponent } from './components/page/page-footer.component';
import { PageHeaderComponent } from './components/page/page-header.component';
import { PageMainComponent } from './components/page/page-main.component';

const pageClass = 'page';
const ChildElementsClasses = {
  HEADER: `${pageClass}__header`,
  MAIN: `${pageClass}__content`,
  FOOTER: `${pageClass}__footer`,
};

export class App {
  container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  public start() {
    const pageHeader = new PageHeaderComponent({ className: ChildElementsClasses.HEADER });
    const mainContainer = new PageMainComponent({ className: ChildElementsClasses.MAIN });
    const pageFooter = new PageFooterComponent({ className: ChildElementsClasses.FOOTER });

    this.container.classList.add(pageClass);
    [pageHeader, mainContainer, pageFooter].forEach((component) => this.container.append(component.getNode()));

    new TaskService(mainContainer);
  }
}

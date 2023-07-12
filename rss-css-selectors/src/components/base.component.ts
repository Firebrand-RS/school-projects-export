import { IBaseConfig } from '../types/constructor-config-options';

export class BaseComponent<T extends HTMLElement> {
  protected node: T;

  public constructor({ tagName = 'div', className = [], textContent = '', parentComponent, title }: IBaseConfig = {}) {
    this.node = document.createElement(tagName) as T;
    this.addClass(className);
    this.node.textContent = textContent;
    if (parentComponent) {
      parentComponent.append(this);
    }
    if (title) {
      this.node.title = title;
    }
  }

  public append(...components: (BaseComponent<HTMLElement> | SVGElement)[]): void {
    for (const component of components) {
      if (component instanceof BaseComponent) {
        this.node.append(component.getNode());
      } else {
        this.node.append(component);
      }
    }
  }

  public getNode(): T {
    return this.node;
  }

  public addClass(className: IBaseConfig['className']): void {
    if (Array.isArray(className)) {
      this.node.classList.add(...className);
    } else {
      if (className) {
        this.node.classList.add(className);
      }
    }
  }

  public removeClass(className: string) {
    this.node.classList.remove(className);
  }

  public toggleClass(className: string, force?: boolean) {
    this.node.classList.toggle(className, force);
  }

  public destroy(): void {
    this.node.remove();
  }
}

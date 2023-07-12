export class BaseComponent {
  node;
  constructor({
    tagName = 'div',
    className = [],
    textContent = '',
    parentNode,
  }) {
    this.node = document.createElement(tagName);
    this.node.textContent = textContent;
    this.addClass(className);
    if (parentNode) {
      parentNode.append(this.node);
    }
  }

  append(...components) {
    for (let component of components) {
      this.node.append(component.getElement());
    }
  }

  getElement() {
    return this.node;
  }

  addClass(className) {
    add.call(this, className);

    function add(name) {
      if (Array.isArray(name)) {
        for (let item of name) {
          add.call(this, item);
        }
      } else {
        if (name === '') {
          return;
        }
        this.node.classList.add(name);
      }
    }
  }

  removeClass(name) {
    this.node.classList.remove(name);
  }

  toggleClass(name) {
    this.node.classList.toggle(name);
  }

  destroy() {
    this.node.remove();
  }
}

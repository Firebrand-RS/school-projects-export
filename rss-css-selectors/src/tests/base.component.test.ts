import { BaseComponent } from '../components/base.component';

describe('Base component', () => {
  let baseComponent: BaseComponent<HTMLElement>;

  beforeEach(() => {
    baseComponent = new BaseComponent();
  });

  test('should return base component object', () => {
    expect(baseComponent).toBeDefined();
    expect(baseComponent).toBeInstanceOf(BaseComponent);
  });

  test('should return div node element by default', () => {
    expect(baseComponent.getNode()).toBeInstanceOf(HTMLDivElement);
  });

  test('should has child elements if call append method with component argument', () => {
    const childComponent = new BaseComponent({
      tagName: 'strong',
      className: 'warning',
      textContent: `I'm child element!`,
    });
    baseComponent.append(childComponent);
    expect(baseComponent.getNode().innerHTML).toBe(`<strong class="warning">I'm child element!</strong>`);
  });

  test('should return changed element correct classname if called addClass method', () => {
    baseComponent.addClass(['here', 'new', 'class']);
    expect(baseComponent.getNode().className).toBe('here new class');
    baseComponent.addClass(['and', 'some', 'more']);
    expect(baseComponent.getNode().className).toBe('here new class and some more');
  });

  test('should return changed element correct classname if called removeClass method', () => {
    baseComponent.addClass(['class-to-remove', 'class-to-keep']);
    baseComponent.removeClass('class-to-remove');
    expect(baseComponent.getNode().className).toBe('class-to-keep');
  });

  test('should return changed element correct classname if called toggleClass method', () => {
    baseComponent.toggleClass('class-to-toggle');
    expect(baseComponent.getNode().className).toBe('class-to-toggle');
    baseComponent.toggleClass('class-to-toggle');
    expect(baseComponent.getNode().className).toBe('');
  });
});

import { getElementFromTemplate } from '../utils/get-element-from-template';

describe('getElementFromTemplate', () => {
  let markup: string;
  let markupSVG: string;

  beforeAll(() => {
    markup = `<button type="button">Example</button>`;
    markupSVG = `<svg><rect x="10" y="10" width="100" height="100"/></svg>`;
  });

  test('should return an dom element', () => {
    expect(getElementFromTemplate(markup)).toBeInstanceOf(Element);
    expect(getElementFromTemplate(markup)).toBeInstanceOf(HTMLButtonElement);
    expect(getElementFromTemplate(markupSVG)).toBeInstanceOf(Element);
    expect(getElementFromTemplate(markupSVG)).toBeInstanceOf(SVGElement);
  });

  test('should add class to element if argument set', () => {
    const element = getElementFromTemplate(markup, 'element-class');
    expect(element.className).toBe('element-class');
  });
});

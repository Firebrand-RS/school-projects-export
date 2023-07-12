import { Svg } from '../enums/svg';

export function getElementFromTemplate<T>(
  template: Svg | string,
  className?: string | string[]
): T extends Svg ? SVGElement : HTMLElement {
  const container = document.createElement('div');
  container.innerHTML = template;
  const element = container.firstChild as T extends Svg ? SVGElement : HTMLElement;
  if (className) {
    if (Array.isArray(className)) {
      element.classList.add(...className);
    } else {
      element.classList.add(className);
    }
  }
  return element;
}

import { BaseComponent } from '../components/base.component';

export function alignComponentPosition(
  anchorElement: HTMLElement,
  component: BaseComponent<HTMLElement>,
  offsetTop = 0
) {
  const top = anchorElement.offsetTop;
  const left = anchorElement.offsetLeft;
  const elementWidth = anchorElement.clientWidth;
  component.getNode().style.translate = '-50% 0%';
  component.getNode().style.top = `${top - offsetTop}px`;
  component.getNode().style.left = `${left + elementWidth / 2}px`;
}

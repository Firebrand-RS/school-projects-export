import './sources.css';
import { getGuaranteedElement } from '../../../utils/common';
import { ISource, IDrawable } from '../../../utils/models';

class Sources implements IDrawable<ISource[]> {
    public draw(data: ISource[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement = getGuaranteedElement(
            document,
            '#sourceItemTemp'
        ) as HTMLTemplateElement;

        data.forEach((item: ISource) => {
            const sourceClone: HTMLElement = sourceItemTemp.content.cloneNode(true) as HTMLElement;

            getGuaranteedElement(sourceClone, '.source__item-name').textContent = item.name;
            getGuaranteedElement(sourceClone, '.source__item').setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        getGuaranteedElement(document, '.sources').append(fragment);
    }
}

export default Sources;

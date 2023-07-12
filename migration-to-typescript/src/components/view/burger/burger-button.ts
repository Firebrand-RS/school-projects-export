import './burger-button.css';
import { getGuaranteedElement } from '../../../utils/common';

const burgerButton: HTMLElement = getGuaranteedElement(document, '.burger-button');
const buttonImages: NodeListOf<Element> = burgerButton.querySelectorAll('.burger-button__image');
const menuElement: HTMLElement = getGuaranteedElement(document, '.sources');

const menuClickHandler: () => void = () => {
    menuElement.classList.toggle('sources--expanded');
    buttonImages.forEach((image) => image.classList.toggle('burger-button__image--visible'));
};

burgerButton.addEventListener('click', menuClickHandler);

menuElement.addEventListener('click', (evt) => {
    if (!(evt.target instanceof HTMLElement)) {
        return;
    }
    const listItem = evt.target.closest('.source__item');
    if (!listItem) {
        return;
    }
    menuClickHandler();
});

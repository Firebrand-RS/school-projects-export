import './editor.component.scss';
import { GlobalClass } from '../../enums/global-class';
import { IBaseConfig } from '../../types/constructor-config-options';
import { ICodeViewConfig, IGameLevel } from '../../types/model';
import { mergeConfigs } from '../../utils/merge-configs';
import { BaseComponent } from '../base.component';
import { CodeViewComponent } from './code-view.component';
import { InputComponent } from '../input.component';
import { ButtonComponent } from '../button/button.component';
import { getElementFromTemplate } from '../../utils/get-element-from-template';

const componentBaseConfig: IBaseConfig = {
  tagName: 'section',
  className: 'editor',
};

const ElementsText = {
  COMPONENT_ALLY_TITLE: 'Code editor',
  CSS_EDITOR_TITLE: 'CSS Editor',
  CSS_EDITOR_FILENAME: 'style.css',
  HTML_VIEWER_TITLE: 'HTML Viewer',
  HTML_VIEWER_FILENAME: 'table.html',
  EXAMPLES_TITLE: 'Examples',
  ENTER_BUTTON_TEXT: 'Enter',
  ENTER_BUTTON_ALLY_TEXT: 'Apply selector',
  HELP_BUTTON_TEXT: 'Help',
  HELP_BUTTON_ALLY_TEXT: 'Get help',
  CSS_NOTE: `{ 
/* Styles would go here. */
}

/*
Type a number to skip to a level.
Ex → "5" for level 5
*/`,
};

export const ChildrenClasses = {
  ROOT: componentBaseConfig.className,
  CSS_EDITOR: [`${componentBaseConfig.className}__css-editor`, 'code-view--light'],
  HTML_VIEWER: [`${componentBaseConfig.className}__html-viewer`, 'code-view--dark'],
  HTML_VIEWER_CONTENT: `markup`,
  SELECTOR_INPUT_FIELD: `code-view__selector-field`,
  SELECTOR_INPUT_PLACEHOLDER: 'Type in a CSS selector',
  SELECTOR_NOTE: `code-view__css-note`,
  SELECTOR_INPUT_FIELD_BUTTON_GROUP: `code-view__input-stroke-buttons`,
  SELECTOR_INPUT_FIELD_BUTTON: 'button--code',
};

export class EditorComponent extends BaseComponent<HTMLElement> {
  selectorInput: InputComponent;
  selectorEnterButton: ButtonComponent;
  selectorHelpButton: ButtonComponent;

  constructor(level: IGameLevel, constructorConfig?: IBaseConfig) {
    const resultConfig = mergeConfigs<IBaseConfig>(componentBaseConfig, constructorConfig);
    super(resultConfig);

    new BaseComponent({
      tagName: 'h3',
      className: GlobalClass.ALLY_HIDDEN,
      textContent: ElementsText.COMPONENT_ALLY_TITLE,
      parentComponent: this,
    });

    const { selectorInput, selectorEnterButton, selectorHelpButton } = this.setCssCodeView();
    this.selectorInput = selectorInput;
    this.selectorEnterButton = selectorEnterButton;
    this.selectorHelpButton = selectorHelpButton;

    this.setHtmlCodeView(level);
  }

  private setCssCodeView() {
    const selectorFiled = new BaseComponent({ tagName: 'p', className: ChildrenClasses.SELECTOR_INPUT_FIELD });
    const selectorInput = new InputComponent({
      placeholder: ChildrenClasses.SELECTOR_INPUT_PLACEHOLDER,
      parentComponent: selectorFiled,
      autofocus: true,
    });
    const buttonContainer = new BaseComponent({
      tagName: 'span',
      className: ChildrenClasses.SELECTOR_INPUT_FIELD_BUTTON_GROUP,
      parentComponent: selectorFiled,
    });
    const selectorEnterButton = new ButtonComponent({
      className: ChildrenClasses.SELECTOR_INPUT_FIELD_BUTTON,
      allyLabel: ElementsText.ENTER_BUTTON_ALLY_TEXT,
      textContent: ElementsText.ENTER_BUTTON_TEXT,
      parentComponent: buttonContainer,
    });
    const selectorHelpButton = new ButtonComponent({
      className: ChildrenClasses.SELECTOR_INPUT_FIELD_BUTTON,
      allyLabel: ElementsText.HELP_BUTTON_ALLY_TEXT,
      textContent: ElementsText.HELP_BUTTON_TEXT,
      parentComponent: buttonContainer,
    });
    const selectorNote = new BaseComponent({
      tagName: 'p',
      className: ChildrenClasses.SELECTOR_NOTE,
      textContent: ElementsText.CSS_NOTE,
    });
    const options: ICodeViewConfig = {
      title: ElementsText.CSS_EDITOR_TITLE,
      filename: ElementsText.CSS_EDITOR_FILENAME,
      content: [selectorFiled, selectorNote],
    };

    new CodeViewComponent(options, { className: ChildrenClasses.CSS_EDITOR, parentComponent: this });
    return { selectorInput, selectorEnterButton, selectorHelpButton };
  }

  private setHtmlCodeView(level: IGameLevel) {
    const { boardMarkup } = level;
    const container = document.createElement('div');
    container.innerHTML = boardMarkup;

    const elements: (HTMLElement | Text)[] = elementsWrapper(Array.from(container.children) as HTMLElement[]);
    elements.unshift(document.createTextNode('<div class="table">'));
    elements.push(document.createTextNode('</div>'));

    const htmlViewContent = new BaseComponent({ className: [ChildrenClasses.HTML_VIEWER_CONTENT, 'code'] });
    htmlViewContent.getNode().append(...elements);
    const options: ICodeViewConfig = {
      title: ElementsText.HTML_VIEWER_TITLE,
      filename: ElementsText.HTML_VIEWER_FILENAME,
      content: [htmlViewContent],
    };
    new CodeViewComponent(options, { className: ChildrenClasses.HTML_VIEWER, parentComponent: this });

    function elementsWrapper(elements: HTMLElement[]): HTMLElement[] {
      const wrappedElementsArray: HTMLElement[] = [];
      for (const element of elements) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('children-wrapper');
        const idText = element.id
          ? ` <span class="attribute">id</span>=<span class="string">"${element.id}"</span>`
          : '';
        const classText = element.className
          ? ` <span class="attribute">class</span>=<span class="string">"${element.className}"</span>`
          : '';
        const getAttributeText = element.getAttribute('for')
          ? ` <span class="attribute">for</span>=<span class="string">"${element.getAttribute('for')}"</span>`
          : ``;
        const endTagText = element.children.length > 0 ? '' : '/';
        const text = `<<span class="section">${element.tagName.toLocaleLowerCase()}</span>${idText}${classText}${getAttributeText}${endTagText}>`;
        wrapper.innerHTML = text;

        if (element.children.length > 0) {
          const wrappedElements = elementsWrapper(Array.from(element.children) as HTMLElement[]);
          wrapper.append(...wrappedElements);
          const openSymb = document.createTextNode('</');
          const closeSymb = document.createTextNode('>');
          const endText = `<span class="section">${element.tagName.toLowerCase()}</span>`;
          const elem = getElementFromTemplate(endText);
          wrapper.append(openSymb, elem, closeSymb);
        }

        wrappedElementsArray.push(wrapper);
      }
      return wrappedElementsArray;
    }
  }

  public setElementsHoverHandler(handler: (evt: MouseEvent) => void) {
    if (!(typeof handler === 'function')) {
      return 0;
    }
    this.getNode().addEventListener('mouseover', (evt) => {
      handler(evt);
    });
  }

  public getSelectorInput() {
    return this.selectorInput.getNode();
  }

  public getSelectorEnterButton() {
    return this.selectorEnterButton.getNode();
  }

  public getSelectorHelpButton() {
    return this.selectorHelpButton.getNode();
  }

  public setSelectorKeydownHandler(handler: unknown) {
    this.selectorInput.setKeydownHandler(handler);
  }

  public setSelectorEnterButtonClickHandler(handler: unknown) {
    this.selectorEnterButton.setClickHandler(handler);
  }

  public setSelectorHelpButtonClickHandler(handler: unknown) {
    this.selectorHelpButton.setClickHandler(handler);
  }
}

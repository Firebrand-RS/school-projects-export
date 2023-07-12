import './playground.component.scss';
import { GlobalClass } from '../../enums/global-class';
import { IBaseConfig } from '../../types/constructor-config-options';
import { IGameLevel } from '../../types/model';
import { mergeConfigs } from '../../utils/merge-configs';
import { BaseComponent } from '../base.component';
import { EditorComponent } from '../editor/editor.component';
import { NoteComponent } from '../note/note.component';
import { TableComponent } from '../table/table.component';
import { alignComponentPosition } from '../../utils/align-element-position';

const componentBaseConfig: IBaseConfig = {
  tagName: 'section',
  className: 'playground',
};

const ChildrenClasses = {
  ROOT: componentBaseConfig.className,
  DESCRIPTION: `${componentBaseConfig.className}__description`,
  NOTE: `${componentBaseConfig.className}__note`,
  TABLE: `${componentBaseConfig.className}__table`,
  EDITOR: `${componentBaseConfig.className}__editor`,
  EDITOR_SHAKE: `shake`,
  TOOLTIP: `${componentBaseConfig.className}__tooltip`,
  TOOLTIP_VISIBILITY: `${componentBaseConfig.className}__tooltip--visible`,
  DISHES_SIZE: `small`,
};

export class PlaygroundComponent extends BaseComponent<HTMLElement> {
  taskDescription: BaseComponent<HTMLElement>;
  table: TableComponent;
  editor: EditorComponent;
  tooltip: BaseComponent<HTMLElement>;
  note: NoteComponent;

  constructor(level: IGameLevel, constructorConfig?: IBaseConfig) {
    const resultConfig = mergeConfigs<IBaseConfig>(componentBaseConfig, constructorConfig);
    super(resultConfig);

    new BaseComponent({
      tagName: 'h2',
      textContent: 'Playground',
      className: GlobalClass.ALLY_HIDDEN,
      parentComponent: this,
    });

    this.taskDescription = new BaseComponent({
      tagName: 'p',
      className: ChildrenClasses.DESCRIPTION,
      textContent: level.doThis,
      parentComponent: this,
    });

    this.note = new NoteComponent({
      className: ChildrenClasses.NOTE,
      parentComponent: this,
    });

    this.table = new TableComponent(level, { className: ChildrenClasses.TABLE, parentComponent: this });
    this.editor = new EditorComponent(level, { className: ChildrenClasses.EDITOR, parentComponent: this });
    this.tooltip = new BaseComponent({ className: ChildrenClasses.TOOLTIP, parentComponent: this.table });
  }

  public setNoteToggleButtonClickHandler(handler: unknown) {
    this.note.setToggleButtonClickHandler(handler);
  }

  public setNoteSubmitButtonClickHandler(handler: unknown) {
    this.note.setSubmitButtonClickHandler(handler);
  }

  public setCsssHoverHandler(handler: (evt: MouseEvent) => void) {
    this.table.setElementsHoverHandler(handler);
  }
  public setMarkupHoverHandler(handler: (evt: MouseEvent) => void) {
    this.editor.setElementsHoverHandler(handler);
  }

  public setSelectorKeydownHandler(handler: unknown) {
    this.editor.setSelectorKeydownHandler(handler);
  }

  public setSelectorEnterButtonClickHandler(handler: unknown) {
    this.editor.setSelectorEnterButtonClickHandler(handler);
  }

  public setSelectorHelpButtonClickHandler(handler: unknown) {
    this.editor.setSelectorHelpButtonClickHandler(handler);
  }

  public setWinText() {
    this.table.setWinText();
  }

  public animateUserSelectorInput(selector: string) {
    this.table.animateUserSelectorInput(selector);
  }

  public animateWrongInput() {
    this.editor.addClass(ChildrenClasses.EDITOR_SHAKE);
    this.editor.getNode().addEventListener('animationend', () => this.editor.removeClass(ChildrenClasses.EDITOR_SHAKE));
  }

  public getQueryElements(selector: string) {
    try {
      return this.table.getNode().querySelectorAll(selector);
    } catch {
      return [];
    }
  }

  public getSelectorInput() {
    return this.editor.getSelectorInput();
  }

  public getSelectorEnterButton() {
    return this.editor.getSelectorEnterButton();
  }

  public getSelectorHelpButton() {
    return this.editor.getSelectorHelpButton();
  }

  public setTooltip(element: Element, ...linkedElements: Element[]) {
    const tagName = element.tagName.toLocaleLowerCase();
    const idText = element.id ? ` id="${element.id}"` : '';
    const classText = element.className
      ? ` ${element.classList.contains(ChildrenClasses.DISHES_SIZE) ? `class="${ChildrenClasses.DISHES_SIZE}"` : ''}`
      : '';
    const getAttributeText = element.getAttribute('for') ? ` for="${element.getAttribute('for')}"` : ``;
    const text = `<${tagName}${idText}${classText}${getAttributeText}></${tagName}>`;
    this.tooltip.getNode().textContent = text;

    const verticalPosition = 75;

    if (element instanceof HTMLElement) {
      if (element.parentElement instanceof HTMLDivElement) {
        alignComponentPosition(element, this.tooltip, verticalPosition);
      } else {
        const parent = element.parentElement;
        if (!parent) {
          return;
        }
        alignComponentPosition(parent, this.tooltip, verticalPosition);
      }
    }

    this.tooltip.addClass(ChildrenClasses.TOOLTIP_VISIBILITY);
    [element, ...linkedElements].forEach((element) => {
      element.addEventListener('mouseout', () => {
        this.tooltip.removeClass(ChildrenClasses.TOOLTIP_VISIBILITY);
      });
    });
  }
}

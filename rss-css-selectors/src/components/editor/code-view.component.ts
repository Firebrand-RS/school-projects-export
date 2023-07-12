import { IBaseConfig } from '../../types/constructor-config-options';
import { mergeConfigs } from '../../utils/merge-configs';
import { BaseComponent } from '../base.component';
import { ICodeViewConfig } from '../../types/model';

const componentBaseConfig: IBaseConfig = {
  tagName: 'section',
  className: 'code-view',
};

const viewSize = 20; //strokes

const ChildrenClasses = {
  ROOT: componentBaseConfig.className,
  HEADLINE: `${componentBaseConfig.className}__headline`,
  TITLE: `${componentBaseConfig.className}__title`,
  FILENAME: `${componentBaseConfig.className}__filename`,
  FIELD: `${componentBaseConfig.className}__field`,
  STROKE_NUMBERS_COLUMN: `${componentBaseConfig.className}__field-stroke-numbers-column`,
  STROKES_COLUMN: `${componentBaseConfig.className}__field-strokes-column`,
};

export class CodeViewComponent extends BaseComponent<HTMLElement> {
  constructor(contentConfig: ICodeViewConfig, constructorConfig?: IBaseConfig) {
    const resultConfig = mergeConfigs<IBaseConfig>(componentBaseConfig, constructorConfig);
    super(resultConfig);

    const headline = new BaseComponent({
      tagName: 'header',
      className: ChildrenClasses.HEADLINE,
      parentComponent: this,
    });

    new BaseComponent({
      tagName: 'h4',
      className: ChildrenClasses.TITLE,
      parentComponent: headline,
      textContent: contentConfig.title,
    });

    new BaseComponent({
      tagName: 'span',
      className: ChildrenClasses.FILENAME,
      parentComponent: headline,
      textContent: contentConfig.filename,
    });

    const field = new BaseComponent({
      tagName: 'div',
      className: ChildrenClasses.FIELD,
      parentComponent: this,
    });

    const numberColumn = new BaseComponent({
      tagName: 'div',
      className: ChildrenClasses.STROKE_NUMBERS_COLUMN,
      parentComponent: field,
    });
    const strokeNumbers = new Array(viewSize)
      .fill(0)
      .map((item, index) => new BaseComponent({ tagName: 'span', textContent: (index + 1).toString() }));
    numberColumn.append(...strokeNumbers);

    const strokesColumn = new BaseComponent({
      tagName: 'div',
      className: ChildrenClasses.STROKES_COLUMN,
      parentComponent: field,
    });
    strokesColumn.append(...contentConfig.content);
  }
}

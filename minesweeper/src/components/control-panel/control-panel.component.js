import './control-panel.component.scss';

import { BaseComponent } from '../base.component';
import { ButtonComponent } from '../button/button.component';
import { ButtonExpandableComponent } from '../button/button-expandable.component';
import { ListComponent } from '../list.component';
import { SVGComponent } from '../svg.component';
import { SvgIcons } from '../../enums/svg-icons';

export class ControlPanelComponent extends BaseComponent {
  newGameButton = new ButtonComponent({ className: 'minesweeper__new-game-button', textContent: 'new game' });

  scoreButton = new ButtonComponent({ className: 'button--icon', a11yLabel: 'score' });
  themeButton = new ButtonComponent({ className: 'button--icon', a11yLabel: 'theme' });
  soundButton = new ButtonComponent({ className: 'button--icon', a11yLabel: 'sound' });
  burgerButton = new ButtonComponent({ className: 'button--icon', a11yLabel: 'burger' });

  constructor({ className }) {
    super({ className: [className, 'control-panel'] });
    const initRangeInputValue = localStorage.getItem('sliderPosition');
    this.tileSettingButton = new ButtonExpandableComponent({
      icon: { template: SvgIcons.TILE },
      min: 0,
      max: 2,
      value: initRangeInputValue || 0,
    });

    this.mineSettingButton = new ButtonExpandableComponent({
      icon: { template: SvgIcons.MINE },
      min: 10,
      max: 99,
      value: initRangeInputValue || 10,
    });

    this.scoreButton.append(new SVGComponent({ template: SvgIcons.LIST }));
    this.burgerButton.append(new SVGComponent({ template: SvgIcons.BURGER }));

    const buttonGroup = new BaseComponent({
      className: 'minesweeper__button-group',
    });
    buttonGroup.append(this.newGameButton, this.tileSettingButton, this.mineSettingButton);
    const buttonList = new ListComponent({
      tagName: 'ul',
      className: 'minesweeper__button-list',
      items: [this.scoreButton, this.themeButton, this.soundButton, this.burgerButton],
    });

    this.append(buttonGroup, buttonList);
  }

  setThemeButtonIcon(iconComponent) {
    this.themeButton.switchIcon(iconComponent);
  }

  setSoundButtonIcon(iconComponent) {
    this.soundButton.switchIcon(iconComponent);
  }

  getTileSettingSliderValue() {
    return this.tileSettingButton.getSliderValue();
  }

  getMineSettingSliderValue() {
    return this.mineSettingButton.getSliderValue();
  }

  setNewGameButtonClickHandler(handler) {
    this.newGameButton.getElement().addEventListener('click', handler);
  }
  setTileSettingsButtonClickHandler(handler) {
    this.tileSettingButton.getElement().addEventListener('input', handler);
  }
  setMineSettingsButtonClickHandler(handler) {
    this.mineSettingButton.getElement().addEventListener('input', handler);
  }
  setScoreButtonClickHandler(handler) {
    this.scoreButton.getElement().addEventListener('click', handler);
  }
  setThemeButtonClickHandler(handler) {
    this.themeButton.getElement().addEventListener('click', handler);
  }
  setSoundButtonClickHandler(handler) {
    this.soundButton.getElement().addEventListener('click', handler);
  }
}

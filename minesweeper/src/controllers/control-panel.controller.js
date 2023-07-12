import { ControlPanelComponent } from '../components/control-panel/control-panel.component';
import { SVGComponent } from '../components/svg.component';
import { SvgIcons } from '../enums/svg-icons';
import { ThemeValues } from '../utils/constants';
import { SIZE_VARIANTS } from '../utils/constants';

const TILE_SLIDER_POSITION_STORAGE_KEY = 'tileSliderPosition';
const MINE_SLIDER_POSITION_STORAGE_KEY = 'mineSliderPosition';

export class ControlPanelController {
  controlPanelComponent = new ControlPanelComponent({ className: 'minesweeper__control-panel' });

  constructor(
    settings,
    container,
    onStartGameButtonClickHandler,
    onThemeChangeHandler,
    onSoundChangeHandler,
    onScoreTableButtonClickHandler
  ) {
    this.settings = settings;
    this.container = container;
    this.onStartGameButtonClickHandler = onStartGameButtonClickHandler;
    this.onThemeChangeHandler = onThemeChangeHandler;
    this.onSoundChangeHandler = onSoundChangeHandler;
    this.onScoreTableButtonClickHandler = onScoreTableButtonClickHandler;
  }

  render() {
    this.setHandlers();
    this.container.append(this.controlPanelComponent);

    this.switchSoundButtonIcon();
    this.switchThemeButtonIcon();

    const tileSliderValue = localStorage.getItem(TILE_SLIDER_POSITION_STORAGE_KEY) || 0;
    this.controlPanelComponent.tileSettingButton.setSliderValue(tileSliderValue);
    this.controlPanelComponent.tileSettingButton.setOutputValue(SIZE_VARIANTS[tileSliderValue]);
    const mineSliderValue = localStorage.getItem(MINE_SLIDER_POSITION_STORAGE_KEY) || 10;
    this.controlPanelComponent.mineSettingButton.setSliderValue(mineSliderValue);
    this.controlPanelComponent.mineSettingButton.setOutputValue(mineSliderValue);

    window.addEventListener('beforeunload', () => {
      localStorage.setItem(TILE_SLIDER_POSITION_STORAGE_KEY, this.controlPanelComponent.getTileSettingSliderValue());
      localStorage.setItem(MINE_SLIDER_POSITION_STORAGE_KEY, this.controlPanelComponent.getMineSettingSliderValue());
    });
  }

  setHandlers() {
    this.controlPanelComponent.setNewGameButtonClickHandler(() => {
      this.onStartGameButtonClickHandler();
    });
    this.controlPanelComponent.setTileSettingsButtonClickHandler(() => {
      const value = this.controlPanelComponent.getTileSettingSliderValue();
      localStorage.setItem(TILE_SLIDER_POSITION_STORAGE_KEY, value);
      this.controlPanelComponent.tileSettingButton.setOutputValue(SIZE_VARIANTS[value]);
    });
    this.controlPanelComponent.setMineSettingsButtonClickHandler(() => {
      const value = this.controlPanelComponent.getMineSettingSliderValue();
      localStorage.setItem(MINE_SLIDER_POSITION_STORAGE_KEY, value);
      this.controlPanelComponent.mineSettingButton.setOutputValue(value);
    });
    this.controlPanelComponent.setScoreButtonClickHandler(() => {
      this.onScoreTableButtonClickHandler();
    });
    this.controlPanelComponent.setThemeButtonClickHandler(() => {
      this.onThemeChangeHandler();
      this.switchThemeButtonIcon();
    });
    this.controlPanelComponent.setSoundButtonClickHandler(() => {
      this.onSoundChangeHandler();
      this.switchSoundButtonIcon();
    });
  }

  switchSoundButtonIcon() {
    const soundButtonIcon = new SVGComponent({
      template: this.settings.mute === false ? SvgIcons.MUTE : SvgIcons.UNMUTE,
    });
    this.controlPanelComponent.setSoundButtonIcon(soundButtonIcon);
  }

  switchThemeButtonIcon() {
    const themeButtonIcon = new SVGComponent({
      template: this.settings.theme === ThemeValues.LIGHT ? SvgIcons.NIGHT : SvgIcons.DAY,
    });
    this.controlPanelComponent.setThemeButtonIcon(themeButtonIcon);
  }

  getTileSettingSliderValue() {
    return this.controlPanelComponent.getTileSettingSliderValue();
  }

  getMineSettingSliderValue() {
    return this.controlPanelComponent.getMineSettingSliderValue();
  }
}

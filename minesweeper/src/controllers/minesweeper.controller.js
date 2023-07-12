import { MinesweeperComponent } from '../components/minesweeper/minesweeper.component';
import { ControlPanelController } from './control-panel.controller';
import { PlaygroundController } from './playground.controller';
import { EndGameModalComponent } from '../components/modal/end-game-modal.component';
import { ThemeValues, WIN_SIGN, WIN_TEXT, LOSE_TEXT, LOSE_SIGN } from '../utils/constants';
import { SIZE_VARIANTS } from '../utils/constants';
import { ScoreTableModalComponent } from '../components/modal/score-table-modal.component';
import { BaseComponent } from '../components/base.component';

const DEFAULT_SETTINGS = {
  boardSize: 10,
  boardMineCount: 10,
  theme: ThemeValues.LIGHT,
  mute: false,
};

const SCORE_TABLE_STORAGE_KEY = 'scoreTable';
const SETTINGS_STORAGE_KEY = 'settings';

export class MinesweeperController {
  savedSettings = JSON.parse(localStorage.getItem(SETTINGS_STORAGE_KEY));
  settings = this.savedSettings || DEFAULT_SETTINGS;
  minesweeperComponent = new MinesweeperComponent();
  controlPanelController = new ControlPanelController(
    this.settings,
    this.minesweeperComponent,
    this.onStartGameButtonClickHandler.bind(this),
    this.onThemeChangeHandler.bind(this),
    this.onSoundChangeHandler.bind(this),
    this.onScoreTableButtonClickHandler.bind(this)
  );
  playgroundController = new PlaygroundController(
    this.settings,
    this.minesweeperComponent,
    this.onGameEndHandler.bind(this)
  );
  timer = null;
  intervalId = null;
  scoreTable = JSON.parse(localStorage.getItem(SCORE_TABLE_STORAGE_KEY)) || [];

  constructor(container) {
    this.container = container;
  }

  render() {
    this.container.append(this.minesweeperComponent);
    this.controlPanelController.render();
    this.playgroundController.render();
    switch (this.settings.theme) {
      case 'light':
        this.minesweeperComponent.addClass(`theme-${ThemeValues.LIGHT}`);
        break;
      case 'dark':
        this.minesweeperComponent.addClass(`theme-${ThemeValues.DARK}`);
        break;
    }

    window.addEventListener('beforeunload', () => {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(this.settings));
    });
  }

  onThemeChangeHandler() {
    const prevThemeClassName = `theme-${this.settings.theme}`;
    this.minesweeperComponent.toggleClass(prevThemeClassName);

    this.settings.theme = this.settings.theme === ThemeValues.LIGHT ? ThemeValues.DARK : ThemeValues.LIGHT;

    const newThemeClassName = `theme-${this.settings.theme}`;
    this.minesweeperComponent.toggleClass(newThemeClassName);
  }

  onSoundChangeHandler() {
    this.settings.mute = !this.settings.mute;
    this.playgroundController.applySoundSettings();
  }

  onScoreTableButtonClickHandler() {
    if (this.scoreTable.length > 0) {
      const list = this.scoreTable.map((item) => {
        const { name, time, steps } = item;
        const content = `${name} | ${time} | ${steps} moves`;
        const note = new BaseComponent({ textContent: content });
        return note;
      });
      this.scoreModal = new ScoreTableModalComponent({ items: list });
    } else {
      this.scoreModal = new ScoreTableModalComponent();
    }
    this.scoreModal.setSubmitClickHandler(this.onScoreTableSubmitClickHandler.bind(this));
    this.minesweeperComponent.append(this.scoreModal);
  }

  onStartGameButtonClickHandler() {
    const tileSliderValue = this.controlPanelController.getTileSettingSliderValue();
    const mineSliderValue = this.controlPanelController.getMineSettingSliderValue();

    this.settings.boardSize = SIZE_VARIANTS[tileSliderValue];
    this.settings.boardMineCount = mineSliderValue;
    this.playgroundController.restartGame();
  }

  onEndGameSubmitClickHandler() {
    this.endGameModal.destroy();
    this.endGameModal = null;
  }

  onScoreTableSubmitClickHandler() {
    this.scoreModal.destroy();
    this.scoreModal = null;
  }

  onGameEndHandler(sign, steps, timer) {
    this.playgroundController.stopTimer();
    switch (sign) {
      case WIN_SIGN: {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        const minuteSubstr = `${minutes === 0 ? '' : `${minutes}  ${minutes > 1 ? 'minutes' : 'minute'}`}`;
        const secondSubstr = `${seconds === 0 ? '' : `${seconds}  ${seconds > 1 ? 'seconds' : 'second'}`}`;
        const timeSubtring =
          minuteSubstr === '' && secondSubstr === '' ? `instantly in` : `in ${minuteSubstr} ${secondSubstr} and`;
        const winText = WIN_TEXT.replace('in ## seconds and', timeSubtring).replace('#N', steps);
        this.endGameModal = new EndGameModalComponent({ textContent: winText });
        const scoreRecord = {
          name: new Date().toLocaleTimeString('en-US', { hour12: false }),
          time: `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
          steps: steps,
        };
        this.scoreTable.unshift(scoreRecord);
        this.scoreTable.length = 10;
        this.scoreTable = this.scoreTable.filter((score) => score !== null);
        localStorage.setItem(SCORE_TABLE_STORAGE_KEY, JSON.stringify(this.scoreTable));
        break;
      }
      case LOSE_SIGN:
        this.endGameModal = new EndGameModalComponent({ textContent: LOSE_TEXT });
    }
    this.endGameModal.setSubmitClickHandler(this.onEndGameSubmitClickHandler.bind(this));
    this.minesweeperComponent.append(this.endGameModal);
  }
}

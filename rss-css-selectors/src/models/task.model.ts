import { additionalGameLevels } from '../enums/levels/game-additional-levels';
import { defaultGameLevels } from '../enums/levels/game-default-levels';
import { StorageKeys } from '../enums/storage-keys';
import { StateService } from '../services/state.service';
import { IGameLevel, IStoredProgress } from '../types/model';

export class TaskModel {
  levels: IGameLevel[] = [];
  constructor() {
    this.levels = this.mergeLevels(defaultGameLevels, additionalGameLevels);
    this.loadFromStorage();
  }

  private mergeLevels(baseLevels: IGameLevel[], ...data: IGameLevel[][]) {
    const clone = (levelSet: IGameLevel[]) => levelSet.slice().map((item) => Object.assign({}, item));
    const newBaseLevel = clone(baseLevels);
    let result: IGameLevel[] = newBaseLevel;
    const otherNewSets = data.map((dataItem) => clone(dataItem));
    otherNewSets.forEach((dataItem) => dataItem.forEach((level) => (level.isNew = true)));
    result = result.concat(...otherNewSets);

    return result;
  }

  public getLevels() {
    return this.levels;
  }

  public saveToStorage() {
    const saves: IStoredProgress[] = [];
    const completedLevels = this.levels.filter((level) => level.isComplete);
    if (completedLevels.length > 0) {
      for (const level of completedLevels) {
        const { isComplete, isWithHelp } = level;
        const key = this.levels.findIndex((item) => item === level).toString();
        const save: IStoredProgress = {
          [key]: {
            isComplete,
            isWithHelp,
          },
        };
        saves.push(save);
      }
    }
    if (saves.length > 0) {
      localStorage.setItem(StorageKeys.PROGRESS, JSON.stringify(saves));
    }
  }

  private loadFromStorage() {
    const savedProgressString = localStorage.getItem(StorageKeys.PROGRESS);
    if (!savedProgressString) {
      return;
    }

    const savedProgress = JSON.parse(savedProgressString) as IStoredProgress[];
    for (const levelRecord of savedProgress) {
      const keys = Object.keys(levelRecord);
      for (const key of keys) {
        const index = Number(key);
        const progressData = levelRecord[index];
        Object.assign(this.levels[index], progressData);
      }
    }
  }

  public resetLevels() {
    localStorage.removeItem(StorageKeys.PROGRESS);
    this.levels = this.mergeLevels(defaultGameLevels, additionalGameLevels);
    StateService.cleanStorage();
    StateService.setLevel(0);
  }
}

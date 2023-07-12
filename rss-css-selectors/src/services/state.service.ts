import { StorageKeys } from '../enums/storage-keys';

export abstract class StateService {
  private static currentLevel: number = StateService.loadCurrentLevel();
  private static onLevelChangeHandlers: (() => void)[] = [];

  private static loadCurrentLevel(): number {
    const value = localStorage.getItem(StorageKeys.CURRENT_LEVEL) ?? 0;
    return +value;
  }

  public static getCurrentLevel() {
    return StateService.currentLevel;
  }

  public static saveToStorage() {
    localStorage.setItem(StorageKeys.CURRENT_LEVEL, this.currentLevel.toString());
  }

  public static cleanStorage() {
    localStorage.removeItem(StorageKeys.CURRENT_LEVEL);
  }

  public static setNextLevel() {
    this.currentLevel += 1;
    StateService.levelChangeNotify();
  }

  public static setPrevLevel() {
    this.currentLevel -= 1;
    StateService.levelChangeNotify();
  }

  public static setLevel(value: number) {
    this.currentLevel = value;
    StateService.levelChangeNotify();
  }

  public static setChangeLevelHandler(handler: () => void) {
    this.onLevelChangeHandlers.push(handler);
  }

  public static levelChangeNotify() {
    this.onLevelChangeHandlers.forEach((handler) => handler());
  }
}

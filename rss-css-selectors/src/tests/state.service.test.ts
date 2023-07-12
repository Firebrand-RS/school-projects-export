import { StateService } from '../services/state.service';

describe('State service', () => {
  const state = StateService;

  test('should return current game level as integer', () => {
    const level = state.getCurrentLevel();
    expect(level).toBe(+parseInt(level.toString()));
  });

  test('should return next level greater than the current', () => {
    state.setLevel(10);
    const currentLevel = state.getCurrentLevel();
    state.setNextLevel();
    const nextLevel = state.getCurrentLevel();
    expect(nextLevel).toBeGreaterThan(currentLevel);
  });

  test('should return prev level lower than the current', () => {
    state.setLevel(10);
    const currentLevel = state.getCurrentLevel();
    state.setPrevLevel();
    const prevLevel = state.getCurrentLevel();
    expect(prevLevel).toBeLessThan(currentLevel);
  });

  test('should not call handler function', () => {
    const handler = jest.fn();
    state.setChangeLevelHandler(handler);
    expect(handler).not.toHaveBeenCalled();
  });

  test('notify method must call handlers', () => {
    const handler1 = jest.fn();
    const handler2 = jest.fn();
    state.setChangeLevelHandler(handler1);
    state.setChangeLevelHandler(handler2);
    state.levelChangeNotify();
    expect(handler1).toHaveBeenCalled();
    expect(handler2).toHaveBeenCalled();
  });

  test('notify method must call handlers once', () => {
    const handler = jest.fn();
    state.setChangeLevelHandler(handler);
    state.levelChangeNotify();
    expect(handler).toHaveBeenCalledTimes(1);
  });
});

//should return base component object //should be defined instance or methods
//should return default node element
//should chaneg classname if add new class
//should call handler function

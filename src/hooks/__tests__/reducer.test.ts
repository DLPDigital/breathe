import { reducer, initialState, Action } from "../reducer";

describe("Reducer", () => {
  test("START_SESSION action updates state correctly", () => {
    const action: Action = { type: "START_SESSION", payload: 5 };
    const newState = reducer(initialState, action);

    expect(newState.breathsRemaining).toBe(5);
    expect(newState.showModal).toBe(false);
    expect(newState.isActive).toBe(true);
  });

  test("SET_COUNT action updates count correctly", () => {
    const state = { ...initialState, countUp: true };
    const action: Action = { type: "SET_COUNT", payload: 10 };
    const newState = reducer(state, action);

    expect(newState.count).toBe(10);
  });

  test("BREATH_COMPLETE is correct", () => {
    const state = { ...initialState };
    const action: Action = { type: "BREATH_COMPLETE" };
    const newState = reducer(state, action);

    expect(newState.count).toBe(0);
  });

  test("TOGGLE_DIRECTION is correct", () => {
    const state = { ...initialState };
    const action: Action = { type: "TOGGLE_DIRECTION" };
    const newState = reducer(state, action);

    expect(newState.countUp).toBe(false);
  });

  test("UPDATE_BREATH_INPUT is correct", () => {
    const state = { ...initialState };
    const action: Action = { type: "UPDATE_BREATH_INPUT", payload: "test string"};
    const newState = reducer(state, action);

    expect(newState.breathInput).toBe("test string");
  });

  test("FADE_TEXT is correct", () => {
    const state = { ...initialState };
    const action: Action = { type: "FADE_TEXT" };
    const newState = reducer(state, action);

    expect(newState.textOpacity).toBe(0);
  });

  test("SET_TEXT is correct", () => {
    const state = { ...initialState };
    const action: Action = { type: "SET_TEXT", payload: "Breathe Out Text" };
    const newState = reducer(state, action);

    expect(newState.displayText).toBe("Breathe Out Text");
  });
});

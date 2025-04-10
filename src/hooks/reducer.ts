export type Action = 
  | { type: "START_SESSION"; payload: number }
  | { type: "BREATH_COMPLETE" }
  | { type: "TOGGLE_DIRECTION" }
  | { type: "SET_COUNT"; payload: number }
  | { type: "UPDATE_BREATH_INPUT"; payload: string }
  | { type: "FADE_TEXT" }
  | { type: "SET_TEXT"; payload: string };

// Define the state shape
export interface State {
  count: number;
  countUp: boolean;
  textOpacity: number;
  displayText: string;
  breathsRemaining: number;
  isActive: boolean;
  showModal: boolean;
  breathInput: string;
}

// Initial state
export const initialState: State = {
  count: 0,
  countUp: true,
  textOpacity: 1,
  displayText: "Breathe In",
  breathsRemaining: 10,
  isActive: false,
  showModal: true,
  breathInput: "10"
};

// Reducer function
export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "START_SESSION":
      return {
        ...state,
        breathsRemaining: action.payload,
        isActive: true,
        showModal: false
      };
    case "BREATH_COMPLETE":
      return {
        ...state,
        breathsRemaining: state.breathsRemaining - 1,
        countUp: true
      };
    case "TOGGLE_DIRECTION":
      return {
        ...state,
        countUp: !state.countUp
      };
    case "SET_COUNT":
      return {
        ...state,
        count: action.payload
      };
    case "UPDATE_BREATH_INPUT":
      return {
        ...state,
        breathInput: action.payload
      };
    case "FADE_TEXT":
      return {
        ...state,
        textOpacity: 0
      };
    case "SET_TEXT":
      return {
        ...state,
        displayText: action.payload,
        textOpacity: 1
      };
    default:
      return state;
  }
}
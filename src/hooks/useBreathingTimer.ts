import { useEffect } from 'react';
import { State, Action } from './reducer'; // Import your types from reducer

export function useBreathingTimer(
  state: Pick<State, 'count' | 'countUp' | 'breathsRemaining' | 'isActive'>,
  dispatch: React.Dispatch<Action>
) {
  const { count, countUp, breathsRemaining, isActive } = state;
  
  useEffect(() => {
    if (breathsRemaining <= 0 || !isActive) return;

    const timer = setInterval(() => {
      if (countUp) {
        if (count >= 100) {
          dispatch({ type: "TOGGLE_DIRECTION" });
        } else {
          dispatch({ type: "SET_COUNT", payload: count + 2 });
        }
      } else {
        if (count <= 0) {
          dispatch({ type: "BREATH_COMPLETE" });
        } else {
          dispatch({ type: "SET_COUNT", payload: count - 2 });
        }
      }
    }, 60);

    return () => clearInterval(timer);
  }, [count, countUp, breathsRemaining, isActive, dispatch]);
}
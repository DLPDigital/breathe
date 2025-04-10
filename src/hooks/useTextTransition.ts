import { useEffect } from 'react';
import { Action } from './reducer';

export function useTextTransition(
  countUp: boolean,
  dispatch: React.Dispatch<Action>
) {
  useEffect(() => {
    // First fade out the current text
    dispatch({ type: "FADE_TEXT" });

    // After text fades out, change the text content and fade back in
    const textTimer = setTimeout(() => {
      dispatch({
        type: "SET_TEXT",
        payload: countUp ? "Breathe In" : "Breathe Out",
      });
    }, 300); // Wait for fade-out transition to complete
    
    return () => clearTimeout(textTimer);
  }, [countUp, dispatch]);
}

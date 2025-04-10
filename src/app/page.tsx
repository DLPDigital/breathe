"use client";

import React, { useReducer, useEffect } from "react";
import { initialState, reducer } from "@/hooks/reducer";
import { useBreathingTimer } from "@/hooks/useBreathingTimer";
import { useTextTransition } from "@/hooks/useTextTransition";
import { IntroModal } from "@/components/IntroModal";
import { SmallFooter } from "@/components/GithubFooter";

const Home: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    count,
    countUp,
    textOpacity,
    displayText,
    breathsRemaining,
    isActive,
    showModal,
    breathInput,
  } = state;

  useBreathingTimer({ count, countUp, breathsRemaining, isActive }, dispatch);
  useTextTransition(countUp, dispatch);

  // Form handler
  const handleStartSession = (e: React.FormEvent) => {
    e.preventDefault();
    const breathCount = parseInt(breathInput);
    if (isNaN(breathCount) || breathCount <= 0) {
      alert("Please enter a valid number of breaths");
      return;
    }

    dispatch({ type: "START_SESSION", payload: breathCount });
  };

  const opacity = count / 100;

  return (
    <div className="bg-emerald-700 h-screen relative">
      <div
        className="bg-sky-200 h-screen w-full"
        style={{ opacity: opacity }}
      ></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1
          className="text-4xl text-white transition-opacity duration-300 font-serif"
          style={{ opacity: textOpacity }}
        >
          {breathsRemaining > 0 ? displayText : "Session Complete"}
        </h1>
        <div className="rounded-sm mt-4 w-[200px] h-[8px] bg-gradient-to-r from-emerald-700 to-sky-200"></div>
      </div>

      <div className="absolute bottom-6 right-6">
        <p className="text-white text-xl font-semibold">
          {breathsRemaining > 0
            ? `${breathsRemaining} breaths remaining`
            : "Complete"}
        </p>
      </div>
      {breathsRemaining === 0 && (
        <div className="absolute bottom-6 left-6">
          <SmallFooter />
        </div>
      )}

      {showModal && (
        <IntroModal
          handleStartSession={handleStartSession}
          breathInput={breathInput}
          dispatch={dispatch}
        />
      )}
    </div>
  );
};

export default Home;

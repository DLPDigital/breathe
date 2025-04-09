"use client";

import React, { useState, useEffect } from "react";

const Home: React.FC = () => {
  const [count, setCount] = useState(0);
  const [countUp, setCountUp] = useState(true);
  const [textOpacity, setTextOpacity] = useState(1);
  const [displayText, setDisplayText] = useState("Breathe In");
  const [breathsRemaining, setBreathsRemaining] = useState(10);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    // Stop the timer when no breaths remain
    if (breathsRemaining <= 0) {
      setIsActive(false);
      return;
    }

    // Only run the interval if the exercise is active
    if (!isActive) return;

    const timer = setInterval(() => {
      setCount((prevCount) => {
        if (countUp) {
          if (prevCount >= 100) {
            setCountUp(false);
            return 100;
          }
          return prevCount + 2;
        } else {
          if (prevCount <= 0) {
            // Complete breath cycle
            setCountUp(true);
            // Decrement breath count when cycle completes
            setBreathsRemaining((prev) => prev - 0.5);
            return 0;
          }
          return prevCount - 2;
        }
      });
    }, 60);

    return () => clearInterval(timer);
  }, [countUp, breathsRemaining, isActive]);

  useEffect(() => {
    setTextOpacity(0);

    const textTimer = setTimeout(() => {
      setDisplayText(countUp ? "Breathe In" : "Breathe Out");
      setTextOpacity(1);
    }, 300);

    return () => clearTimeout(textTimer);
  }, [countUp]);

  const opacity = count / 100;
  return (
    <div className="bg-emerald-700 h-screen relative">
      <div
        className="bg-sky-200 h-screen w-full"
        style={{ opacity: opacity }}
      ></div>

      <div className="absolute inset-0 flex items-center justify-center">
        <h1
          className="text-4xl text-white transition-opacity duration-300 font-serif"
          style={{ opacity: textOpacity }}
        >
          {breathsRemaining > 0 ? displayText : "Session Complete"}
        </h1>
      </div>

      {/* Breath Counter */}
      <div className="absolute bottom-6 right-6">
        <p className="text-white text-xl font-semibold">
          {breathsRemaining > 0 ? `${breathsRemaining} breaths remaining` : "Complete"}
        </p>
      </div>
    </div>
  );
};

export default Home;
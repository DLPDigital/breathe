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
    if (breathsRemaining <= 0) {
      setIsActive(false);
      return;
    }

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
            setCountUp(true);
            setBreathsRemaining((prev) => prev - 1);
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

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1
          className="text-4xl text-white transition-opacity duration-300 font-serif"
          style={{ opacity: textOpacity }}
        >
          {breathsRemaining > 0 ? displayText : "Session Complete"}
        </h1>
        <div className="rounded-sm mt-4 w-[200px] h-[8px] bg-linear-to-r from-emerald-700 to-sky-200"></div>
      </div>

      <div className="absolute bottom-6 right-6">
        <p className="text-white text-xl font-semibold">
          {breathsRemaining > 0
            ? `${breathsRemaining} breaths remaining`
            : "Complete"}
        </p>
      </div>
    </div>
  );
};

export default Home;

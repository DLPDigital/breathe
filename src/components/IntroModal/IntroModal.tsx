"use client";

import React from "react";
import { Action } from "@/hooks/reducer";
import { SmallFooter } from "../GithubFooter";
import { container, innerContainer, header, formContainer, labelContainer, inputContainer, buttonContainer } from "./IntroModal.styles";

type Props = {
  handleStartSession: (e: React.FormEvent) => void;
  breathInput: string;
  dispatch: React.Dispatch<Action>;
};

export const IntroModal: React.FC<Props> = ({
  handleStartSession,
  breathInput,
  dispatch,
}) => {
  return (
    <div className={container}>
      <div className={innerContainer}>
        <h2 className={header}>
          Start a Breathing Session
        </h2>
        <form onSubmit={handleStartSession} data-testid="breath-form">
          <div className={formContainer}>
            <label className={labelContainer} htmlFor="breaths">
              How many breaths would you like to take?
            </label>
            <input
              id="breaths"
              type="number"
              min="1"
              className={inputContainer}
              value={breathInput}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_BREATH_INPUT",
                  payload: e.target.value,
                })
              }
            />
          </div>
          <button
            type="submit"
            className={buttonContainer}
          >
            Start Session
          </button>
        </form>
        <SmallFooter />
      </div>
    </div>
  );
};

"use client";

import React from "react";
import { Action } from "@/hooks/reducer";
import { SmallFooter } from "./GithubFooter";

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-emerald-700">
          Start a Breathing Session
        </h2>
        <form onSubmit={handleStartSession}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="breaths">
              How many breaths would you like to take?
            </label>
            <input
              id="breaths"
              type="number"
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
            className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition-colors"
          >
            Start Session
          </button>
        </form>
        <SmallFooter />
      </div>
    </div>
  );
};

import { render } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import "@testing-library/jest-dom"; // This adds the DOM matchers to Jest
import { IntroModal } from "../IntroModal";

describe("IntroModal", () => {
  test("renders correctly", () => {
    const handleStartSession = jest.fn();
    const dispatch = jest.fn();

    const { getByText, getByRole} = render(
      <IntroModal
        handleStartSession={handleStartSession}
        breathInput="5"
        dispatch={dispatch}
      />
    );

    expect(getByText(/how many breaths/i)).toBeInTheDocument();
    expect(getByRole("button", { name: /start/i })).toBeInTheDocument();
  });

  test("calls handleStartSession when form is submitted", () => {
    const handleStartSession = jest.fn();
    const dispatch = jest.fn();

    const { getByTestId } = render(
      <IntroModal
        handleStartSession={handleStartSession}
        breathInput="5"
        dispatch={dispatch}
      />
    );

    const form = getByTestId("breath-form");
    fireEvent.submit(form);
    
    expect(handleStartSession).toHaveBeenCalled();
  });
});

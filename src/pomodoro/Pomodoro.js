import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import Session from "./Session"
import TimerDisplay from "./TimerDisplay";
import PlayPause from "./PlayPause";

const INITIAL_STATE= {
  isTimerRunning: false,
  session: null,
}

// These functions are defined outside of the component to insure they do not have access to state
// and are, therefore more likely to be pure.

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */
function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

/**
 * Higher order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */
function nextSession(focusDuration, breakDuration) {
  /**
   * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
   */
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        timeRemaining: breakDuration * 60,
      };
    }
    return {
      label: "Focusing",
      timeRemaining: focusDuration * 60,
    };
  };
}





function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(INITIAL_STATE.isTimerRunning);
  // The current session - null where there is no session running
  const [session, setSession] = useState(INITIAL_STATE.session);

  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);

  /**
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You will not need to make changes to the callback function
   */
  useInterval(() => {
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        return setSession(nextSession(focusDuration, breakDuration));
      }
      return setSession(nextTick);
    },
    isTimerRunning ? 1000 : null
  );

  /**
   * Called whenever the play/pause button is clicked.
   */
  function playPause() {
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
          // If the timer is starting and the previous session is null,
          // start a focusing session.
          if (prevStateSession === null) {
            return {
              label: "Focusing",
              timeRemaining: focusDuration * 60,
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
  }

  // My written Functions
  // Increase and Decrease focus buttons
  function handleDecreaseFocus() {
    if (focusDuration === 5) return;
    setFocusDuration((focusDuration) => focusDuration - 5);
  }
  function handleIncreaseFocus() {
    if (focusDuration === 60) return;
    setFocusDuration((focusDuration) => focusDuration + 5);
  }
  // My written Functions
  // Increase and Decrease break buttons
  function handleDecreaseBreak() {
    if (breakDuration === 1) return;
    setBreakDuration((breakDuration) => breakDuration - 1);
  }
  function handleIncreaseBreak() {
    if (breakDuration === 15) return;
    setBreakDuration((state) => state + 1);
  }
  
  // My written Functions
  function handleStop() {
    setIsTimerRunning(INITIAL_STATE.isTimerRunning);
    setSession(INITIAL_STATE.session);
  }


  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <TimerDisplay 
          label={"Focus"} 
          handleIncrease={handleIncreaseFocus} 
          handleDecrease={handleDecreaseFocus}
          session={session}
          duration={focusDuration}
           />
        </div>
        <div className="col">
          <div className="float-right">
            <TimerDisplay 
            label={"Break"} 
            handleIncrease={handleIncreaseBreak} 
            handleDecrease={handleDecreaseBreak}
            session={session}
            duration={breakDuration}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <PlayPause playPause={playPause} classNames={classNames} isTimerRunning={isTimerRunning} />
              
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="stop"
              title="Stop the session"
              disabled={!session}
              onClick={handleStop}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      <Session session={session} focusDuration={focusDuration} breakDuration={breakDuration} />
    </div>
  );
}

export default Pomodoro;

import React from "react"
import { minutesToDuration, secondsToDuration } from "../utils/duration";

export default function Session({ session, focusDuration, breakDuration }) {
    //count down percentage
    // const secondCountdown = (session?.timeRemaining / (focusDuration*60))*100

    let x = null;
    session?.label === "Focusing" ? x = focusDuration : x = breakDuration;
     //count up percentage
    const secondInterval = (((`${x}`*60) - session?.timeRemaining) / (`${x}`*60)) * 100

    return (
     
        <div>
        <div className="row mb-2">
          <div className="col">
            <h2 data-testid="session-title">
              {/* session && session.label is the same as session?.label */}
              {session?.label} for {" "}
              {session?.label === "Focusing"
              ? minutesToDuration(focusDuration)
              : minutesToDuration(breakDuration)}{" minutes"}

            </h2>
            <p className="lead" data-testid="session-sub-title">
              {secondsToDuration(session?.timeRemaining)} remaining
            </p>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={secondInterval} 
                style={{ width: `${secondInterval}%` }} 
              />
            </div>
          </div>
        </div>
      </div>
    )
}


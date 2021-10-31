import React from "react"
import { minutesToDuration, secondsToDuration } from "../utils/duration";

export default function Session({ session, focusDuration, breakDuration }) {
    if(!session) return null;
    
    //count down percentage
    // const secondCountdown = (session?.timeRemaining / (focusDuration*60))*100

   
    let x = null;
    session?.label === "Focusing" ? x = focusDuration : x = breakDuration;
    
     //count up percentage
    const secondInterval = (((`${x}`*60) - session?.timeRemaining) / (`${x}`*60)) * 100

    // console.log("Duration: ", (focusDuration*60), session.timeRemaining)
     console.log(secondInterval)


    return (
     
        <div>
        {/* TODO: This area should show only when there is an active focus or break - i.e. the session is running or is paused */}
        <div className="row mb-2">
          <div className="col">
            {/* TODO: Update message below to include current session (Focusing or On Break) total duration */}
            <h2 data-testid="session-title">
              {/* session && session.label is the same as session?.label */}
              {session?.label} for {" "}
              {session?.label === "Focusing"
              ? minutesToDuration(focusDuration)
              : minutesToDuration(breakDuration)}{" minutes"}

            </h2>
            {/* TODO: Update message below correctly format the time remaining in the current session */}
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
                aria-valuenow={secondInterval} // TODO: Increase aria-valuenow as elapsed time increases
                style={{ width: `${secondInterval}%` }} // TODO: Increase width % as elapsed time increases
              />
            </div>
          </div>
        </div>
      </div>
    )
}


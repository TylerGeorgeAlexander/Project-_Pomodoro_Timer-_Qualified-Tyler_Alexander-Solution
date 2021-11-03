import React from "react"
import { minutesToDuration, secondsToDuration } from "../utils/duration";

export default function Session({ session, focusDuration, breakDuration }) {
    //count down percentage
    // const secondCountdown = (session?.timeRemaining / (focusDuration*60))*100;

    /* SPECIFIC LINE 10 ... Copied from the instruction page

If you do any of the following, you may receive feedback on them as things to improve. Doing any of these will not cause you to fail the assessment or need to produce revisions.

Use of any non-pure functions that can be changed into pure functions.

Use of any variable or function names that can be improved (such as highly abbreviated names).

Use of if statement to bound lower and upper limits of the focus or break duration. This is because using Math.min() and Math.max() appropriately eliminates the need for if statements with numeric boundaries.

Use of if statements in the returned JSX. Although there is nothing wrong with using conditional statements embedded in JSX, avoiding them generally makes the code easier to understand and maintain.

Use of components with multiple responsibilities or multiple reasons to re-render. For example, if the time format or the upper bound for the focus duration change, consider how many components would need to re-render.

Lots of conditional logic embedded in the useInterval() hook. Most logic should be broken out into small, single-responsibility pure functions that mutate the state as necessary.

*/

    let sessionDuration = null;
    sessionDuration = session?.label === "Focusing" ? focusDuration : breakDuration;
     //count up percentage
    const secondInterval = (((sessionDuration*60) - session?.timeRemaining) / (sessionDuration*60)) * 100;

    return (session) && (
        <div>
        <div className="row mb-2">
          <div className="col">
            <h2 data-testid="session-title">
              {/* session && session.label is the same as session?.label */}
              {session?.label} for {minutesToDuration(sessionDuration)} minutes
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


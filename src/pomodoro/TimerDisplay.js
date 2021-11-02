import React from "react";
import { minutesToDuration } from "../utils/duration"


export default function TimerDisplay({ label, duration, handleIncrease, handleDecrease, session   }) {
    return (
        <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid={`duration-${label.toLowerCase()}`}>
              {label} Duration: {minutesToDuration(duration)}
            </span>
            <div className="input-group-append">
              <button
                type="button"
                className="btn btn-secondary"
                data-testid={`decrease-${label.toLowerCase()}`}
                onClick={handleDecrease}
                disabled={session}
              >
                <span className="oi oi-minus" />
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-testid={`increase-${label.toLowerCase()}`}
                onClick={handleIncrease}
                disabled={session}
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
    )
}

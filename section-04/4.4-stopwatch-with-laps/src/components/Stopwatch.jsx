import { useState, useEffect, useRef } from "react";

/*
1 second has 1,000 milliseconds.
1 second also has 100 hundredths of a second (like cents in a dollar).
Therefore: 1 hundredth = 10 milliseconds.
Dividing by 10 cuts off the final millisecond
 digit:$83,450 \div 10 = 8,345\text{ hundredths}$
 .Math.floor() rounds down so we don't have to deal with decimals.
*/

// Formats milliseconds into MM:SS.hh (e.g. 01:23.45)
function formatTime(ms) {
  const pad = (n) => String(n).padStart(2, "0");
  const totalHundredths = Math.floor(ms / 10);

  const minutes = Math.floor(totalHundredths / 6000);
  const seconds = Math.floor((totalHundredths / 100) % 60);
  const hundredths = totalHundredths % 100;

  return `${pad(minutes)}:${pad(seconds)}.${pad(hundredths)}`;
}

/*
| Action / Event      | Real Clock (`Date.now()`) | `elapsed` (Banked) | `startTimeRef` (Anchor) | Display  | What is Actually Happening                                        |
| :------------------ | :------------------------ | :----------------- | :---------------------- | :------- | :---------------------------------------------------------------- |
| **Start**           | 12:00:00                  | 0s                 | 12:00:00                | 00:00.00 | First press: `startTimeRef = Date.now() - 0 = 12:00:00`.          |
| **Running**         | 12:00:10                  | 10s                | 12:00:00                | 00:10.00 | Active tick: `Date.now() - startTimeRef` = `12:00:10 - 12:00:00`. |
| **Stop**            | 12:00:10                  | 10s (saved)        | 12:00:00                | 00:10.00 | Interval cleared. State retains the final `10s` value.            |
| **Paused Break**    | 12:01:00                  | 10s                | 12:00:00                | 00:10.00 | Real clock gains 50s. State is idle, screen stays frozen at `10s`.|
| **Resume (Start)**  | 12:01:00                  | 10s                | 12:00:50 (shifted)      | 00:10.00 | Recalculate anchor: `Date.now() - elapsed` = `12:01:00 - 10s`.    |
| **Running (+1s)**   | 12:01:01                  | 11s                | 12:00:50                | 00:11.00 | Active tick: `12:01:01 - 12:00:50 = 11s`. 50s rest gap omitted.   |
*/
export default function Stopwatch() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]); // Array of individual lap durations

  const startTimeRef = useRef(0);
  const lastLapElapsedRef = useRef(0);

  // Heartbeat: Synchronized to real-world clock so it never drifts
  useEffect(() => {
    if (!running) return;

    const intervalId = setInterval(() => {
      setElapsed(Date.now() - startTimeRef.current);
    }, 10);

    // Cleanup: Automatically runs on Stop, and when the component unmounts (hidden)
    return () => clearInterval(intervalId);
  }, [running]);

  // Handlers
  const handleStart = () => {
    // Offset by previously elapsed time so it resumes properly
    startTimeRef.current = Date.now() - elapsed;
    setRunning(true);
  };

  const handleStop = () => {
    setRunning(false);
  };

  /*

  | Action / Event | Total Time (`elapsed`) | Previous Checkpoint (`lastLapElapsedRef`) | Lap Math (`elapsed - marker`) | Saved Lap Time | Stored Array (`laps`) | New Checkpoint (`lastLapElapsedRef`) |
| :------------- | :--------------------- | :---------------------------------------- | :---------------------------- | :------------- | :-------------------- | :----------------------------------- |
| **Start**      | 00:00.00 (0s)          | 0s                                        | —                             | —              | `[]`                  | 0s                                   |
| **Click Lap 1**| 00:10.00 (10s)         | 0s                                        | `10s - 0s = 10s`              | Lap 1: 10s     | `[10s]`               | 10s                                  |
| **Click Lap 2**| 00:25.00 (25s)         | 10s                                       | `25s - 10s = 15s`             | Lap 2: 15s     | `[15s, 10s]`          | 25s                                  |
| **Click Lap 3**| 00:37.00 (37s)         | 25s                                       | `37s - 25s = 12s`             | Lap 3: 12s     | `[12s, 15s, 10s]`     | 37s                                  |
| **Reset**      | 00:00.00 (0s)          | 37s                                       | Cleared                       | —              | `[]`                  | 0s                                   |
   
*/
  const handleLap = () => {
    // Current lap duration = total elapsed so far - elapsed at previous lap
    const currentLapTime = elapsed - lastLapElapsedRef.current;

    // Save newest lap first
    setLaps((prevLaps) => [currentLapTime, ...prevLaps]);

    // Move checkpoint forward
    lastLapElapsedRef.current = elapsed;
  };

  const handleReset = () => {
    setElapsed(0);
    setLaps([]);
    lastLapElapsedRef.current = 0;
  };

  // Color logic: only highlight once 3 or more laps exist
  const minLap = laps.length >= 3 ? Math.min(...laps) : null;
  const maxLap = laps.length >= 3 ? Math.max(...laps) : null;

  const getLapColor = (time) => {
    if (laps.length < 3) return "";
    if (time === minLap) return "text-green-600 font-bold";
    if (time === maxLap) return "text-red-600 font-bold";
    return "";
  };

  const btnStyle =
    "px-4 py-2 rounded text-white bg-blue-600 disabled:opacity-40 font-medium";

  return (
    <div className="max-w-xs mx-auto text-center p-6 space-y-4 font-mono">
      <div className="text-4xl font-bold">{formatTime(elapsed)}</div>

      <div className="flex justify-center gap-2">
        {!running ? (
          <button className={btnStyle} onClick={handleStart}>
            Start
          </button>
        ) : (
          <button className={btnStyle} onClick={handleStop}>
            Stop
          </button>
        )}

        <button className={btnStyle} onClick={handleLap} disabled={!running}>
          Lap
        </button>

        <button className={btnStyle} onClick={handleReset} disabled={running}>
          Reset
        </button>
      </div>

      {/* Laps List: Newest First */}
      <ul className="divide-y divide-gray-200 text-sm max-h-60 overflow-y-auto">
        {laps.map((lapDuration, index) => {
          const lapNumber = laps.length - index;
          return (
            <li
              key={lapNumber}
              className={`py-2 flex justify-between ${getLapColor(lapDuration)}`}
            >
              <span>Lap {lapNumber}</span>
              <span>{formatTime(lapDuration)}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

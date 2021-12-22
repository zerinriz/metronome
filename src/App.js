/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
import click1 from "./assets/click1.wav";
import click2 from "./assets/click2.wav";
import "./App.css";

const App = () => {
  const [bpm, setBpm] = useState(100);
  const [playing, setPlaying] = useState(false);
  const [count, setCount] = useState(0);
  const beatsPerMeasure = 4;

  const handleBpmChange = (e) => {
    const bpm = e.target.value;
    setBpm(bpm);
  };
  const clickOne = new Audio(click1);
  const clickTwo = new Audio(click2);

  const playClick = useCallback(() => {
    if (count % beatsPerMeasure === 0) {
      clickTwo.play();
    } else {
      clickOne.play();
    }

    setCount((count + 1) % beatsPerMeasure);
  }, [count, beatsPerMeasure, clickOne, clickTwo]);

  useEffect(() => {
    if (playing) {
      const timer = setInterval(playClick, (60 / bpm) * 1000);
      return () => clearInterval(timer);
    }
  }, [playing, bpm, playClick]);

  const startStop = () => {
    if (playing) {
      setPlaying(false);
    } else {
      setCount(0);
      setPlaying(true);
      playClick();
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        Metronome
        <div className="metronome">
          <div className="bpm-slider">
            <div>{bpm} BPM</div>
            <input
              type="range"
              min="40"
              max="200"
              value={bpm}
              onChange={handleBpmChange}
            />
          </div>
          <button onClick={startStop}>{playing ? "Stop" : "Start"}</button>
        </div>
      </div>
    </div>
  );
};

export default App;

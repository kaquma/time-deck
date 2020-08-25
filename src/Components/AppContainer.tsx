import React, { useState, useEffect } from "react";
import * as Cards from "./Cards";
import ActiveControl from "./ActiveControl";

interface TimerData {
  name: string;
  time: number;
}

const AppContainer: React.FC = () => {
  const [second, setSecond] = useState(0);
  const [timerName, setTimerName] = useState("");
  const [isActive, setActive] = useState(false);
  const [inputTime, setInputTime] = useState("");
  const [inputName, setInputName] = useState("");
  const [timerQueue, setTimerQueue] = useState<TimerData[]>([]);

  let configuredTime: number = 0;

  function addTimer(name: string, time: number) {
    if (timerQueue.length === 0) {
      setTimer(name, time);
    }

    setTimerQueue([...timerQueue, { name, time }]);
    setInputName("");
    setInputTime("");
  }

  function setTimer(name: string, time: number) {
    setSecond(time);
    setTimerName(name);
    configuredTime = time;
  }

  const nextTimer = () => {
    setTimerQueue((prevQueue) => {
      const newQueue = [...prevQueue].slice(1);
      if (newQueue.length > 0) {
        console.debug(newQueue);
        const td = newQueue[0];
        console.debug("set " + td.name + ":" + td.time);
        setTimer(td.name, td.time);
      }
      return newQueue;
    });
    setActive(false);
  };

  function onTimeUp() {
    alert("ぽよよーん");
    nextTimer();
  }

  useEffect(() => {
    if (isActive) {
      const id = setInterval(() => {
        setSecond((c) => (c > 0 ? c - 1 : 0));
      }, 1000);
      return () => clearInterval(id);
    }
  }, [isActive]);

  useEffect(() => {
    if (isActive && second === 0) {
      onTimeUp();
    }
  });

  const timerQueueItems = timerQueue.slice(1).map((td, i) => (
    <li key={i.toString()}>
      <span>{i}</span>
      <span>
        : {td.name} {td.time}
      </span>
    </li>
  ));

  return (
    <div className="app-container">
      <h1>Tiler 0.0.1</h1>
      <div>
        <input
          type="text"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
        <input
          type="text"
          value={inputTime}
          onChange={(e) => setInputTime(e.target.value)}
        />
        <button onClick={() => addTimer(inputName, parseInt(inputTime))}>
          追加
        </button>
      </div>
      {timerQueue.length > 0 && (
        <Cards.BluePrint
          name={timerName}
          configuredTime={configuredTime}
          passedTime={configuredTime - second}
        ></Cards.BluePrint>
      )}
      <ActiveControl
        isPlaying={isActive}
        disabled={timerQueue.length > 0 ? false : true}
        noNext={timerQueue.length > 1 ? false : true}
        onPlayButtonPushed={() => setActive(!isActive)}
        onNextButtonPushed={() => nextTimer()}
      ></ActiveControl>
      <div>{timerQueueItems}</div>
    </div>
  );
};

export default AppContainer;

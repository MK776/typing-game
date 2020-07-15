import React from "react"
import useWordGame from "hooks/useWordGame"

const App: React.FC = () => {
  const {
    textBoxRef, 
    handleChange, 
    text, 
    timeRemaining, 
    startGame, 
    score,
    isTimeRunning,
    getTimerMin,
    getTimerSec,
    timerMin,
    timerSec,
    question
  } = useWordGame()

  
  const timeDisplayed = <span>{Math.floor(timeRemaining / 60)}min {timeRemaining % 60}sec</span>;

  return(
    <div>
      <h1>How fast do you type?</h1>
        
      <textarea 
        onChange={handleChange}
        value={text}
        disabled={!isTimeRunning} 
        ref={textBoxRef}
      />
      { isTimeRunning ? 
        <div>
          <h2>Q {score + 1}</h2>
          <h2>{question}</h2>
          <h4>Time reminaing:  {timeDisplayed}</h4>
        </div>:
        <div>
          <h4>Time Set</h4>
          <label>
            <input type="number" value={timerMin} min="0" max="59" step="1" onChange={getTimerMin} disabled={isTimeRunning}/> 
            Min
          </label>
          <label>
            <input type="number" value={timerSec} min="0" max="59" step="1" onChange={getTimerSec} disabled={isTimeRunning}/>
            Sec
          </label>
          <button 
            onClick={startGame}
            disabled={timeRemaining === 0}  
          >
            Start
          </button>
          <h2>Last Score: {score}</h2>
        </div>
      }

    </div>
  );
}

export default App;
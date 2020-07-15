import {useState, useEffect, useRef} from "react";

const useWordGame = () =>{
  const [text, setText] = useState('');
  const [timeRemaining, setTimeRemainig] = useState(0);
  const [score, setScore] = useState(-1);
  const [isTimeRunning, setisTimeRunning] = useState(false);
  const [timerMin, setTimerMin] = useState("0");
  const [timerSec, setTimerSec] = useState("0");
  const [question, setQuestion] = useState("");
  
  const questionWords: string[]= [
    "<html>","<head>", "<body>", "<title>", "<isindex>","<base>","<meta>","<link>","<script>",
    "<hn>","<noscript>","<ul>","<ol>","<li>","<dl>","<dt>","<dd>","<table>","<tr>","<th>","<td>",
    "<caption>","<a>","<img>","<form>","<input>","<select>","<option>","<textarea>"
  ];

  const randomQuestion = questionWords[Math.floor(Math.random() * questionWords.length)];

  const textBoxRef = useRef<HTMLTextAreaElement>(null);

  const getTimerMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimerMin(e.target.value);
  }

  const getTimerSec = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimerSec(e.target.value);
  }

  const setTimer = () => {
    const totalTime = parseInt(timerMin) * 60 + parseInt(timerSec);
    setTimeRemainig(totalTime);
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  }

  const startGame = () => {
    setScore(0);
    setTimer();
    setText('');
    setisTimeRunning(true);
    if(textBoxRef && textBoxRef.current){
      textBoxRef.current.disabled = false
      textBoxRef.current.focus();
    }
  }

  const endGame = () => {
    setisTimeRunning(false);
  }

  useEffect(() => {
    if(timeRemaining > 0 && isTimeRunning){
      setTimeout(() => {
        setTimeRemainig(time => time -1)
      }, 1000)
    }else if(timeRemaining ===0) {
      endGame();
    }
  },[timeRemaining, isTimeRunning])

  useEffect(() => {
    setTimer();
  },[timerMin, timerSec, isTimeRunning])

  useEffect(() => {
    if(text === question){
      setScore((prevScore) => prevScore + 1);
      setQuestion(randomQuestion);
      setText("");
    }
  }, [text, isTimeRunning])

  return {
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
  }
}

export default useWordGame;
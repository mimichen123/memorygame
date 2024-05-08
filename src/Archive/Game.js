import React, { useState, useEffect } from 'react';
//import "./app_ttt.css"


function Game (){
  
  const getLocalStorageItem = (key, defaultValue) => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  };
/*
  var initArray = Array(9).fill(' ');
    const [squares, setSquares] = useState(initArray);
    const [turn, setTurn] = useState('X')
    const [endGame, setEndGame] = useState(false)
    const [message, setMessage] = useState('&nbsp;')
  */

    const [targetNumber, setTargetNumber] = useState(null);
  const [turn, setturn] = useState('');
  const [status, setStatus] = useState('');
  const [remainingturns, setRemainingturns] = useState(getLocalStorageItem('settings', { turnsAllowed: 10 }).turnsAllowed);
   const [setrange, setsetrange] = useState(getLocalStorageItem('settings', { range: 10 }).range);
  
  const [winCount, setWinCount] = useState(getLocalStorageItem('stats', { wins: 0 }).wins);
  const [totalturns, setTotalturns] = useState(getLocalStorageItem('stats', { totalturns: 0 }).totalturns);
  const [gameCount, setGameCount] = useState(getLocalStorageItem('stats', { numplayed: 0 }).numplayed);

  console.log("localstorage stats:", localStorage.getItem('stats'));

  
  useEffect(() => { startgame();  }, []);

  function startgame (){
    const winningnumber = Math.floor(Math.random() * setrange) + 1;
    setTargetNumber(winningnumber);
    setRemainingturns(getLocalStorageItem('settings', { turnsAllowed: 10 }).turnsAllowed);
    
    console.log("new winning number:" +winningnumber)
    const newGameCount = gameCount + 1;
    setGameCount(newGameCount);
    
    localStorage.setItem('stats', JSON.stringify({ wins: winCount, totalturns, numplayed: newGameCount }));
    
    
  };

  function updatestats(){
    const turnsUsed = getLocalStorageItem('settings', { turnsAllowed: 10 }).turnsAllowed - remainingturns + 1;
    console.log("here"+turnsUsed)
    const newWinCount = winCount + 1;
    console.log("new win count:"+newWinCount)
    
    
    const newTotalTurns = totalturns + turnsUsed;
    setWinCount(newWinCount);
    setTotalturns(newTotalTurns);
    localStorage.setItem('stats', JSON.stringify({ wins: newWinCount, totalturns: newTotalTurns, numplayed: gameCount }));
  }
  const handleturn = (e) => {
    e.preventDefault();

    const numturn = parseInt(turn, 10);
    if (numturn === targetNumber) {
      
      updatestats();
      setTargetNumber(null);
      setStatus('Correct! The number was ' + targetNumber);

    } else if (remainingturns - 1 <= 0) {
      
      setTargetNumber(null);
      setStatus(`Out of turns! The number was ${targetNumber}.`);
    } else {
      setStatus(numturn > targetNumber ? 'Try again it is too high!' : 'Try again it is too low!');
      setRemainingturns(remainingturns - 1);
    }
    setturn('');
  };

  return (
    <div>
      {targetNumber && (
        <form onSubmit={handleturn}>
          <div class="select">Select a number</div>
          <input class="form"
            type="number"
            value={turn}
            onChange={(e) => setturn(e.target.value)}
             max={setrange} min={1} required />
          
          <button type="submit">Submit Answer</button>
        </form>
        
      )}
      
      <p>{status}</p>
      {!targetNumber && (
        <button onClick={startgame}>Start New Game</button>
      )}
    </div>
  );
}

export default Game;

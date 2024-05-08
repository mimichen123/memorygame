
import React from 'react';

function Stats() {
  
  
    const s = JSON.parse(localStorage.getItem('stats')) || { wins: 0, totalturns: 0 };
  const average = (s.totalturns / s.wins).toFixed(2);
  console.log("here"+average);

  return (
    <div>
      <p># games won: {s.wins}</p>
      <p>Average number of guesses needed: {average}</p>
    </div>
  );
};

export default Stats;

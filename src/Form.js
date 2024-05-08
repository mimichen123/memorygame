import React, { useState } from 'react';
import axios from 'axios';

function Form({ onStartGame }) {
  const [email, setEmail] = useState('');

  const validateEmail = async () => {
    const response = await axios.get(`https://api.validator.pizza/email/${email}`);
    if (response.data.status === "valid") {
      onStartGame();
    } else {
      alert("Invalid email, please use a non-disposable email address.");
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input type="text" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
      <button type="submit" onClick={validateEmail}>Start Game</button>
    </form>
  );
}

export default Form;

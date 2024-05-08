import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import Game from './Game';
import Settings from './Settings';
import Stats from './Stats';
import "./Game.css";

function MyApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/easy" element={<Game difficulty="easy" />} />
        <Route path="/pro" element={<Game difficulty="pro" />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default MyApp;


/*
function Nav()
{
	return (
		<ul id='main-nav'>
		<li><Link to="/">Home</Link></li>
		<li><Link to="/about">About</Link></li>
		<li><Link to="/stuff/123">Stuff</Link></li>
		<li><Link to="/contact">Contact</Link></li>
		</ul>
	);
}
*/

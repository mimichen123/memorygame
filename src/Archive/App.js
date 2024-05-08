
import {Routes, Route, Link, useParams} from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import React from 'react';
import Game from './Game';
import Settings from './Settings';
import Stats from './Stats';
import "./Game.css"



function MyApp()
{
	return (
		<div>
      
		<Routes>
    
        
		</Routes>
		</div>
	)
}


function Header()
{
	return (
	<div class name="container">
	
  <nav class="title">
          <Link to="/">Game</Link> | <Link to="/settings">Settings</Link> | <Link to="/stats">Stats</Link>
        </nav>
        
  
  </div>
	);
}






function GuessApp() {
  return (
    <Router>
      <div className="container">
      <Header />
      
      <Routes>
    <Route path="/" element={<Game />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/stats" element={<Stats />} />          
		</Routes>
      </div>
      
      
      
    </Router>
  );
}


export default GuessApp;

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

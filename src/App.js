import { Link, Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import Game from './Game';
//import Settings from './Settings';
//import Stats from './Stats';
import "./Game.css";
import About from "./About";


function MyApp() {
  return (
    <Router>
                <div >       
                <nav>
    <ul>                       
    <li><Link to="/about">About Memory Game (start here)</Link></li> 
        <li><Link to="/game/easy">Easy Level</Link></li>
    <li><Link to="/game/pro">Game Level</Link></li>


    </ul>
</nav>     
           
                <Routes>                    
                <Route path="/game/:level" element={<Game />} />
                <Route path="/about" element={<About />} />  // New route for the About page
         
                    
                </Routes>


            </div>
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

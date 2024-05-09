import React, { useState, useEffect } from 'react';
import Card from './Card';

import {useParams} from 'react-router-dom';



function Game() {
    const {level} = useParams();  
    const [cards, setCards] = useState([]);
    const [turnedcards, setturnedcards] = useState([]);
    const [yesFlip, setyesFlip] = useState(true);

    
    const [startGame, setstartGame] = useState(false);
    const [endGame, setendGame] = useState(false);
    
    const [playerName, setPlayerName]=useState(' ');

    useEffect(() => {
        
        fetchImages();
    }, [level, startGame]); 
    console.log(level);


    useEffect(()=>{
        if(endGame){
            const time = setTimeout(()=> {
                restart();}, 2100);
                return () => clearTimeout(time);
            }
        }, 
        [endGame]
    );
    


    const fetchImages = async () => {

        //setTurn(turn==='X' ? 'O' : 'X')
        const pexelsimages = level=== 'easy' ? 2 : 8;
    
            const response = await fetch(`https://api.pexels.com/v1/search?query=people&per_page=${pexelsimages}`, {
                headers: {
                    Authorization: 'VTbiMIZyTxMXpma45CRPfIw8zigT4IhlyQeMyFaN9a9RBBqUTo1h4eaS' 
                }
            });
    
            const data = await response.json();
            const images = data.photos.map(photo => ({
                
                id: photo.id,
                
                url: photo.src.medium,
            }));
            console.log(images);
            beginGame(images);
       
    };
    

    const beginGame = (images) => {
        const imagePairs = [...images, ...images];
       // console.log(imagePairs);
        const shuffledImages = shuffle(imagePairs);

        setCards(shuffledImages.map((image, index) => ({
            image: image.url,
            id: index,
            
            turnedover: false,
        })));

        setendGame(false);
        setyesFlip(true);

    };

    function restart () {
        setstartGame(false);
        setPlayerName('');
        setendGame(false);

        setturnedcards([]);
    }

    useEffect(() => {
        const turnedover = cards.filter(card => card.turnedover && !turnedcards.includes(card.id));
    
        if (turnedover.length === 2) {
            setyesFlip(false); 
    
            if (turnedover[0].image === turnedover[1].image) { 
                console.log("Cards match, keeping them flipped");

                const matchedIDs = turnedover.map(card => card.id);
                setturnedcards(turnedcards => [...turnedcards, ...matchedIDs]);

                if(turnedcards.length + 2 === cards.length){
                    setendGame(true);
                }
                setTimeout(() => setyesFlip(true), 10); 

            } else {

                console.log("see if matching pairs:", turnedover[0].image, turnedover[1].image);
             
                setTimeout(() => {
                    setCards(cards => cards.map(card => {
                        return turnedover.some(fCard => fCard.id === card.id) ? {...card, turnedover: false} : card;
                    }));
                    setturnedcards(turnedcards => turnedcards.filter(id => !turnedover.map(card => card.id).includes(id)));
                  
                  
                    setyesFlip(true);
                }, 1000);

                //endGame=false;
            }

        }
    }, [cards]); 
    
    const handleSquareClick = id => {
        if (!yesFlip || turnedcards.includes(id)) {
            console.log("turnover prevented for card " + id);
            return;
        }
        setCards(prevCards => prevCards.map(card => 
            card.id === id ? {...card, turnedover: !card.turnedover} : card
        ));
    };
    
  
  
  
  
  function shuffle(imagepairs) {
    return imagepairs.sort(()=> Math.random() - 0.5);
  
    }
  
  
  
  const handleNameSubmit = (e) => {
    e.preventDefault();  
    setstartGame(true);
};

  return (
<div>
{!startGame ? (
                <form onSubmit={handleNameSubmit}>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={playerName}
                        onChange={e => setPlayerName(e.target.value)}
                        style={{ margin: '10px', padding: '5px' }}
                    />
                    <button type="submit" style={{ padding: '5px 10px' }}>Start Game</button>
                </form>
            ) : (
                <>
                    <h1>Let's start the game: {playerName}!</h1>
                    <div className="board">
                        {cards.map(card => (
                            <Card key={card.id} id={card.id} image={card.image} turnedover={card.turnedover} onCardClick={handleSquareClick} />
                        ))}
                    </div><br />
                    {endGame && <h2>Thank you for playing, you have matched all pairs!</h2>}
                    <a href="https://www.pexels.com">Photos provided by Pexels</a>
                </>
            )}



        
    </div>
  );
/*
  function PlayAgainButton()
    {
        return <button className={endGame?'playAgain':'noShow'} onClick= {()=>restart()}>Play Again?</button>
    }
*/
}


export default Game;

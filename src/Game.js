import React, { useState, useEffect } from 'react';
import Card from './Card';

function Game() {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [canFlip, setCanFlip] = useState(true);

    //const [message, setMessage] = useState('&nbsp;')

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await fetch('https://api.pexels.com/v1/search?query=people&per_page=8', {
                headers: {
                    Authorization: 'VTbiMIZyTxMXpma45CRPfIw8zigT4IhlyQeMyFaN9a9RBBqUTo1h4eaS' // Secure this in a real app
                }
            });

            const data = await response.json();
            const images = data.photos.map(photo => ({
                id: photo.id,
                url: photo.src.medium,
            }));

            initializeGame(images);
        } catch (error) {
            console.error("Failed to fetch images:", error);
        }
    };

    const initializeGame = (images) => {
        const doubledImages = [...images, ...images];
        const shuffledImages = shuffle(doubledImages);
        setCards(shuffledImages.map((image, index) => ({
            id: index,
            image: image.url,
            flipped: false,
        })));
    };
    useEffect(() => {
        const flipped = cards.filter(card => card.flipped && !flippedCards.includes(card.id));
    
        if (flipped.length === 2) {
            setCanFlip(false); // Prevents further flipping during check
    
            if (flipped[0].image === flipped[1].image) { // Check if images match
                console.log("Cards match, keeping them flipped");
                const matchedIDs = flipped.map(card => card.id);
                setFlippedCards(flippedCards => [...flippedCards, ...matchedIDs]);
                setTimeout(() => setCanFlip(true), 10); // Short pause before allowing more flips
            } else {
                console.log("Comparing images:", flipped[0].image, flipped[1].image);
             
                setTimeout(() => {
                    setCards(cards => cards.map(card => {
                        return flipped.some(fCard => fCard.id === card.id) ? {...card, flipped: false} : card;
                    }));
                    setFlippedCards(flippedCards => flippedCards.filter(id => !flipped.map(card => card.id).includes(id)));
                  
                  
                    setCanFlip(true);
                }, 1000);

                //gameOver=false;
            }

        }
    }, [cards]); // Dependency array includes cards to react to their updates
    
    const handleCardClick = id => {
        if (!canFlip || flippedCards.includes(id)) {
            console.log("Flip prevented for card " + id);
            return;
        }
        setCards(prevCards => prevCards.map(card => 
            card.id === id ? {...card, flipped: !card.flipped} : card
        ));
    };
    
  
  
  
  
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }
  
  return (
    <div className="board">
        {cards.map(card => (
            <Card key={card.id} id ={card.id} image={card.image} flipped={card.flipped} onCardClick={handleCardClick} />
        ))}


<a href="https://www.pexels.com">Photos provided by Pexels</a>


        
    </div>
  );
}



export default Game;

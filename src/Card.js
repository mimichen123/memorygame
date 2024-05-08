import React from 'react';

function Card({ id, image, onCardClick, flipped }) {
    
    const backsideImage = '/momtips.png'; 
    //console.log('card flipped answer:',flipped);   
    //console.log('card compentn id:'+id);
    return (
        <div className="card" onClick={() => onCardClick(id)}>
            <img src={flipped ? image : backsideImage} alt="Card image" />
        </div>
    
);
    
}

  

  export default Card;
import React from 'react';


function Card({ id, image, onCardClick, turnedover }) {
    
    /*var styles = 
    {
        w: '100px'; 
        h: '100px'; 
    }
    */

    const virtualCardFront = '/codeimage2.png'; 
    console.log(image);
    //image = url
    //console.log('card compentn id:'+id);
    console.log('is card turned over answer:',turnedover);   

    return <>
        <div className="card" onClick={() => onCardClick(id)}>
            <img src={turnedover ? image : virtualCardFront} />
        </div>
    
        </>

}
  

  export default Card;
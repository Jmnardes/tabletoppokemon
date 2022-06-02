import React, { useState } from "react"

import items from '../../assets/json/items.json'
import events from '../../assets/json/events.json'
import treasures from '../../assets/json/treasures.json'

const Pokecards = () => {
    const [card, setCard] = useState([])

    const handleDrawCard = (type) => {
        if ( type === 'item') {
            let sort = Math.floor(Math.random() * items.length)
            setCard(items[sort])
        }

        if ( type === 'event') {
            let sort = Math.floor(Math.random() * events.length)
            setCard(events[sort])
        }

        if ( type === 'treasure') {
            let sort = Math.floor(Math.random() * treasures.length)
            setCard(treasures[sort])
        }
    }

    return (
        <>
            <div className="App">
                <div className="content">
                    <div className="cardsButton">
                        <button className="button" onClick={() => handleDrawCard('item')}>draw item</button>
                        <button className="button" onClick={() => handleDrawCard('event')}>draw event</button>
                        <button className="button" onClick={() => handleDrawCard('treasure')}>draw treasure</button>
                    </div>
                    <div className="content-body">
                        <div className="draw-name">
                            {card.name}
                        </div>
                        <img className="draw-image" src={card.picture} alt={card.name} />
                        <div className="draw-description">
                            {card.description}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Pokecards
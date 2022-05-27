import { useState } from "react"

import Pokedex from "./components/Pokedex"
import Pokecards from "./components/Pokecards"

const App = () => {
  const [rollSwitch, setRollSwitch] = useState(false)
  const [roundCounter, setRoundCounter] = useState(0)

  const handleSetRollSwitch = () => {
    setRollSwitch(!rollSwitch)
  }

  const handleCounter = (where) => {
    if ( where === 'up' ) {
      setRoundCounter(() => roundCounter + 1)
    } else if ( where === 'down'  && roundCounter > 0 ) {
      setRoundCounter(() => roundCounter - 1)
    } else {
      setRoundCounter(0)
    }
  }

  return (
      <>
        <button 
          className="rollSwitchBtn button" 
          onClick={handleSetRollSwitch}
        >
          {rollSwitch ? "POKEDEX" : "CARDS"}
        </button>

        <div class="roundsCounter">
          <button 
            className="roundsCounterBtn button" 
            onClick={() => handleCounter()}
          >
            0
          </button>
          <button 
            className="roundsCounterBtn button" 
            onClick={() => handleCounter('up')}
          >
            +1
          </button>
          <button 
            className="roundsCounterBtn button" 
            onClick={() => handleCounter('down')}
          >
            -1
          </button>
          <p>{roundCounter}</p>
        </div>
        
        {
          rollSwitch ? (
            <Pokecards />
          ) : (
            <Pokedex />
          )
        }
      </>
    )
}
export default App

import { useState } from "react"

import Pokedex from "./components/Pokedex"
import Pokecards from "./components/Pokecards"

const App = () => {
  const [rollSwitch, setRollSwitch] = useState(false)

  const handleSetRollSwitch = () => {
    setRollSwitch(!rollSwitch)
  }

  return (
      <>
        <button 
          className="rollSwitchBtn button" 
          onClick={handleSetRollSwitch}
        >{rollSwitch ? "CARDS" : "POKEDEX"}</button>
        {
          rollSwitch ? (
            <Pokedex />
          ) : (
            <Pokecards />
          )
        }
      </>
    )
}
export default App

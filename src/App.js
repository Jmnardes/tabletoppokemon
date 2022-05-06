import React, { useState } from "react"
import axios from "axios"
import './App.css'

import { Table } from "./components/Table"
import { pokemonTypes } from "./components/pokemonFunctions"

const App = () => {
  const [pokemon, setPokemon] = useState(Math.floor(Math.random() * 898))
  const [pokemonData, setPokemonData] = useState([])
  const [randomSwitch, setRandomSwitch] = useState(false)

  const getPokemon = async () => {
    const toArray = []
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      const res = await axios.get(url)
      
      toArray.push(res.data)
      setPokemonData(toArray)
    } catch(e) {
      console.log(e)
    }
  }

  const sortPokemon = () => {
    let sort = Math.floor(Math.random() * 898)
    setPokemon(sort)
  }

  const handleChange = (e) => {
    if (e.target.value) {
      setPokemon(e.target.value)
      return
    }
    sortPokemon()
    getPokemon()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getPokemon()
  }

  const handleRandomSwitch = () => {
    setRandomSwitch(!randomSwitch)
  }

  return (
    <div className="App">
      <div className="content">
        <div className="buttonsContainer">
          {randomSwitch ? (
            <button
              className="pokemonRollBtn"
              type="button"
              onClick={(e) => handleChange(e)}
            />
          ) : (
            <form onSubmit={handleSubmit} className="inputForm">
              <label>
                <input
                  type="text"
                  placeholder="Pokemon name"
                  onChange={(e) => setPokemon(e.target.value)}
                />
              </label>
              <button className="button" onClick={handleSubmit}>Go</button>
            </form>
          )}
        </div>

        <button 
          className="randomSwitchBtn button" 
          onClick={handleRandomSwitch}
        >
          Change to {randomSwitch ? 'write pokemon name' : 'random roll'}
        </button>

        {pokemonData.map((data) => {
          pokemonTypes(data)
          return(
            <>
              <div className="container">
                <img alt={data.forms[0].name} src={data.sprites["front_default"]} />
                <Table data={data} />
              </div>
            </>
          )
        })}
      </div>
    </div>
  );
}

export default App

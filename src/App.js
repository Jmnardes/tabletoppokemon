import React, { useState } from "react"
import axios from "axios"
import Select from 'react-select'

import { Table } from "./components/Table"
import { pokemonTypes, whatNaturePokemonIs } from "./components/pokemonFunctions"

import pokemonTiersJson from "./assets/json/pokemonTiers"
import { options } from './util/util'

import './App.css'

const App = () => {
  const [pokemon, setPokemon] = useState(Math.floor(Math.random() * 898))
  const [pokemonData, setPokemonData] = useState([])
  const [randomSwitch, setRandomSwitch] = useState(false)
  const [pokemonTier, setPokemonTier] = useState(1)
  const [pokeNature, setPokeNature] = useState('Jolly')
  const [isShiny, setIsShiny] = useState(false)

  const getPokemon = async () => {
    const toArray = []
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      const res = await axios.get(url)
      
      toArray.push(res.data)
      setPokemonData(toArray)
      console.log(res.data)
    } catch(e) {
      console.log(e)
    }
  }

  const sortPokemon = (tier) => {
    let tierMatch = false
    let sort = 1
    let shiny = 0

    while (!tierMatch) {
      sort = Math.floor(Math.random() * 898)
      if(pokemonTiersJson[sort-1].pokeTier !== Number(tier)) {
        continue;
      }
      tierMatch = true
    }

    shiny = Math.floor((Math.random() * 20) + 1)

    if (shiny === 20) {
      setIsShiny(true)
    }

    setPokeNature(whatNaturePokemonIs())
    setPokemon(sort)
  }

  const handleChange = (e) => {
    if (e.target.value) {
      setPokemon(e.target.value)
      return
    }
    setIsShiny(false)
    sortPokemon(pokemonTier)
    getPokemon()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsShiny(false)
    setPokeNature(whatNaturePokemonIs())
    getPokemon()
  }

  const handleRandomSwitch = () => {
    setRandomSwitch(!randomSwitch)
  }

  const handleTierOption = (e) => {
    setPokemonTier(e.value)
  }

  return (
    <div className="App">
      <div className="content">
        <div className="buttonsContainer">
          {randomSwitch ? (
            <>
              <div className="pokemonTier">
                <Select
                  options={options}
                  placeholder={'Tier'}
                  onChange={(e) => handleTierOption(e)}
                />
              </div>
              <button
                className="pokemonRollBtn"
                type="button"
                onClick={(e) => handleChange(e)}
              />
            </>
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
                <img alt={data.forms[0].name} src={data.sprites[`front_${isShiny ? 'shiny' : 'default'}`]} />
                <Table data={data} pokeNature={pokeNature} isShiny={isShiny} />
              </div>
            </>
          )
        })}
      </div>
    </div>
  );
}

export default App

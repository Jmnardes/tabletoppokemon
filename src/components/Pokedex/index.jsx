import React, { useState } from "react"
import axios from "axios"
import Select from 'react-select'

import { Table } from "../Table"
import pokemonJSON from '../../assets/json/pokemons.json'

import { options, stringToUpperCase, generation } from '../../util'

const Pokedex = () => {
  const [pokemon, setPokemon] = useState(Math.floor(Math.random() * generation(4)) + 1)
  const [pokemonData, setPokemonData] = useState([])
  const [randomSwitch, setRandomSwitch] = useState(false)
  // const [pokeType, setPokeType] = useState('')
  const [pokemonTier, setPokemonTier] = useState('')

  const getPokemon = async () => {
    const toArray = []
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      const res = await axios.get(url)
      
      toArray.push(res.data)
      // setPokeType(pokemonTypes(pokemonJSON[res.data.order].type))
      setPokemonData(toArray)
      // console.log(res.data)
    } catch(e) {
      console.log(e)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setPokemon(() => pokemon.toLowerCase())
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
          {!randomSwitch ? (
            <>
              <Select
                className="pokemonTier"
                options={options}
                placeholder={'Tier'}
                onChange={(e) => handleTierOption(e)}
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
          {randomSwitch ? 'Write pokemon name' : 'Random roll'}
        </button>

        {pokemonData.map((data) => {
          return(
            <>
              <div className="container">
                <h1>{stringToUpperCase(data.name)}</h1>
                <div className="dex-container">
                  <img alt={data.name} src={data.sprites[`front_default`]} />
                  <Table data={pokemonJSON[(data.id) - 1]} />
                </div>
              </div>
            </>
          )
        })}
      </div>
    </div>
  );
}

export default Pokedex
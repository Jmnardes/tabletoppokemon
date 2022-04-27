import React, { useEffect, useState } from "react"
import axios from "axios"
import './App.css'

const App = () => {
  const [pokemon, setPokemon] = useState("pikachu")
  const [pokemonData, setPokemonData] = useState([])
  const [pokemonType, setPokemonType] = useState("")

  const getPokemon = async () => {
    const toArray = []
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      const res = await axios.get(url)
      toArray.push(res.data)
      setPokemonType(res.data.types[0].type.name)
      setPokemonData(toArray)
      console.log(res)
    } catch(e) {
      console.log(e)
    }
  }

  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase())
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getPokemon()
  }

  const higherPokemonStat = (stats) => {
    let array = [
        stats[0].base_stat,
        stats[1].base_stat,
        stats[2].base_stat,
        stats[3].base_stat,
        stats[4].base_stat,
        stats[5].base_stat,
      ]
    
    let higher = Math.max(...array)
    higher = array.indexOf(higher)
    return stats[higher].stat.name
  }

  const pokemonTier = (stats) => {
    let tier = ((stats[0].base_stat + 
      stats[1].base_stat + 
      stats[2].base_stat + 
      stats[3].base_stat + 
      stats[4].base_stat + 
      stats[5].base_stat) / 6)

      tier = Math.abs(((tier/4).toFixed(0))-9)
    
      switch (tier) {
        case 0:
          return tier = 0
        case 1:
        case 2:
          return tier = 1
        case 3:
        case 4:
          return tier = 3
        case 5:
        case 6:
          return tier = 4
        case 7:
          return tier = 5
        case 8:
          return tier = 6
        case 9:
          return tier = 7
        case 10:
          return tier = 8
        case 11:
        case 12:
          return tier = 9
        case 13:
        case 14:
          return tier = 10
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 21:
          return tier = 11
        default:
          return tier
      }
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Digite o pokemon"
          />
        </label>
      </form>
      {pokemonData.map((data) => {
        return(
          <div className="container">
            <img alt={data.forms[0].name} src={data.sprites["front_default"]} />
            <div className="divTable">
              <div className="divTableBody">
                <div className="divTableRow">
                  <div className="divTableCell">Type</div>
                  <div className="divTableCell">{pokemonType}</div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">{data.stats[0].stat.name}</div>
                  <div className="divTableCell">{data.stats[0].base_stat}</div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">{data.stats[1].stat.name}</div>
                  <div className="divTableCell">{(data.stats[1].base_stat + data.stats[3].base_stat)/2}</div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">{data.stats[2].stat.name}</div>
                  <div className="divTableCell">{(data.stats[2].base_stat + data.stats[4].base_stat)/2}</div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">{data.stats[5].stat.name}</div>
                  <div className="divTableCell">{data.stats[5].base_stat}</div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Tier</div>
                  <div className="divTableCell">
                    {pokemonTier(data.stats)}
                  </div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Higher Stat</div>
                  <div className="divTableCell">
                    {higherPokemonStat(data.stats)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default App

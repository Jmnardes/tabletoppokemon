import React, { useState } from "react"
import axios from "axios"
import './App.css'

const App = () => {
  const [pokemon, setPokemon] = useState("")
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

  const handleChange = () => {
    let sort = Math.floor(Math.random() * 898);
    setPokemon(sort)
    getPokemon()
  }

  const pokemonBaseStat = (stats, whichStat) => {
    let baseAtk = 1
    let baseHp = 3
    let baseCa = 5
    let baseHpArrayStats = [3,5,7,10,13,16,16,20,24,28,32,37,47]
    let tier = pokemonTier(stats)
    let highestStat = higherPokemonStat(stats)

    // get base hp for level
    baseHp = baseHpArrayStats[tier]
    
    // leveling up stats based on tier
    baseAtk += tier

    let caTierUp = Number((tier/2).toFixed(0)) - 1
    if(caTierUp < 0) {
      caTierUp = 0
    }
    baseCa += caTierUp

    // conditions to upgrade stat based on highest pokemon stats
    if (highestStat === 'attack' || highestStat === 'special-attack') {
      baseAtk += 1
    } else if (highestStat === 'hp') {
      baseHp += 2
    } else if (highestStat === 'defense' || highestStat === 'special-defense' || highestStat === 'speed') {
      baseCa += 1
    }

    if (whichStat === 'atk') {
      return baseAtk
    } else if (whichStat === 'hp') {
      return baseHp
    } else if (whichStat === 'ca') {
      return baseCa
    }
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

    if(higher === 3) {
      higher = 1
    } else if(higher === 4){
      higher = 2
    }

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
      <button
        className="pokemonRollBtn"
        type="button"
        onClick={handleChange}
      />
      {pokemonData.map((data) => {
        return(
          <div className="container">
            <img alt={data.forms[0].name} src={data.sprites["front_default"]} />
            <div className="divTable">
              <div className="divTableBody">
                <div className="divTableRow">
                  <div className="divTableCell">Name</div>
                  <div className="divTableCell">{data.name}</div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Type</div>
                  <div className="divTableCell">{pokemonType}</div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Tier</div>
                  <div className="divTableCell">
                    {pokemonTier(data.stats)}
                  </div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Attack</div>
                  <div className="divTableCell">{pokemonBaseStat(data.stats, 'atk')}</div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Hp</div>
                  <div className="divTableCell">{pokemonBaseStat(data.stats, 'hp')}</div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">CA</div>
                  <div className="divTableCell">{pokemonBaseStat(data.stats, 'ca')}</div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">{data.stats[5].stat.name}</div>
                  <div className="divTableCell">{data.stats[5].base_stat}</div>
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

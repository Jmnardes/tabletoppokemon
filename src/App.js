import React, { useState } from "react"
import Select from 'react-select'
import axios from "axios"
import './App.css'

const App = () => {
  const [pokemon, setPokemon] = useState(Math.floor(Math.random() * 898))
  const [pokemonData, setPokemonData] = useState([])
  const [pokemonType, setPokemonType] = useState("")
  const [pokemonTier, setPokemonTier] = useState("")

  const options = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '10', label: '10' }
  ]

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

  const handleTierOption = (e) => {
    setPokemonTier(e.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getPokemon()
  }

  const pokemonBaseStat = (stats, whichStat) => {
    let tier = whatPokemonTierIs(stats)
    let highestStat = highestPokemonStat(stats)
    let baseAtk = 1
    let baseHpArrayStats = [3,5,7,10,13,16,20,24,28,32,37,47]
    let baseHp = baseHpArrayStats[tier]
    let baseCa = 5

    // get base hp for level
    
    // leveling up stats based on tier
    baseAtk += tier

    let caTierUp = Number((tier/2).toFixed(0))
    baseCa += caTierUp

    // conditions to upgrade stat based on highest pokemon stats
    if (highestStat === 'attack' || highestStat === 'special-attack') {
      baseAtk += 1
    } else if (highestStat === 'hp') {
      if (tier <= 2) {
        baseHp += 2
      } else if (tier <= 5) {
        baseHp += 3
      } else if (tier <= 9) {
        baseHp += 4
      } else if (tier > 9) {
        baseHp += 5
      }
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

  const highestPokemonStat = (stats) => {
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

  const whatPokemonTierIs = (stats) => {
    let tier = ((stats[0].base_stat + 
      stats[1].base_stat + 
      stats[2].base_stat + 
      stats[3].base_stat + 
      stats[4].base_stat + 
      stats[5].base_stat) / 6)

      tier = Math.abs(((tier/4).toFixed(0))-9)
    
      switch (tier) {
        case 0:
        case 1:
          return tier = 0
        case 2:
        case 3:
          return tier = 1
        case 4:
        case 5:
          return tier = 2
        case 6:
        case 7:
          return tier = 3
        case 8:
          return tier = 4
        case 9:
          return tier = 5
        case 10:
          return tier = 6
        case 11:
          return tier = 7
        case 12:
          return tier = 8
        case 13:
          return tier = 9
        case 14:
          return tier = 10
        default:
          return tier = 11
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
      <div className="buttonsContainer">
          <div className="pokemonTier">
            <label className="pokemonTierBtnLabel">Tier</label>
            <Select
              options={options}
              placeholder={''}
              onChange={e => handleTierOption(e)}
            />
          </div>
          <button
            className="pokemonRollBtn"
            type="button"
            onClick={(e) => handleChange(e)}
            />
      </div>
      {pokemonData.map((data) => {
        return(
          <>
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
                    <div className="divTableCell">{whatPokemonTierIs(data.stats)}</div>
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
                  <div className="divTableRow">
                    <div className="divTableCell">Highest Stat</div>
                    <div className="divTableCell">{highestPokemonStat(data.stats)}</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      })}
    </div>
  );
}

export default App

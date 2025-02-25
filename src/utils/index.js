import { mixColors } from "./colorMix"

// tier options 
export const options = [
    { value: '0', label: '0' },
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

// pokemon characteristics
export const pokemonNature = [
    { nature: 'Naughty', statUp: 'atk', statDown: 'hp'},
    { nature: 'Lonely', statUp: 'atk', statDown: 'def'},
    { nature: 'Brave', statUp: 'atk', statDown: 'spd'},
    { nature: 'Adamant', statUp: 'atk', statDown: ''},

    { nature: 'Calm', statUp: 'hp', statDown: 'atk'},
    { nature: 'Gentle', statUp: 'hp', statDown: 'def'},
    { nature: 'Sassy', statUp: 'hp', statDown: 'spd'},
    { nature: 'Careful', statUp: 'hp', statDown: ''},

    { nature: 'Bold', statUp: 'def', statDown: 'atk'},
    { nature: 'Lax', statUp: 'def', statDown: 'hp'},
    { nature: 'Relaxed', statUp: '', statDown: 'spd'},
    { nature: 'Impish', statUp: 'def', statDown: ''},
    
    { nature: 'Timid', statUp: 'spd', statDown: 'atk'},
    { nature: 'Naive', statUp: 'spd', statDown: 'hp'},
    { nature: 'Hasty', statUp: 'spd', statDown: 'def'},
    { nature: 'Jolly', statUp: 'spd', statDown: ''},
    
    { nature: 'Bashful', statUp: '', statDown: 'atk'},
    { nature: 'Rickety', statUp: '', statDown: 'hp'},
    { nature: 'Sloppy', statUp: '', statDown: 'def'},
    { nature: 'Lazy', statUp: '', statDown: 'spd'},

    { nature: 'Serious', statUp: '', statDown: ''},
]

// nature options
export const natureOptions = [
    { label: 'Lonely', value: 'Lonely'},
    { label: 'Naughty', value: 'Naughty'},
    { label: 'Brave', value: 'Brave'},
    { label: 'Adamant', value: 'Adamant'},
    { label: 'Calm', value: 'Calm'},
    { label: 'Gentle', value: 'Gentle'},
    { label: 'Sassy', value: 'Sassy'},
    { label: 'Careful', value: 'Careful'},
    { label: 'Bold', value: 'Bold'},
    { label: 'Lax', value: 'Lax'},
    { label: 'Relaxed', value: 'Relaxed'},
    { label: 'Impish', value: 'Impish'},
    { label: 'Timid', value: 'Timid'},
    { label: 'Naive', value: 'Naive'},
    { label: 'Hasty', value: 'Hasty'},
    { label: 'Jolly', value: 'Jolly'},
    { label: 'Bashful', value: 'Bashful'},
    { label: 'Rickety', value: 'Rickety'},
    { label: 'Sloppy', value: 'Sloppy'},
    { label: 'Lazy', value: 'Lazy'},
    { label: 'Serious', value: 'Serious'}
]

// pokemon base hp array
export const baseHpArray = [5,7,8,12,15,18,22,26,30,34,39,45]

// string to upper case
export const stringToUpperCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// which generation you want to roll
export const generationPokeNumbers = (gen) => {
    gen = Number(gen)
    if ( gen === 0 ) {
        return 897
    }

    if ( gen === 1 ) {
        return 151
    }
    
    if ( gen === 2 ) {
        return 252
    }

    if ( gen === 3 ) {
        return 386
    }
    
    if ( gen === 4 ) {
        return 493
    }
    
    if ( gen === 5 ) {
        return 649
    }
    
    if ( gen === 6 ) {
        return 719
    }
    
    if ( gen === 7 ) {
        return 809
    }
    
    if ( gen >= 8 ) {
        return 897
    }
}

export const generationOptions = [
    { value: '0', label: '1' },
    { value: '1', label: '2' },
    { value: '2', label: '3' },
    { value: '3', label: '4' },
    { value: '4', label: '5' },
    { value: '5', label: '6' },
    { value: '6', label: '7' },
    { value: '7', label: '8' }
]

export const diceRoll = (diceSize = 20) => {
    return Math.floor(Math.random() * diceSize)
}

// types colors
export const colorsByType = [
    { label: 'psychic', value: 'psychic', color: '#ee5454' },
    { label: 'fire' ,value: 'fire', color: '#ee8f12' },
    { label: 'water', value: 'water', color: '#228fd8' },
    { label: 'dragon', value: 'dragon', color: '#396bd8' },
    { label: 'bug', value: 'bug', color: '#69ca47' },
    { label: 'dark', value: 'dark', color: '#4f4d50' },
    { label: 'electric', value: 'electric', color: '#ddda0b' },
    { label: 'fairy', value: 'fairy', color: '#e390d8' },
    { label: 'fighting', value: 'fighting', color: '#f13b69' },
    { label: 'flying', value: 'flying', color: '#7277be' },
    { label: 'ice', value: 'ice', color: '#0fddb0' },
    { label: 'ghost', value: 'ghost', color: '#453a6b' },
    { label: 'grass', value: 'grass', color: '#1d8b2f' },
    { label: 'ground', value: 'ground', color: '#b46b0c' },
    { label: 'poison', value: 'poison', color: '#b64ac0' },
    { label: 'rock', value: 'rock', color: '#a89c67' },
    { label: 'steel', value: 'steel', color: '#6e968d' },
    { label: 'normal', value: 'normal', color: '#888888' },
    { label: 'none', value: '', color: '' },
]

// change color by pokemon type
export const typeColor = (types) => {
    let finalColor = '#000000'
    let colorArray = []
    let counter = 0

    if(types.length > 1) {
        types.map((type) => {
            return colorsByType.map((color) => {
                if(type === color.value) {
                    colorArray[counter] = color.color
                    counter++
                } 
                
                if (counter === 2) {
                    return finalColor = mixColors(colorArray[0], colorArray[1])
                }
                // eslint-disable-next-line array-callback-return
                return
            })
        })
    } else {
        types.map((type) => {
            // eslint-disable-next-line array-callback-return
            return colorsByType.map(color => {
                if(type === color.value) {
                    return finalColor = color.color
                }
            })
        })
    }
    
    return finalColor
}

export const parseNumberToNatural = (number, division) => {
    return Number(Number.parseFloat(number/division).toFixed(0))
}

export const parseNumberMultToNatural = (number, multiply) => {
    return Number(Number.parseFloat(number*multiply).toFixed(0))
}

export const rarityName = (rarity) => {
    if (rarity === 0) return 'Common'
    if (rarity === 1) return 'Uncommon'
    if (rarity === 2) return 'Rare'
    if (rarity === 3) return 'Shiny'
}

// const rarityColor = (rarity) => {
//     if(rarity === 1) return '#f06f6f'
//     if(rarity === 2) return '#4682B4'
//     if(rarity === 3) return '#d4af37'
//     return '#8a8a8a'
// }

export const pokemonHasChallengeBerry = (pokemon) => {
    if (pokemon.effects.includes('boost_challenge')) {
        return true
    }

    return false
}

export const berryExistsInBerries = ({ berries, berryType }) => {
    return berries && berries.some(berry => berry.type === berryType);
}

export const upgradePokemonLevelChance = ({ sessionLevel, pokeLevel, dusts, berries }) => {
    const berryBoost = berryExistsInBerries({ berries: berries, berryType: "belue_berry" }) ? 30 : 0
    let chanceToUpgrade = 0

    if (pokeLevel < sessionLevel - 3) chanceToUpgrade = 90
    if (pokeLevel === sessionLevel - 3) chanceToUpgrade = 80
    if (pokeLevel === sessionLevel - 2) chanceToUpgrade = 60
    if (pokeLevel === sessionLevel - 1) chanceToUpgrade = 40
    if (pokeLevel === sessionLevel) chanceToUpgrade = 20
    if (pokeLevel === sessionLevel + 1) chanceToUpgrade = 10
    if (pokeLevel > sessionLevel + 1) chanceToUpgrade = 0

    chanceToUpgrade  += berryBoost
    chanceToUpgrade += dusts * 20

    if (chanceToUpgrade > 100) chanceToUpgrade = 100

    return chanceToUpgrade
}

export const joinArr = (arr) => {if(arr) return arr.join(', ')}
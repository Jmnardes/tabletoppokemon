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

export const diceRoll = (diceSize) => {
    if(diceSize) {
        return Math.floor(Math.random() * diceSize)
    }
    return
}

// types colors
export const colorsByType = [
    { label: 'psychic', value: 'psychic', color: '#b43fe7' },
    { label: 'fire' ,value: 'fire', color: '#CD5C5C' },
    { label: 'water', value: 'water', color: '#3498db' },
    { label: 'dragon', value: 'dragon', color: '#e5c67e' },
    { label: 'bug', value: 'bug', color: '#69ca47' },
    { label: 'dark', value: 'dark', color: '#170223' },
    { label: 'electric', value: 'electric', color: '#d5d20c' },
    { label: 'fairy', value: 'fairy', color: '#e390d8' },
    { label: 'fighting', value: 'fighting', color: '#f1883b' },
    { label: 'flying', value: 'flying', color: '#93d4d6' },
    { label: 'ice', value: 'ice', color: '#00f7ff' },
    { label: 'ghost', value: 'ghost', color: '#600e92' },
    { label: 'grass', value: 'grass', color: '#195827' },
    { label: 'ground', value: 'ground', color: '#854e08' },
    { label: 'poison', value: 'poison', color: '#b362bb' },
    { label: 'rock', value: 'rock', color: '#474747' },
    { label: 'steel', value: 'steel', color: '#a3a3a3' },
    { label: 'normal', value: 'normal', color: '#D2B89E' },
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

export const typeAdvantage = (type) => {
    if (type === 'psychic') return ['fighting', 'poison']
    if (type === 'fire') return ['bug', 'steel', 'grass', 'ice']
    if (type === 'water') return ['ground', 'rock', 'fire']
    if (type === 'dragon') return ['dragon']
    if (type === 'bug') return ['grass', 'psychic', 'dark']
    if (type === 'dark') return ['ghost', 'psychic']
    if (type === 'electric') return ['flying', 'water']
    if (type === 'fairy') return ['fighting', 'dragon', 'dark']
    if (type === 'fighting') return ['normal', 'rock', 'steel', 'ice', 'dark']
    if (type === 'flying') return ['fighting', 'bug', 'grass']
    if (type === 'ice') return ['flying', 'ground', 'grass', 'dragon']
    if (type === 'ghost') return ['ghost', 'psychic']
    if (type === 'grass') return ['ground', 'rock', 'water']
    if (type === 'ground') return ['poison', 'rock', 'steel', 'fire', 'electric']
    if (type === 'poison') return ['grass', 'fairy']
    if (type === 'rock') return ['flying', 'bug', 'fire', 'ice']
    if (type === 'steel') return ['rock', 'ice', 'fairy']
    if (type === 'normal') return ['']
}

export const typeDisadvantage = (type) => {
    if (type === 'psychic') return ['steel', 'psychic', 'dark']
    if (type === 'fire') return ['rock', 'fire', 'water', 'dragon']
    if (type === 'water') return ['water', 'grass', 'dragon']
    if (type === 'dragon') return ['steel', 'fairy']
    if (type === 'bug') return ['fighting', 'flying', 'poison', 'ghost', 'steel', 'fire', 'fairy']
    if (type === 'dark') return ['dark', 'fairy']
    if (type === 'electric') return ['ground', 'grass', 'electric', 'dragon']
    if (type === 'fairy') return ['poison', 'steel', 'fire']
    if (type === 'fighting') return ['flying', 'poison', 'bug', 'ghost', 'psychic', 'fairy']
    if (type === 'flying') return ['rock', 'steel', 'electric']
    if (type === 'ice') return ['steel', 'fire', 'water', 'ice']
    if (type === 'ghost') return ['normal', 'dark']
    if (type === 'grass') return ['flying', 'poison', 'bug', 'steel', 'fire', 'grass', 'dragon']
    if (type === 'ground') return ['flying', 'bug', 'grass']
    if (type === 'poison') return ['poison', 'ground', 'rock', 'ghost', 'steel']
    if (type === 'rock') return ['fighting', 'ground', 'steel']
    if (type === 'steel') return ['steel', 'fire', 'water', 'electric']
    if (type === 'normal') return ['rock', 'ghost', 'steel']
}
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
    { nature: 'Lonely', statUp: 'atk', statDown: 'hp'},
    { nature: 'Brave', statUp: 'atk', statDown: 'ca'},
    { nature: 'Relaxed', statUp: 'hp', statDown: 'ca'},
    { nature: 'Bold', statUp: 'hp', statDown: 'atk'},
    { nature: 'Timid', statUp: 'ca', statDown: 'atk'},
    { nature: 'Naive', statUp: 'ca', statDown: 'hp'},
    { nature: 'Jolly', statUp: '', statDown: ''},
    { nature: 'Angry', statUp: 'atk', statDown: ''},
    { nature: 'Careful', statUp: 'hp', statDown: ''},
    { nature: 'Hasty', statUp: 'ca', statDown: ''},
    { nature: 'Naughty', statUp: '', statDown: 'atk'},
    { nature: 'Docile', statUp: '', statDown: 'hp'},
    { nature: 'Messy', statUp: '', statDown: 'ca'},
]

// nature options
export const natureOptions = [
    { label: 'Lonely', value: 'Lonely'},
    { label: 'Brave', value: 'Brave'},
    { label: 'Relaxed', value: 'Relaxed'},
    { label: 'Bold', value: 'Bold'},
    { label: 'Timid', value: 'Timid'},
    { label: 'Naive', value: 'Naive'},
    { label: 'Jolly', value: 'Jolly'},
    { label: 'Angry', value: 'Angry'},
    { label: 'Careful', value: 'Careful'},
    { label: 'Hasty', value: 'Hasty'},
    { label: 'Naughty', value: 'Naughty'},
    { label: 'Docile', value: 'Docile'},
    { label: 'Messy', value: 'Messy'},
]

// pokemon base hp array
export const baseHpArray = [3,5,7,10,13,16,20,24,28,32,37,47]

// string to upper case
export const stringToUpperCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// which generation you want to roll
export const generation = (gen) => {
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
    
    if ( gen === 8 ) {
        return 898
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
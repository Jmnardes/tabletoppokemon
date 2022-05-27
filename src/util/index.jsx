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

// pokemon base hp array
export const baseHpArray = [3,5,7,10,13,16,20,24,28,32,37,47]

// string to upper case
export const stringToUpperCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
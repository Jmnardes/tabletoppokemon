import { diceRoll } from "../../../util"

export const rollEventType = () => {
    let eventRoll = diceRoll(100)
    let profit = eventProfit()

    if(eventRoll < 5) {
        return {
            title: 'Single Race',
            description: 'Use the highest speed on your team',
            rules: 'Roll a d6 and sum the stat',
            first: profit.first,
            second: profit.second,
            third: profit.third
        }
    } else if(eventRoll < 10) {
        return {
            title: 'Dodge ball',
            description: 'Use all speeds or all defenses on your team',
            rules: 'Roll a d20 and sum the stats',
            first: profit.first,
            second: profit.second,
            third: profit.third
        }
    } else if(eventRoll < 15) {
        return {
            title: 'Goalkeeper',
            description: 'Use the highest defense on your team',
            rules: 'Roll a d6 and sum the stat',
            first: profit.first,
            second: profit.second,
            third: profit.third
        }
    } else if(eventRoll < 20) {
        return {
            title: 'Arm werstler',
            description: 'Use the highest attack on your team',
            rules: 'Roll a d6 and sum the stat',
            first: profit.first,
            second: profit.second,
            third: profit.third
        }
    } else if(eventRoll < 25) {
        return {
            title: 'Slap contest',
            description: 'Use the highest health on your team',
            rules: 'Roll a 2d6 and sum the stat',
            first: profit.first,
            second: profit.second,
            third: profit.third
        }
    } else if(eventRoll < 30) {
        return {
            title: 'Marathon',
            description: 'Use all healths on your team',
            rules: 'Roll a d20 and sum the stats',
            first: profit.first,
            second: profit.second,
            third: profit.third
        }
    } else if(eventRoll < 35) {
        return {
            title: 'Tug of war',
            description: 'Use all attacks on your team',
            rules: 'Roll a d20 and sum the stats',
            first: profit.first,
            second: profit.second,
            third: profit.third
        }
    } else if(eventRoll < 40) {
        return {
            title: 'Telecnesis',
            description: 'If you have a Ghost or a Psychic pokemon',
            rules: 'Roll a d6 and sum +1 for each pokemon on your team',
            first: profit.first,
            second: profit.second,
            third: profit.third
        }
    } else if(eventRoll < 45) {
        return {
            title: 'The best',
            description: 'Sum his attack, defense and speed',
            rules: 'Roll a d20 and sum +1 for each pokemon on your team',
            first: profit.first,
            second: profit.second,
            third: profit.third
        }
    } else if(eventRoll < 50) {
        return {
            title: 'Flying',
            description: 'If you have a pokemon who flyes',
            rules: 'Roll a d6 and sum +1 for each pokemon on your team',
            first: profit.first,
            second: profit.second,
            third: profit.third
        }
    } else if(eventRoll < 55) {
        return {
            title: 'Swimming',
            description: 'If you have a Water or Ice pokemon',
            rules: 'Roll a d6 and sum +1 for each pokemon on your team',
            first: profit.first,
            second: profit.second,
            third: profit.third
        }
    } else if(eventRoll < 60) {
        return {
            title: 'Trim a tree',
            description: 'Everyone can play, but Grass and Bug pokemons have advatages',
            rules: 'Roll a d6 and sum +2 for each pokemon on your team',
            first: profit.first,
            second: profit.second,
            third: profit.third
        }
    } else if(eventRoll < 65) {
        return {
            title: 'Scary face',
            description: 'Everyone can play, but Ghost and Dark pokemons have advatages',
            rules: 'Roll a d6 and sum +2 for each pokemon on your team',
            first: profit.first,
            second: profit.second,
            third: profit.third
        }
    } else if(eventRoll < 70) {
        return {
            title: 'Recharge',
            description: 'If you have a Electric pokemon',
            rules: 'Roll a d6 and sum +1 for each pokemon on your team',
            first: profit.first,
            second: profit.second,
            third: profit.third
        }
    } else if(eventRoll < 75) {
        return {
            title: 'Cuteness',
            description: 'Everyone can play, but Fairy pokemons have advatages',
            rules: 'Roll a d6 and sum +3 for each pokemon on your team',
            first: profit.first,
            second: profit.second,
            third: profit.third
        }
    } else if(eventRoll < 80) {
        return {
            title: 'Chemistry',
            description: 'Everyone can play, but Poison pokemons have advatages',
            rules: 'Roll a d6 and sum +2 for each pokemon on your team',
            first: profit.first,
            second: profit.second,
            third: profit.third
        }
    } else if(eventRoll < 85) {
        return {
            title: 'Sculpture',
            description: 'Everyone can play, but Ground and Rock pokemons have advatages',
            rules: 'Roll a d6 and sum +2 for each pokemon on your team',
            first: profit.first,
            second: profit.second,
            third: profit.third
        }
    } else if(eventRoll < 90) {
        return {
            title: 'Eating contest',
            description: 'Everyone can play, but Normal and Fighter pokemons have advatages',
            rules: 'Roll a d6 and sum +1 for each pokemon on your team',
            first: profit.first,
            second: profit.second,
            third: profit.third
        }
    } else if(eventRoll < 95) {
        return {
            title: 'Cooking',
            description: 'Everyone can play, but Dragon and Fire pokemons have advatages',
            rules: 'Roll a d6 and sum +1 for each pokemon on your team',
            first: profit.first,
            second: profit.second,
            third: profit.third
        }
    } else {
        return {
            title: 'Karate chop',
            description: 'If you have a Fighter, Rock or Steel pokemon',
            rules: 'Roll a d6 and sum +1 for each pokemon on your team',
            first: profit.first,
            second: profit.second,
            third: profit.third
        }
    }
}

function eventProfit() {
    let profitRoll = diceRoll(100)

    if(profitRoll < 85) {
        return {
            first: `${diceRoll(6) + 5} coins`,
            second: `${diceRoll(4) + 2} coins`,
            third: '1 coins'
        }
    } if(profitRoll < 98) {
        return {
            first: 'a Poke Star',
            second: `${diceRoll(6) + 3} coins`,
            third: `${diceRoll(2) + 1} coins`
        }
    } else {
        return {
            first: 'a Poke Crown',
            second: 'a Poke Star',
            third: `${diceRoll(6) + 5} coins`
        }
    }
}
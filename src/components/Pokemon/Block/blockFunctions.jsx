import { diceRoll } from "../../../util";

function blockCategory() {
    let blockCategoryPercentage = diceRoll(100)

    if(blockCategoryPercentage < 5) { // 5% gym leader
        return 'gym'
    } else if(blockCategoryPercentage < 15) { // 10% events
        return 'event'
    } else if(blockCategoryPercentage < 25) { // 10% interaction
        return 'interaction'
    } else if(blockCategoryPercentage < 37) { // 12% shop
        return 'shop'
    } else if(blockCategoryPercentage < 50) { // 13% itens and treasure
        return 'item'
    } else if(blockCategoryPercentage < 72) { // 22% Economy
        return 'economy'
    } else { // 28% Nothing
        return 'default'
    }
}

export function blockType() {
    let blockTypePercentage = diceRoll(100)
    let category = blockCategory()

    if(category === 'gym') return 'You gotta face a Gym Leader!'

    if(category === 'event') {
        if(blockTypePercentage < 80) {
            return event()
        } else {
            return specialEvent()
        }
    }

    if(category === 'interaction') {
        if(blockTypePercentage < 15) {
            return 'Choose a enemy to battle, the winner gets a medal'
        } else if (blockTypePercentage < 50) {
            return 'Roll to face a enemy on a battle, the winner gets a medal'
        } else {
            return stealer()
        }
    }

    if(category === 'shop') return 'Buy items from the shop'

    if(category === 'item') {
        if(blockTypePercentage < 85) {
            return item()
        } else {
            return treasure()
        }
    }

    if(category === 'economy') {
        if(blockTypePercentage < 50) {
            return positiveEconomy()
        } else {
            return negativeEconomy()
        }
    }

    if(category === 'default') return 'Nothing happens'
}

function stealer() {
    let stealerPercentage = diceRoll(100)

    if(stealerPercentage < 65) {
        return 'Steal 5 coins from a trainer'
    } else if(stealerPercentage < 90) {
        return 'Steal 1 medal or 10 coins from a trainer'
    } else {
        return 'Steal 1 trophy or 1 medal or 20 coins from a trainer'
    }
}

function positiveEconomy() {
    let positivePercentage = diceRoll(100)

    if(positivePercentage < 90) {
        return 'Lucky day: you have found 5 coins!'
    } else {
        return 'Lottery ticket: you received 20 coins!'
    }
}

function negativeEconomy() {
    let negativePercentage = diceRoll(100)

    if(negativePercentage < 85) {
        return 'Holed pocket: you have lost 3 coins'
    } else {
        return 'Bankrupcy: you have lost 10 coins'
    }
}

function event() {
    let eventPercentage = diceRoll(100)

    if(eventPercentage < 10) {
        return 'Single racer, the winner gets 5 coins'
    } else if(eventPercentage < 20) {
        return 'Marathon, the winner gets a Medal'
    } else if(eventPercentage < 30) {
        return 'Arm werstler, the winner gets 5 coins'
    } else if(eventPercentage < 40) {
        return 'Tug of war, the winner gets a Medal'
    } else if(eventPercentage < 50) {
        return 'Slap contest, the winner gets 5 coins'
    } else if(eventPercentage < 60) {
        return 'Resistance test, the winner gets a Medal'
    } else if(eventPercentage < 70) {
        return 'Block contest, the winner gets 5 coins'
    } else if(eventPercentage < 80) {
        return 'Dodge ball, the winner gets a Medal'
    } else if(eventPercentage < 90) {
        return `If you have a ${nature()} or a ${nature()} pokemon, get 10 coins for each pokemon you have`
    } else {
        return `If you have a ${element()} or a ${element()} pokemon, get 10 coins for each pokemon you have`
    }
}

function specialEvent() {
    let specialEventPercentage = diceRoll(100)

    if(specialEventPercentage < 10) {
        return 'Single racer, the winner gets a Trophy'
    } else if(specialEventPercentage < 20) {
        return 'Marathon, the winner gets a Trophy'
    } else if(specialEventPercentage < 30) {
        return 'Arm werstler, the winner gets a Trophy'
    } else if(specialEventPercentage < 40) {
        return 'Tug of war, the winner gets a Trophy'
    } else if(specialEventPercentage < 50) {
        return 'Slap contest, the winner gets a Trophy'
    } else if(specialEventPercentage < 60) {
        return 'Resistance test, the winner gets a Trophy'
    } else if(specialEventPercentage < 70) {
        return 'Tier contest, the winner gets a Trophy'
    } else if(specialEventPercentage < 80) {
        return 'Dodge ball, the winner gets a Trophy'
    } else if(specialEventPercentage < 90) {
        return `If you have a ${nature()} or a ${nature()} pokemon, get a Trophy`
    } else {
        return `If you have a ${element()} or a ${element()} pokemon, get a Trophy`
    }
}

function element() {
    let element = diceRoll(18)

    if(element === 0) return 'Psychic'
    if(element === 1) return 'Fire' 
    if(element === 2) return 'Water'
    if(element === 3) return 'Dragon'
    if(element === 4) return 'Bug'
    if(element === 5) return 'Dark'
    if(element === 6) return 'Electric'
    if(element === 7) return 'Fairy'
    if(element === 8) return 'Fighting'
    if(element === 9) return 'Flying'
    if(element === 10) return 'Ice'
    if(element === 11) return 'Ghost'
    if(element === 12) return 'Grass'
    if(element === 13) return 'Ground'
    if(element === 14) return 'Poison'
    if(element === 15) return 'Rock'
    if(element === 16) return 'Steel'
    if(element === 17) return 'Normal'
}

function nature() {
    let nature = diceRoll(21)

    if(nature === 0) return 'Lonely'
    if(nature === 1) return 'Naughty' 
    if(nature === 2) return 'Brave'
    if(nature === 3) return 'Adamant'
    if(nature === 4) return 'Calm'
    if(nature === 5) return 'Gentle'
    if(nature === 6) return 'Sassy'
    if(nature === 7) return 'Careful'
    if(nature === 8) return 'Bold'
    if(nature === 9) return 'Lax'
    if(nature === 10) return 'Relaxed'
    if(nature === 11) return 'Impish'
    if(nature === 12) return 'Timid'
    if(nature === 13) return 'Naive'
    if(nature === 14) return 'Hasty'
    if(nature === 15) return 'Jolly'
    if(nature === 16) return 'Bashful'
    if(nature === 17) return 'Rickety'
    if(nature === 18) return 'Sloppy'
    if(nature === 19) return 'Lazy'
    if(nature === 20) return 'Serious'
}

function item() {
    let item = diceRoll(8)

    if(item === 0) return 'You have found a Great Ball'
    if(item === 1) return 'You have found two Great Balls'
    if(item === 2) return 'You have found three Great Balls'
    if(item === 3) return 'You have found a Super Ball'
    if(item === 4) return 'You have found two Super Balls'
    if(item === 5) return 'You have found a Ultra Ball'
    if(item === 6) return 'You have found 5 coins'
    if(item === 7) return 'You have found a Medal'
}

function treasure() {
    let treasure = diceRoll(8)

    if(treasure === 0) return 'You have found three Super Balls'
    if(treasure === 1) return 'You have found a Ultra Ball'
    if(treasure === 2) return 'You have found two Ultra Balls'
    if(treasure === 3) return 'You have found 15 coins'
    if(treasure === 4) return 'You have found 20 coins'
    if(treasure === 5) return 'You have found a Medal'
    if(treasure === 6) return 'You have found two Medals'
    if(treasure === 7) return 'You have found a Trophy'
}

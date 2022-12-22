import { diceRoll } from "../../../util";

function blockCategory() {
    let blockCategoryPercentage = diceRoll(100)

    if(blockCategoryPercentage < 20) { // 20
        return 'event'
    } else if(blockCategoryPercentage < 35) { // 15
        return 'interaction'
    } else if(blockCategoryPercentage < 50) { // 15
        return 'shop'
    } else if(blockCategoryPercentage < 60) {
        return 'item'
    } else if(blockCategoryPercentage < 70) { // 20
        return 'economy'
    } else { // 30
        return 'default'
    }
}

export function blockType() {
    let blockTypePercentage = diceRoll(100)
    let category = blockCategory()

    if(category === 'event') {
        if(blockTypePercentage < 85) {
            return event()
        } else {
            return specialEvent()
        }
    }

    if(category === 'interaction') {
        if(blockTypePercentage < 20) {
            return ({
                type: 'interaction',
                title: 'Battle',
                label: 'Choose a enemy to battle, the winner gets a medal'
            })
        } else if (blockTypePercentage < 60) {
            return ({
                type: 'interaction',
                title: 'Battle',
                label: 'Roll to face a enemy on a battle, the winner gets a medal'
            })
        } else {
            return stealer()
        }
    }

    if(category === 'shop') return ({
        type: 'shop',
        title: 'Shop',
        label: "If you have cash you're welcome",
        rules: "If you end your turn or catch a pokemon, the shop will be disabled"
    })

    // if(category === 'item') {
    //     if(blockTypePercentage < 85) {
    //         return item()
    //     } else {
    //         return treasure()
    //     }
    // }

    if(category === 'economy') {
        if(blockTypePercentage < 60) {
            return positiveEconomy()
        } else {
            return negativeEconomy()
        }
    }

    if(category === 'default') return ({
        type: 'default',
        title: 'Nothing',
        label: "It's really nothing, sorry"
    })
}

function stealer() {
    let stealerPercentage = diceRoll(100)
    let stealRoll = 0
    
    if(stealerPercentage < 65) {
        stealRoll = diceRoll(5) + 1
        return ({
            type:'interaction', 
            title:'Pickpocket', 
            label:`You can steal ${stealRoll} coins from another player`,
            rules:"If he doesn't have this amount you take what he has",
            change: {
                category: 'coin',
                type: 'button',
                value: stealRoll
            }
        })
    } else if(stealerPercentage < 85) {
        stealRoll = diceRoll(6) + 5
        return ({
            type:'interaction', 
            title:'Thief', 
            label:`You can steal ${stealRoll} coins from another player`,
            rules:"If he doesn't have this amount you take what he has",
            change: {
                category: 'coin',
                type: 'button',
                value: stealRoll
            }
        })
    } else if(stealerPercentage < 95) {
        return ({
            type:'interaction', 
            title:'Robber', 
            label:`You can steal a medal from another player`,
            change: {
                category: 'medal',
                type: 'button',
                value: 1
            }
        })
    } else {
        return ({
            type:'interaction', 
            title:'Burglar', 
            label:'You can steal a trophy from another player',
            change: {
                category: 'trophy',
                type: 'button',
                value: 1
            }
        })
    }
}

function positiveEconomy() {
    let positivePercentage = diceRoll(100)
    let positiveRoll = 0

    if(positivePercentage < 65) {
        positiveRoll = diceRoll(4) + 2
        return ({
            type:'economy', 
            title:'Lost penny', 
            label:`You have found ${positiveRoll} coins laying on the ground`,
            change: {
                category: 'coin',
                type: 'passive',
                value: positiveRoll,
                isPositive: true
            }
        })
    } else if(positivePercentage < 90) {
        positiveRoll = diceRoll(6) + 5
        return ({
            type:'economy', 
            title:'Profit', 
            label:`You have earned ${positiveRoll} coins profit from one of your investments`,
            change: {
                category: 'coin',
                type: 'passive',
                value: positiveRoll,
                isPositive: true
            }
        })
    } else {
        positiveRoll = diceRoll(10) + 10
        return ({
            type:'economy', 
            title:'Lottery ticket', 
            label:`You won ${positiveRoll} coins in the lottery, how lucky!`,
            change: {
                category: 'coin',
                type: 'passive',
                value: positiveRoll,
                isPositive: true
            }
        })
    }
}

function negativeEconomy() {
    let negativePercentage = diceRoll(100)
    let negativeRoll = 0

    if(negativePercentage < 60) {
        negativeRoll = diceRoll(3) + 1
        return ({
            type:'economy', 
            title:'Holed pocket', 
            label:`You found a hole in your pocket, bad news, you lost ${negativeRoll} coins`,
            change: {
                category: 'coin',
                type: 'passive',
                value: negativeRoll,
                isPositive: false
            }
        })
    } else if(negativePercentage < 85) {
        negativeRoll = diceRoll(6) + 3
        return ({
            type:'economy', 
            title:'Taxes', 
            label:`Team rocket is taxing this path, you have to pay ${negativeRoll} coins`,
            change: {
                category: 'coin',
                type: 'passive',
                value: negativeRoll,
                isPositive: false
            }
        })
    } else {
        negativeRoll = diceRoll(10) + 5
        return ({
            type:'economy', 
            title:'Bankrupcy', 
            label:`Some of your investments gone wrong, you lost ${negativeRoll} coins`,
            change: {
                category: 'coin',
                type: 'passive',
                value: negativeRoll,
                isPositive: false
            }
        })
    }
}

function event() {
    let eventPercentage = diceRoll(100)
    let sortedElement = element()
    let sortedNature = nature()

    if(eventPercentage < 10) {
        return ({
            type:'event', 
            title:'Single race', 
            label:'The winner gets 5 coins', 
            rules:'Roll a d6 and sum the highest speed'
        })
    } else if(eventPercentage < 20) {
        return ({type:'event', title:'Marathon', label:'The winner gets a Medal, the second 5 coins', rules:'Roll a d20 and sum all team speeds'})
    } else if(eventPercentage < 30) {
        return ({type:'event', title:'Arm werstler', label:'The winner gets 5 coins', rules:'Roll a d6 and sum the highest attack'})
    } else if(eventPercentage < 40) {
        return ({type:'event', title:'Tug of war', label:'The winner gets a Medal, the second 5 coins', rules:'Roll a d20 and sum all team attacks'})
    } else if(eventPercentage < 50) {
        return ({type:'event', title:'Slap contest', label:'The winner gets 5 coins', rules:'Roll a d6 and sum the highest life'})
    } else if(eventPercentage < 60) {
        return ({type:'event', title:'Resistance test', label:'The winner gets a Medal, the second 5 coins', rules:'Roll a d20 and sum all team lifes'})
    } else if(eventPercentage < 70) {
        return ({type:'event', title:'Block contest', label:'The winner gets 5 coins', rules:'Roll a d6 and sum the highest defense'})
    } else if(eventPercentage < 80) {
        return ({type:'event', title:'Dodge ball', label:'The winner gets a Medal, the second 5 coins', rules:'Roll a d20 and sum all team defenses'})
    } else if(eventPercentage < 90) {
        return ({
            type:'event', 
            title:'Nature Check', 
            label:`If you have a ${sortedNature} pokemon on your team, you'll get 20 coins!`,
            change: {
                category: 'coin',
                type: 'nature',
                value: 20,
                nature: `${sortedNature}`
            }
        })
    } else {
        return ({
            type:'event', 
            title:'Element Check', 
            label:`If you have a ${sortedElement} pokemon on your team, you'll get 20 coins!`,
            change: {
                category: 'coin',
                type: 'element',
                value: 20,
                element: `${sortedElement}`
            }
        })
    }
}

function specialEvent() {
    let specialEventPercentage = diceRoll(100)
    let sortedElement = element()
    let sortedNature = nature()

    if(specialEventPercentage < 10) {
        return ({type:'event', title:'Single race', label:'The winner gets a Trophy', rules:'Roll a d20 and sum the highest speed'})
    } else if(specialEventPercentage < 20) {
        return ({type:'event', title:'Marathon', label:'The winner gets a Trophy, the second 5 coins', rules:'Roll a d6 and sum all team speeds'})
    } else if(specialEventPercentage < 30) {
        return ({type:'event', title:'Arm werstler', label:'The winner gets a Trophy', rules:'Roll a d20 and sum the highest attack'})
    } else if(specialEventPercentage < 40) {
        return ({type:'event', title:'Tug of war', label:'The winner gets a Trophy, the second 5 coins', rules:'Roll a d20 and sum all team attacks'})
    } else if(specialEventPercentage < 50) {
        return ({type:'event', title:'Slap contest', label:'The winner gets a Trophy', rules:'Roll a d6 and sum the highest life'})
    } else if(specialEventPercentage < 60) {
        return ({type:'event', title:'Resistance test', label:'The winner gets a Trophy, the second 5 coins', rules:'Roll a d20 and sum all team lifes'})
    } else if(specialEventPercentage < 70) {
        return ({type:'event', title:'Block contest', label:'The winner gets a Trophy', rules:'Roll a d6 and sum the highest defense'})
    } else if(specialEventPercentage < 80) {
        return ({type:'event', title:'Dodge ball', label:'The winner gets a Trophy, the second 5 coins', rules:'Roll a d20 and sum all team defenses'})
    } else if(specialEventPercentage < 90) {
        return ({
            type:'event', 
            title:'Nature Check', 
            label:`If you have a ${sortedNature} pokemon on your team, you'll get a Trophy!`,
            change: {
                category: 'trophy',
                type: 'nature',
                value: 1,
                element: `${sortedNature}`
            }
        })
    } else {
        return ({
            type:'event', 
            title:'Element Check', 
            label:`If you have a ${sortedElement} pokemon on your team, you'll get a Trophy!`,
            change: {
                category: 'trophy',
                type: 'element',
                value: 1,
                element: `${sortedElement}`
            }
        })
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

// function item() {
//     let item = diceRoll(8)

//     if(item === 0) return ({type:'item', title: 'Great Ball', label:'You have found a Great Ball'})
//     if(item === 1) return 'You have found two Great Balls'
//     if(item === 2) return 'You have found three Great Balls'
//     if(item === 3) return 'You have found a Super Ball'
//     if(item === 4) return 'You have found two Super Balls'
//     if(item === 5) return 'You have found a Ultra Ball'
//     if(item === 6) return 'You have found 5 coins'
//     if(item === 7) return 'You have found a Medal'
// }

// function treasure() {
//     let treasure = diceRoll(8)

//     if(treasure === 0) return 'You have found three Super Balls'
//     if(treasure === 1) return 'You have found a Ultra Ball'
//     if(treasure === 2) return 'You have found two Ultra Balls'
//     if(treasure === 3) return 'You have found 20 coins'
//     if(treasure === 4) return 'You have found 25 coins'
//     if(treasure === 5) return 'You have found a Medal'
//     if(treasure === 6) return 'You have found two Medals'
//     if(treasure === 7) return 'You have found a Trophy'
// }

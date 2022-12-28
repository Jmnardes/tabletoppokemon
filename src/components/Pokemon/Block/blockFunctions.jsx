import { diceRoll } from "../../../util";

function blockCategory() {
    let blockCategoryPercentage = diceRoll(100)

    if(blockCategoryPercentage < 15) { // 15
        return 'event'
    } else if(blockCategoryPercentage < 25) { // 10
        return 'shop'
    } else if(blockCategoryPercentage < 35) { // 10
        return 'item'
    } else if(blockCategoryPercentage < 65) { // 30
        return 'economy'
    } else { // 35
        return 'default'
    }
}

export function blockType() {
    let blockTypePercentage = diceRoll(100)
    let category = blockCategory()

    if(category === 'event') {
        if(blockTypePercentage < 88) {
            return event()
        } else if(blockTypePercentage < 98) {
            return event('item')
        } else {
            return event('treasure')
        }
    }

    if(category === 'shop') return ({
        type: 'shop',
        title: 'Mercant',
        label: "Hello stranger!",
        rules: "Don't end the turn, the mercant will leave if you catch a pokemon"
    })

    if(category === 'item') {
        if(blockTypePercentage < 95) {
            return item()
        } else {
            return treasure()
        }
    }

    if(category === 'economy') {
        if(blockTypePercentage < 70) {
            return positiveEconomy()
        } else {
            return negativeEconomy()
        }
    }

    if(category === 'default') return ({
        type: 'default',
        title: 'Nothing',
        label: defaultMessages()
    })
}

function defaultMessages() {
    let message = diceRoll(16)

    if (message === 0) return 'You can swear that you saw a Zapdos'
    if (message === 1) return 'You can swear that you saw a Articuno'
    if (message === 2) return 'You can swear that you saw a Moltres'
    if (message === 3) return 'Nothing, really nothing, sorry'
    if (message === 4) return "Looks like you've chosen an off-the-beaten path"
    if (message === 5) return "Very quiet around here"
    if (message === 6) return "Boring..."
    if (message === 7) return "Maybe you are lost"
    if (message === 8) return "Is it the right way?"
    if (message === 9) return "Where was it again?"
    if (message === 10) return "Is there anyone here?"
    if (message === 11) return "I've been a little lonely"
    if (message === 12) return "Someone here?"
    if (message === 13) return "Helloooo?"
    if (message === 14) return "Deadend, will have to go back"
    if (message === 15) return "Still nothing"
}

function positiveEconomy() {
    let positivePercentage = diceRoll(100)
    let positiveRoll = 0

    if(positivePercentage < 75) {
        positiveRoll = diceRoll(3) + 1
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
    } else if(positivePercentage < 95) {
        positiveRoll = diceRoll(8) + 3
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
        positiveRoll = diceRoll(11) + 10
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

    if(negativePercentage < 75) {
        negativeRoll = diceRoll(2) + 1
        return ({
            type:'economy', 
            title:'Holed pocket', 
            label:`You found a hole in your pocket, you have lost ${negativeRoll} coins`,
            change: {
                category: 'coin',
                type: 'passive',
                value: negativeRoll,
                isPositive: false
            }
        })
    } else if(negativePercentage < 95) {
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
        negativeRoll = diceRoll(11) + 5
        return ({
            type:'economy', 
            title:'Bankrupcy', 
            label:`Some of your investments gone wrong, you have lost ${negativeRoll} coins`,
            change: {
                category: 'coin',
                type: 'passive',
                value: negativeRoll,
                isPositive: false
            }
        })
    }
}

function event(type) {
    let eventPercentage = diceRoll(100)
    let sortedElement = element()
    let sortedNature = nature()
    let sortedCoins = diceRoll(6) + 10

    if(!type) {
        if(eventPercentage < 50) {
            return ({
                type:'event', 
                title:'Nature Check', 
                label:`If you have a ${sortedNature} pokemon on your team, you'll get ${sortedCoins} coins!`,
                change: {
                    category: 'coin',
                    type: 'nature',
                    value: sortedCoins,
                    nature: `${sortedNature}`
                }
            })
        } else {
            return ({
                type:'event', 
                title:'Element Check', 
                label:`If you have a ${sortedElement} pokemon on your team, you'll get ${sortedCoins} coins!`,
                change: {
                    category: 'coin',
                    type: 'element',
                    value: sortedCoins,
                    element: `${sortedElement}`
                }
            })
        }
    }

    if(type === 'item') {
        if(eventPercentage < 50) {
            return ({
                type:'event', 
                title:'Nature Check', 
                label:`If you have a ${sortedNature} pokemon on your team, you'll get a '${itemRoll()}' item!`,
                change: {
                    category: 'item',
                    type: 'nature',
                    item: itemRoll(),
                    nature: `${sortedNature}`
                }
            })
        } else {
            return ({
                type:'event', 
                title:'Element Check', 
                label:`If you have a ${sortedElement} pokemon on your team, you'll get a '${itemRoll()}' item!`,
                change: {
                    category: 'item',
                    type: 'element',
                    item: itemRoll(),
                    element: `${sortedElement}`
                }
            })
        }
    }

    if(type === 'treasure') {
        if(eventPercentage < 50) {
            return ({
                type:'event', 
                title:'Nature Check', 
                label:`If you have a ${sortedNature} pokemon on your team, you'll get a '${treasureRoll()}'`,
                change: {
                    category: 'treasure',
                    type: 'nature',
                    item: treasureRoll(),
                    nature: `${sortedNature}`
                }
            })
        } else {
            return ({
                type:'event', 
                title:'Element Check', 
                label:`If you have a ${sortedElement} pokemon on your team, you'll get a '${treasureRoll()}'`,
                change: {
                    category: 'treasure',
                    type: 'element',
                    item: treasureRoll(),
                    element: `${sortedElement}`
                }
            })
        }
    }
}

function itemRoll() {
    let itemPercentage = diceRoll(100)

    if(itemPercentage < 45) return 'superball'
    if(itemPercentage < 65) return 'ultraball'
    if(itemPercentage < 80) return 'steal'
    if(itemPercentage < 95) {
        return 'fight'
    } else {
        return 'medal'
    }
}

function treasureRoll() {
    let treasurePercentage = diceRoll(100)

    if(treasurePercentage < 40) return 'ultraball'
    if(treasurePercentage < 75) return 'medal'
    if(treasurePercentage < 90) {
        return 'masterball'
    } else {
        return 'trophy'
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
    let itemPercent = diceRoll(100)

    if(itemPercent < 25) {
        return {
            type:'item', 
            title: 'Great Ball', 
            label:'You have found a Great Ball',
            change: {
                type: 'greatball',
                value: 1
            }
        }
    } else if(itemPercent < 35) {
        return {
            type:'item', 
            title: 'Great Ball x2', 
            label:'You have found two Great Balls',
            change: {
                type: 'greatball',
                value: 2
            }
        }
    } else if(itemPercent < 50) {
        return {
            type:'item', 
            title: 'Great Ball x3', 
            label:'You have found three Great Balls',
            change: {
                type: 'greatball',
                value: 3
            }
        }
    } else if(itemPercent < 55) {
        return {
            type:'item', 
            title: 'Super Ball', 
            label:'You have found a Super Ball',
            change: {
                type: 'superball',
                value: 1
            }
        }
    } else if(itemPercent < 70) {
        return {
            type:'item', 
            title: 'Super Ball x2', 
            label:'You have found two Super Ball',
            change: {
                type: 'superball',
                value: 2
            }
        }
    } else if(itemPercent < 75) {
        return {
            type:'item', 
            title: 'Ultra Ball', 
            label:'You have found a Ultra Ball',
            change: {
                type: 'ultraball',
                value: 1
            }
        }
    } else if(itemPercent < 85) {
        return {
            type:'item', 
            title: 'Fight Glove', 
            label:'You have found a Fight Glove',
            change: {
                type: 'fight',
                value: 1
            }
        }
    } else if(itemPercent < 95) {
        return {
            type:'item', 
            title: 'Team Rocket Pass',
            label:'You have found a Team Rocket Pass',
            change: {
                type: 'steal',
                value: 1
            }
        }
    } else {
        return {
            type:'item', 
            title: 'Poke Star', 
            label:'You have found a Poke Star',
            change: {
                type: 'medal',
                value: 1
            }
        }
    }
}

function treasure() {
    let itemPercent = diceRoll(100)

    if(itemPercent < 25) {
        return {
            type:'item', 
            title: 'Ultra Ball x2', 
            label:'You have found two Ultra Balls',
            change: {
                type: 'ultraball',
                value: 2
            }
        }
    } else if(itemPercent < 75) {
        return {
            type:'item', 
            title: 'Poke Star', 
            label:'You have found a Poke Star',
            change: {
                type: 'medal',
                value: 1
            }
        }
    } else if(itemPercent < 90) {
        return {
            type:'item', 
            title: 'Master Ball', 
            label:'You have found a Master Ball',
            change: {
                type: 'masterball',
                value: 1
            }
        }
    } else {
        return {
            type:'item', 
            title: 'Poke Crown', 
            label:'You have found a Poke Crown',
            change: {
                type: 'trophy',
                value: 1
            }
        }
    }
}

import { diceRoll } from "../../../util"

export const rollEventType = () => {
    let eventRoll = diceRoll(100)

    if(eventRoll < 50) {
        return {
            title: 'Single Race',
            description: 'Choose the highest speed you have!',
            rules: 'Roll a d6 and sum the stat',
            prize1: '5 coins',
            prize2: '3 coins'
        }
    } else {
        return {
            title: 'Arm werstler',
            description: 'Use all speeds or all defenses',
            rules: 'Roll a d20 and sum the stats',
            prize1: '5 coins',
            prize2: '3 coins'
        }
    }
}
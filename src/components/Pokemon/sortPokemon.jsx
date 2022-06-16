import { diceRoll, generation } from "../../util"
import pokemon from '../../assets/json/pokemons.json'

export function sortPokemon(tier, gen, type, half) {
    let sort = 0
    let tierMatch = false
    let typeMatch = false
    let tierVariance = 0
    
    tier = Number(tier)

    if (!gen) gen = 1
    if (type) gen = 8
    if (half) {
        if(tier%2 === 0 && tier !== 0) {
            tier = tier - 1
        }
    }
    
    // getting percentage to roll pokemon from tier up or down
    tierVariance = diceRoll(100) // 0 to 99
    if (tierVariance < 65) // 0-69 70%
        tierVariance = 0
    else if (tierVariance < 90) // 70-94 25%
        tierVariance = 1 // 1 tier down
    else // 95-99 5%
        tierVariance = 2 // 1 tier up

    // test if the tier of the sorted pokemon match the tier selected
    while (!tierMatch) {
        sort = Number(diceRoll(generation(gen)) + 1)
        typeMatch = false
        
        if (type) {
            pokemon[sort].type.forEach(t => {
                if (t === type) typeMatch = true
            })
            
            if (!typeMatch) continue
        }

        
        if (half) {
            
            if (tierVariance === 1) {

                if (pokemon[sort].tier === (tier - 1) || pokemon[sort].tier === tier || pokemon[sort].tier === (tier + 1) ) {
                    tierMatch = true
                }

            } else if (tierVariance === 2) {

                if ( pokemon[sort].tier === tier || pokemon[sort].tier === (tier + 1) || pokemon[sort].tier === (tier + 2)) {
                    tierMatch = true
                }

            }

            if (pokemon[sort].tier === tier || pokemon[sort].tier === (tier + 1)) {
                tierMatch = true
            }

            continue
        }
        
        // testing if the sorted poke tier matches the tier variance
        if (tierVariance) {

            if (tierVariance === 1) {

                if (pokemon[sort].tier === (tier - 1) || pokemon[sort].tier === tier) {
                    tierMatch = true
                }

            } else if (tierVariance === 2) {

                if (pokemon[sort].tier === (tier + 1) || pokemon[sort].tier === tier) {
                    tierMatch = true
                }

            }
        }

        if (pokemon[sort].tier === tier) {
            tierMatch = true
        }
    }

    return sort
}
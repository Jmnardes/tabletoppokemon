import { diceRoll, generation } from "../../util"
import pokemon from '../../assets/json/pokemons.json'

export function sortPokemon(tier, gen = 1) {
    let tierVariance = 0
    
    tier = Number(tier)

    tierVariance = diceRoll(100) // 0 - 99
    if(tierVariance < 5) { // 0 - 5
        tierVariance = 1 // 5% três tier abaixo
    } else if(tierVariance < 15) {
        tierVariance = 2 // 10% dois tiers abaixo
    } else if(tierVariance < 40) {
        tierVariance = 3 // 25% um tier abaixo
    } else if(tierVariance < 97) {
        tierVariance = 0 // 57% tier atual
    } else {
        tierVariance = 4 // 2% tier pra cima
    }

    // testing if the sorted poke tier matches the tier variance
    if (tierVariance) {

        if (tierVariance === 1) {

            if (tier === 0) {
                return sortSelectedTier(0, gen)
            } else if (tier === 1) {
                return sortSelectedTier(1, gen)
            } else if (tier === 2) {
                return sortSelectedTier(2, gen)
            } else {
                tier = tier - 3
                return sortSelectedTier(tier, gen)
            }

        } else if (tierVariance === 2 ) {

            if (tier === 0) {
                return sortSelectedTier(0, gen)
            } else if (tier === 1) {
                return sortSelectedTier(1, gen)
            } else {
                tier = tier - 2
                return sortSelectedTier(tier, gen)
            }

        } else if (tierVariance === 3) {

            if (tier === 0) {
                return sortSelectedTier(0, gen)
            } else {
                tier = tier - 1
                return sortSelectedTier(tier, gen)
            }

        } else if (tierVariance === 4) {

            tier = tier + 1
            return sortSelectedTier(tier, gen)

        }
    } else {
        return sortSelectedTier(tier, gen)
    }
}

function sortSelectedTier(tier, gen) {
    let sortedPoke = Number(diceRoll(generation(gen)) + 1)

    while(pokemon[sortedPoke].tier !== tier) {
        sortedPoke = Number(diceRoll(generation(gen)) + 1)
    }

    return sortedPoke
}
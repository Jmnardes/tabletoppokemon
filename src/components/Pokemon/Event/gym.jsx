export function whichGymIs(tier) {
    tier = Number(tier)
    
    if(tier === 0) {
        return 12
    } else if(tier === 1) {
        return 25
    } else if(tier === 2) {
        return 37
    } else if(tier === 3) {
        return 50
    } else if(tier === 4) {
        return 75
    } else if(tier === 5) {
        return 100
    } else if(tier === 6) {
        return 125
    } else if(tier === 7) {
        return 175
    }
}
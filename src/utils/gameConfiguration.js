export const gameConfig = {
    trainerName: {
        default: '',
        minLength: 3,
        maxLength: 14,
    },
    
    badgesToWin: {
        default: 8,
        min: 2,
        max: 12,
        step: 1,
    },
    
    levelUpgradePerTurn: {
        default: 1,
        min: 1,
        max: 2,
        step: 1,
    },
    
    turnsUntilNextGym: {
        default: 4,
        min: 2,
        max: 5,
        step: 1,
    },
    
    gymStrengthBonus: {
        default: 2,
        min: 1,
        max: 3,
        step: 1,
    },
    
    shinyChance: {
        default: 1,
        min: 1,
        max: 3,
        step: 1,
    },
    
    gameDifficulty: {
        default: 0,
        options: [
            { value: 0, label: 'Trainer' },
            { value: 1, label: 'Catcher' },
            { value: 2, label: 'Champion' },
            { value: 3, label: 'Elite' },
        ],
    },
    
    generation: {
        default: 8,
        min: 1,
        max: 8,
    },
    
    mixedGroups: {
        default: true,
    },
    
    teamLength: {
        default: 6,
        min: 3,
        max: 6,
    },
};

export const getDefaultGameConfig = () => ({
    trainerName: gameConfig.trainerName.default,
    badgesToWin: gameConfig.badgesToWin.default,
    levelUpgradePerTurn: gameConfig.levelUpgradePerTurn.default,
    turnsUntilNextGym: gameConfig.turnsUntilNextGym.default,
    gymStrengthBonus: gameConfig.gymStrengthBonus.default,
    shinyChance: gameConfig.shinyChance.default,
    gameDifficulty: gameConfig.gameDifficulty.default,
    generation: gameConfig.generation.default,
    mixedGroups: gameConfig.mixedGroups.default,
    teamLength: gameConfig.teamLength.default,
});

export const validateTrainerName = (name) => {
    return name.length >= gameConfig.trainerName.minLength && 
           name.length <= gameConfig.trainerName.maxLength;
};

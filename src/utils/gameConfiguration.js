export const gameConfig = {
    trainerName: {
        default: '',
        minLength: 3,
        maxLength: 14,
    },
    
    badgesToWin: {
        default: 3,
        min: 2,
        max: 10,
        step: 1,
        tooltip: 'Quantidade de badges necessárias para acabar o jogo.',
    },
    
    stagesPerJourney: {
        default: 10,
        min: 5,
        max: 20,
        step: 1,
        tooltip: 'Quantos pokémons selvagens estarão presentes a cada jornada antes de avançar para o próximo level.',
    },
    
    battleFrequency: {
        default: 3,
        min: 0,
        max: 5,
        step: 1,
        tooltip: 'A cada quantos turnos terá uma batalha entre players. 0 = sem batalhas.',
    },
    
    gymStrengthBonus: {
        default: 0,
        min: 0,
        max: 2,
        step: 1,
        tooltip: 'Força extra dos pokémons do líder de ginásio de acordo com o nível.',
    },
    
    shinyChance: {
        default: 1,
        min: 1,
        max: 3,
        step: 1,
        tooltip: 'Porcentagem de chance do pokémon selvagem ser um shiny.',
    },
    
    catchDifficulty: {
        default: 0,
        options: [
            { value: 0, label: 'Trainer' },
            { value: 1, label: 'Catcher' },
            { value: 2, label: 'Champion' },
            { value: 3, label: 'Elite' },
        ],
        tooltip: 'Aumento da dificuldade de capturar o pokémon.',
    },
    
    generation: {
        default: 8,
        min: 1,
        max: 8,
    },
    
    mixedGroups: {
        default: true,
    },

    journeyTeamLength: {
        default: 3,
        min: 2,
        max: 6,
        step: 1,
        tooltip: 'Quantidade de pokémons que você pode levar na jornada.',
    },
};

export const getDefaultGameConfig = () => ({
    trainerName: gameConfig.trainerName.default,
    badgesToWin: gameConfig.badgesToWin.default,
    stagesPerJourney: gameConfig.stagesPerJourney.default,
    battleFrequency: gameConfig.battleFrequency.default,
    gymStrengthBonus: gameConfig.gymStrengthBonus.default,
    shinyChance: gameConfig.shinyChance.default,
    catchDifficulty: gameConfig.catchDifficulty.default,
    generation: gameConfig.generation.default,
    mixedGroups: gameConfig.mixedGroups.default,
    journeyTeamLength: gameConfig.journeyTeamLength.default,
});

export const validateTrainerName = (name) => {
    return name.length >= gameConfig.trainerName.minLength && 
           name.length <= gameConfig.trainerName.maxLength;
};

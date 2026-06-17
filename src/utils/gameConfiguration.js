export const gameConfig = {
    trainerName: {
        default: '',
        minLength: 3,
        maxLength: 14,
    },
    
    badgesToWin: {
        default: 3,
        min: 3,
        max: 8,
        step: 1,
        tooltip: 'Quantidade de badges necessárias para acabar o jogo.',
    },
    
    stagesPerJourney: {
        default: 5,
        min: 4,
        max: 6,
        step: 1,
        tooltip: 'Quantos pokémons selvagens você precisa derrotar para completar cada jornada. O total será o dobro.',
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

    gymRegion: {
        default: 'totalRandom',
        options: [
            { value: 'kanto', label: 'Kanto' },
            { value: 'johto', label: 'Johto' },
            { value: 'hoenn', label: 'Hoenn' },
            { value: 'sinnoh', label: 'Sinnoh' },
            { value: 'randomRegion', label: 'Random Region' },
            { value: 'totalRandom', label: 'Total Random' },
        ],
        tooltip: 'Gyms only',
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
    gymRegion: gameConfig.gymRegion.default,
});

export const validateTrainerName = (name) => {
    return name.length >= gameConfig.trainerName.minLength && 
           name.length <= gameConfig.trainerName.maxLength;
};

export const sanitizeInput = (value) => {
    return value.replace(/<[^>]*>/g, '').replace(/[^a-zA-Z0-9 _-]/g, '').trim();
};

export const validateSessionCode = (code) => {
    return code.length >= 3 && /^[A-Z0-9]+$/i.test(code);
};

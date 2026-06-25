import { keyframes } from "@emotion/react";

export const winAnimation = keyframes`
    0% { 
    transform: translate(0px, 0px) rotate(0deg) scale(1);
    }
    25% { 
    transform: translate(6px, 6px) rotate(20deg) scale(1.3);
    }
    50% { 
    transform: translate(0px, 0px) rotate(0deg) scale(1);
    }
    75% { 
    transform: translate(6px, 6px) rotate(-20deg) scale(1.3);
    }
    100% { 
    transform: translate(0px, 0px) rotate(0deg) scale(1);
    }
`;

export const littleBounceAnimation = keyframes`
    0% { 
    transform: translate(0px, 0px) rotate(0deg) scale(1);
    }
    25% { 
    transform: translate(2px, 2px) rotate(5deg) scale(1.1);
    }
    50% { 
    transform: translate(0px, 0px) rotate(0deg) scale(1);
    }
    75% { 
    transform: translate(2px, 2px) rotate(-5deg) scale(1.1);
    }
    100% { 
    transform: translate(0px, 0px) rotate(0deg) scale(1);
    }
`;
  
export const hitAnimation = keyframes`
    0% { 
    transform: translate(1.5px, 1.5px) rotate(3deg) scale(1.03); 
    filter: brightness(1.3); 
    }
    50% { 
    transform: translate(-1.5px, -1.5px) rotate(-3deg) scale(1); 
    filter: brightness(0.7); 
    }
    100% { 
    transform: translate(0px, 0px) rotate(0deg) scale(1.03); 
    filter: brightness(1.3); 
    }
`;

export const journeyHitAnimation = keyframes`
    0% { 
    transform: translate(0, 0) scale(1); 
    filter: brightness(1); 
    }
    20% { 
    transform: translate(-3px, 2px) scale(0.95); 
    filter: brightness(1.5); 
    }
    40% { 
    transform: translate(3px, -2px) scale(1.05); 
    filter: brightness(0.6); 
    }
    60% { 
    transform: translate(-2px, 0) scale(0.97); 
    filter: brightness(1.2); 
    }
    80% { 
    transform: translate(1px, 1px) scale(1.02); 
    filter: brightness(0.8); 
    }
    100% { 
    transform: translate(0, 0) scale(1); 
    filter: brightness(1); 
    }
`;
  
export const shakeAnimation = keyframes`
    0% { transform: translate(1px, 1px) rotate(6deg); opacity: 0.1 }
    10% { transform: translate(10px, 10px) rotate(12deg); opacity: 0.4 }
    20% { transform: translate(-10px, -10px) rotate(6deg); opacity: 0.7 }
    30% { transform: translate(5px, 5px) rotate(0deg); }
    40% { transform: translate(-5px, -5px) rotate(-6deg); }
    50% { transform: translate(10px, 1px) rotate(-12deg); }
    60% { transform: translate(1px, 10px) rotate(-6deg); opacity: 0.1 }
    70% { transform: translate(-5px, 5px) rotate(0deg); opacity: 0.4 }
    80% { transform: translate(5px, -5px) rotate(6deg); opacity: 0.7 }
    90% { transform: translate(-1px, -1px) rotate(12deg); }
    100% { transform: translate(0px, 0px) rotate(6deg); }
`;

export const missAnimation = keyframes`
    0% { 
    opacity: 1; 
    transform: translate(0, 0); 
    }
    50% { 
    opacity: 0.2; 
    transform: translate(20px, 0); 
    }
    100% { 
    opacity: 1; 
    transform: translate(0, 0); 
    }
`;

export const textAnimation = keyframes`
    0% { 
    opacity: 1; 
    transform: translateY(0); 
    }
    100% { 
    opacity: 0; 
    transform: translateY(-30px); 
    }
`;

export const lungeRightAnimation = keyframes`
    0% { transform: translateX(0); }
    40% { transform: translateX(10px); }
    100% { transform: translateX(0); }
`;

export const lungeLeftAnimation = keyframes`
    0% { transform: translateX(0); }
    40% { transform: translateX(-10px); }
    100% { transform: translateX(0); }
`;

export const projectileRightAnimation = keyframes`
    0% { transform: translateX(0) scale(0.5); opacity: 0; }
    10% { transform: translateX(15px) scale(1); opacity: 1; }
    70% { transform: translateX(200px) scale(1.1); opacity: 1; }
    100% { transform: translateX(280px) scale(0.6); opacity: 0; }
`;

export const projectileLeftAnimation = keyframes`
    0% { transform: translateX(0) scale(0.5) scaleX(-1); opacity: 0; }
    10% { transform: translateX(-15px) scale(1) scaleX(-1); opacity: 1; }
    70% { transform: translateX(-200px) scale(1.1) scaleX(-1); opacity: 1; }
    100% { transform: translateX(-280px) scale(0.6) scaleX(-1); opacity: 0; }
`;

export const journeyCritHitAnimation = keyframes`
    0% { transform: translate(0, 0) scale(1); filter: brightness(1); }
    15% { transform: translate(-5px, 3px) scale(0.9); filter: brightness(2); }
    30% { transform: translate(5px, -3px) scale(1.1); filter: brightness(0.4); }
    45% { transform: translate(-4px, 2px) scale(0.92); filter: brightness(1.8); }
    60% { transform: translate(4px, -1px) scale(1.08); filter: brightness(0.5); }
    75% { transform: translate(-2px, 1px) scale(0.95); filter: brightness(1.4); }
    100% { transform: translate(0, 0) scale(1); filter: brightness(1); }
`;

export const journeyDefAnimation = keyframes`
    0% { transform: translate(0, 0) scale(1); filter: brightness(1); }
    30% { transform: translate(-2px, 0) scale(0.97); filter: brightness(0.8); }
    60% { transform: translate(1px, 0) scale(1); filter: brightness(1.1); }
    100% { transform: translate(0, 0) scale(1); filter: brightness(1); }
`;

export const critHitAnimation = keyframes`
    0% { transform: translate(2px, 2px) rotate(4deg) scale(1.05); filter: brightness(1.5); }
    25% { transform: translate(-3px, -2px) rotate(-4deg) scale(0.95); filter: brightness(0.5); }
    50% { transform: translate(3px, 1px) rotate(3deg) scale(1.08); filter: brightness(1.6); }
    75% { transform: translate(-2px, -1px) rotate(-2deg) scale(0.97); filter: brightness(0.6); }
    100% { transform: translate(0, 0) rotate(0deg) scale(1.03); filter: brightness(1.3); }
`;

export const defAnimation = keyframes`
    0% { transform: translate(0, 0) scale(1); filter: brightness(1); }
    30% { transform: translate(-1px, 0) scale(0.98); filter: brightness(0.8); }
    60% { transform: translate(1px, 0) scale(1); filter: brightness(1.1); }
    100% { transform: translate(0, 0) scale(1); filter: brightness(1); }
`;

export const healAnimation = keyframes`
    0% {
    filter: brightness(1);
    box-shadow: 0 0 0px rgba(72, 187, 120, 0);
    }
    30% {
    filter: brightness(1.4);
    box-shadow: 0 0 12px rgba(72, 187, 120, 0.7);
    }
    60% {
    filter: brightness(1.2);
    box-shadow: 0 0 20px rgba(72, 187, 120, 0.5);
    }
    100% {
    filter: brightness(1);
    box-shadow: 0 0 0px rgba(72, 187, 120, 0);
    }
`;

export const slideOutLeft = keyframes`
    0% { transform: translateX(0); opacity: 1; }
    100% { transform: translateX(-120px); opacity: 0; }
`;

export const slideOutRight = keyframes`
    0% { transform: translateX(0); opacity: 1; }
    100% { transform: translateX(120px); opacity: 0; }
`;

export const slideInLeft = keyframes`
    0% { transform: translateX(-120px); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
`;

export const slideInRight = keyframes`
    0% { transform: translateX(120px); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
`;

export const glowAnimation = (
    starterGlowColor = 'rgba(174, 0, 255, 0.7)',
    GlowColorOne = 'rgba(111, 0, 255, 0.86)',
    GlowColorTwo = 'rgba(255, 0, 255, 0.7)',
    GlowColorThree = 'rgba(162, 0, 255, 0.7)',
) => keyframes`
    0% {
        box-shadow: 
            15px 0 var(--glow-size) ${starterGlowColor},
            -5px 0 var(--glow-size) ${starterGlowColor};
    }
    25% {
        box-shadow: 
            0 15px calc(var(--glow-size) * 0.8) ${GlowColorOne},
            0 -5px calc(var(--glow-size) * 0.8) ${GlowColorOne};
    }
    50% {
        box-shadow: 
            -15px 0 calc(var(--glow-size) * 1.2) ${GlowColorTwo},
            5px 0 calc(var(--glow-size) * 1.2) ${GlowColorTwo};
    }
    75% {
        box-shadow: 
            0 -15px calc(var(--glow-size) * 0.8) ${GlowColorThree},
            0 5px calc(var(--glow-size) * 0.8) ${GlowColorThree};
    }
    100% {
        box-shadow: 
            15px 0 var(--glow-size) ${starterGlowColor},
            -5px 0 var(--glow-size) ${starterGlowColor};
    }
`;

export const shinyShimmerAnimation = keyframes`
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
`;

export const shinySparkleAnimation = keyframes`
    0%   { transform: translate(0, 0) scale(0.6); opacity: 0.2; }
    25%  { transform: translate(3px, -6px) scale(1); opacity: 1; }
    50%  { transform: translate(6px, -2px) scale(0.8); opacity: 0.6; }
    75%  { transform: translate(2px, -8px) scale(1.1); opacity: 1; }
    100% { transform: translate(0, 0) scale(0.6); opacity: 0.2; }
`;

export const shinyGlowAnimation = keyframes`
    0%, 100% { box-shadow: 0 0 4px 1px rgba(255, 215, 0, 0.25); }
    50%      { box-shadow: 0 0 10px 3px rgba(255, 215, 0, 0.5); }
`;

export const pulseAnimation = (color, shiny = false) => keyframes`
    0% {
        transform: scale(0.99);
        box-shadow: 0 0 0 0 ${shiny ? 'white' : color};
    }

    70% {
        transform: scale(1);
        box-shadow: 0 0 0 ${shiny ? '35px' : '15px'} rgba(0, 0, 0, 0);
    }

    100% {
        transform: scale(0.99);
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
`;
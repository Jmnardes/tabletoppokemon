import { keyframes } from "@emotion/react";

export const hitAnimation = keyframes`
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
` + ' 0.5s ease-in-out 1s'

export const floatingAnimation = keyframes`
    0% { transform: scale(0.96) rotate(0); }
    10% { transform: scale(0.98) rotate(12deg); }
    20% { transform: scale(1) rotate(-12deg); }
    20% { transform: scale(0.98) rotate(0); }
    50% { transform: scale(0.96) rotate(7deg); }
    70% { transform: scale(0.94) rotate(-7deg); }
    100% { transform: scale(0.94) rotate(0); }
`;

export const shakingAnimation = keyframes`
    0% { transform: translate(1px, 1px) rotate(0deg); }
    10% { transform: translate(-1px, -2px) rotate(-1deg); }
    20% { transform: translate(-3px, 0px) rotate(1deg); }
    30% { transform: translate(3px, 2px) rotate(0deg); }
    40% { transform: translate(1px, -1px) rotate(1deg); }
    50% { transform: translate(-1px, 2px) rotate(-1deg); }
    60% { transform: translate(-3px, 1px) rotate(0deg); }
    70% { transform: translate(3px, 1px) rotate(-1deg); }
    80% { transform: translate(-1px, -1px) rotate(1deg); }
    90% { transform: translate(1px, 2px) rotate(0deg); }
    100% { transform: translate(1px, -2px) rotate(-1deg); }
`;

export const fullRotationAnimation = keyframes`
    0% { transform: rotate(360deg) }
    100% { transform: rotate(0deg) }
`

export const pulseAnimation = keyframes`
    0% {
        transform: scale(0.99);
        box-shadow: 0 0 0 0 'white';
    }

    70% {
        transform: scale(1);
        box-shadow: 0 0 0 '6px' rgba(0, 0, 0, 0);
    }

    100% {
        transform: scale(0.99);
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }`

// DICE ANIMATIONS
export const diceShakeAnimation = keyframes`
    0% { transform: rotate(0deg) }
    5% { transform: rotate(-15deg) }
    10% { transform: rotate(0deg) }
    15% { transform: rotate(15deg) }
    20% { transform: rotate(0deg) }
    35% { transform: rotate(0deg) }
    40% { transform: rotate(-15deg) }
    45% { transform: rotate(0deg) }
    50% { transform: rotate(15deg) }
    55% { transform: rotate(0deg) }
` + ' 0.8s ease-in-out infinite'

export const diceRollAnimation = keyframes`
    0% { transform: translateY(0) }
    100% { transform: translateY(-50px) }
` + ' 0.4s cubic-bezier(0, 0.6, 0.4, 1) 0s 1, '
+ keyframes`
    0% { transform: translateY(-50px) }
    100% { transform: translateY(0) }
` + ' 0.4s cubic-bezier(0.6, 0, 1, 0.4) 0.4s 1'

export const diceSpinAnimation = keyframes`
    0% { transform: rotate(0deg) }
    100% { transform: rotate(360deg) }
` + ' 0.3s linear 0s infinite'

export const textShowAnimation = keyframes`
    0% {
        transform: translateY(-1rem);
        opacity: 0.3;
    }
    100% {
        transform: translateY(-2rem);
    }
` + ' 0.2s ease-out 0s 1 normal forwards'
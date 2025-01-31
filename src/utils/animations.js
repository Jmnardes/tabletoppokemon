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
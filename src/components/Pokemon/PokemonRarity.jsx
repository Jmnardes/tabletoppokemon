import { FaStar } from "react-icons/fa";

export function PokeRarity ({ rarity }) {
    const renderStars = () => {
        const stars = [];
        
        for (let i = 0; i < rarity; i++) {
        stars.push(<FaStar key={i} size={12} />);
        }
    
        return stars;
    };
    
    return renderStars();
};
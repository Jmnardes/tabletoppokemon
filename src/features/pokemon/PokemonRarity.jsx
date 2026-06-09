import { Flex } from "@chakra-ui/react";
import { Star } from 'lucide-react'

export function PokeRarity ({ rarity }) {
    const renderStars = () => {
        const stars = [];
        
        for (let i = 0; i < 3; i++) {
            if (i < rarity) {
                stars.push(<Star key={i} size={14} fill="#facc15" color="#facc15" />);
            } else {
                stars.push(<Star key={i} size={14} color="#facc15" />);
            }
        }
    
        return stars;
    };
    
    return (
        <Flex>
            {renderStars()}
        </Flex>
    );
};
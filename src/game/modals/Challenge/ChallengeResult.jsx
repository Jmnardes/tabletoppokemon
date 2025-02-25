import { Center, Divider, Text } from "@chakra-ui/react";
import PrizeIcon from "@components/PrizeIcon/PrizeIcon"

import FirstPlaceIcon from "@components/Icons/places/FirstPlaceIcon"
import SecondPlaceIcon from "@components/Icons/places/SecondPlaceIcon"
import ThirdPlaceIcon from "@components/Icons/places/ThirdPlaceIcon"

export default function ChallengeResult({ won, place, prizes }) {
    const Placing = ({ place }) => {
        if (place === 0)  return <FirstPlaceIcon h={16} w={16} />
        if (place === 1) return <SecondPlaceIcon h={16} w={16} />
        if (place === 2) return <ThirdPlaceIcon h={16} w={16} />
    }

    return (
        <Center>
            {
                won ? (
                    <Center flexDirection="column">
                        <Placing place={place} />
                        
                        <Text my={4} fontSize="2xl" fontWeight="bold" color="green.400">
                            You won 
                        </Text>
                            
                        <Divider my={2} mb={4} />
    
                        <Center>
                            {prizes[place].amount}x
                            <PrizeIcon type={prizes[place].name} size={8}/>
                        </Center>
                    </Center>
                ): (
                    <Center flexDirection="column">
                        <Text my={4} fontSize="2xl" fontWeight="bold" color="red.400">You lose</Text>
                    </Center>
                )
            }
        </Center>
    )
}
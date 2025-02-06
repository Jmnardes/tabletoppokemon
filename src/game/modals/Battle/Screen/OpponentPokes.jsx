import { Tooltip, Image, Box, Text, Center } from "@chakra-ui/react"

import { stringToUpperCase, typeColor } from "@utils"
import PrizeIcon from "@components/PrizeIcon/PrizeIcon"
import Types from "@components/Elements/Types"

export default function OpponentPoke({ opponent, prizes }) {
    const prize = prizes[2]

    const PokemonTooltip = ({ poke }) => {
        return (
            <Types types={poke.types} w={6} h={6} />
        )
    }

    return (
        <>
            {opponent && 
                <Center position={"absolute"} top={2} left={2}>
                    <Center flexDir={"column"} mx={4}>
                        <Text fontStyle={"italic"} color={"red.400"} my={1}>VS.</Text>
                        <Text my={1}>{opponent.status.trainerName}</Text>
                    </Center>
                    <Box display={"flex"} position={"absolute"} ml={5} top={0} left={0}>
                        <Text mt={2} fontSize={"sm"}>Prize: {prize.amount}</Text>
                        <PrizeIcon type={prize.name} size={6} />
                    </Box>
                    {opponent.pokeTeam.map(poke => {
                        return <Box
                            key={poke.id}
                            mt={12} mx={2} h={20} w={20} borderRadius={8}
                            alignItems="center" flexDirection="column"
                            border={`2px solid ${typeColor(poke.types)}`}
                        >
                            <Tooltip label={<PokemonTooltip poke={poke} />} background="none">
                                <Image
                                    position="absolute" h={20}
                                    title={stringToUpperCase(poke.name)} 
                                    src={poke.sprites.front}
                                />
                            </Tooltip>
                        </Box>
                    })}
                </Center>
            }
        </>
    )
}
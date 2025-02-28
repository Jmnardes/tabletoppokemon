import { Box, Button, Center, Image, Text, Tooltip } from "@chakra-ui/react"
import Card from "@components/Pokemon/Card"

import bagIcon from "@assets/images/game/bag.png"
import ballIcon from "@assets/images/pokeballs/pokeball.png"
import daycareIcon from "@assets/images/game/heart_ball.png"

export default function NewPokemon({
    capturedPokemon, 
    handleFinishCapture, 
    pokeTeam, 
    selectedToRemove, 
    setSelectedToRemove, 
    isTeamFull
 }) {
    const ButtonComponent = ({ label, icon, selectedToRemove, daycare, disable = false }) => {
        return (
            <Tooltip label={label} p={4} borderRadius={6}>
                <Button 
                    h={16} 
                    isDisabled={disable} 
                    onClick={() => handleFinishCapture({ removedId: selectedToRemove, dayCare: daycare, starterTeam: false })}
                >
                    <Image
                        h={12} w={12}
                        src={icon}
                    />
                </Button>
            </Tooltip>
        )
    }

    return (
        <>
            <Card poke={capturedPokemon} isCaptured />

            <Center gap={4}>
                <ButtonComponent
                    label={"Add to Poke Team"}
                    icon={ballIcon}
                    selectedToRemove={selectedToRemove}
                    daycare={false}
                    disable={!selectedToRemove && isTeamFull}
                ></ButtonComponent>
                <ButtonComponent
                    label={"Add to Poke Bag"}
                    icon={bagIcon}
                    selectedToRemove={null}
                    daycare={false}
                    disable={!isTeamFull}
                ></ButtonComponent>
                <ButtonComponent
                    label={"Leave on Daycare"}
                    icon={daycareIcon}
                    selectedToRemove={null}
                    daycare={true}
                    disable={!isTeamFull}
                ></ButtonComponent>
            </Center>

            {isTeamFull && (
                <>
                    <Center flex flexDir={"column"}>
                        <Text mt={4}>To use directly on your team you must select another</Text>
                        <Text fontSize={"xx-small"}>The selected pokemon goes to your bag</Text>
                    </Center>

                    <Center flex flexDir={"row"} gap={4} mt={4}>
                        {pokeTeam?.map((poke) => {
                            return (
                                <Box
                                    key={poke.id}
                                    cursor={"pointer"}
                                    _hover={{ opacity: 1 }}
                                    opacity={selectedToRemove === poke.id ? 1 : 0.4}
                                    boxShadow={selectedToRemove === poke.id ? "0 0 10px 6px rgba(255, 255, 255, 0.7)" : "none"}
                                    borderRadius={8}
                                    onClick={() => setSelectedToRemove(poke.id)}
                                >
                                    <Card
                                        poke={poke}
                                        pokeTeam={pokeTeam}
                                        isCaptured
                                    />
                                </Box>
                            )
                        })}
                    </Center>
                </>
            )}
        </>
    )
}
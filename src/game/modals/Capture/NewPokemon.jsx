import { Box, Button, Center, Image, Text, Tooltip } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import Card from "@features/pokemon/Card"

import bagIcon from "@assets/images/game/bag.png"
import ballIcon from "@assets/images/pokeballs/pokeball.png"

export default function NewPokemon({
    capturedPokemon, 
    handleFinishCapture, 
    teamPokemons, 
    pokeTeam,
    selectedToRemove, 
    setSelectedToRemove, 
    isTeamFull
 }) {
    // Aceita tanto teamPokemons (novo) quanto pokeTeam (antigo)
    const team = teamPokemons || pokeTeam
    const { t } = useTranslation()
    const ButtonComponent = ({ label, icon, selectedToRemove, disable = false }) => {
        return (
            <Tooltip label={label} p={4} borderRadius={6}>
                <Button 
                    h={16} 
                    isDisabled={disable} 
                    onClick={() => handleFinishCapture({ removedId: selectedToRemove, starterTeam: false })}
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
            <Card poke={capturedPokemon} size="M" />

            <Center gap={4}>
                <ButtonComponent
                    label={t('encounter.addToTeam')}
                    icon={ballIcon}
                    selectedToRemove={selectedToRemove}
                    daycare={false}
                    disable={!selectedToRemove && isTeamFull}
                ></ButtonComponent>
                <ButtonComponent
                    label={t('encounter.addToBag')}
                    icon={bagIcon}
                    selectedToRemove={null}
                    daycare={false}
                    disable={!isTeamFull}
                ></ButtonComponent>
            </Center>

            {isTeamFull && (
                <>
                    <Center flex flexDir={"column"}>
                        <Text mt={4}>{t('encounter.selectToReplace')}</Text>
                        <Text fontSize={"xx-small"}>{t('encounter.selectedGoesToBag')}</Text>
                    </Center>

                    <Center flexDir="row" gap={3} mt={4} flexWrap="wrap" maxW="650px" justifyContent="center">
                        {team?.map((poke) => {
                            return (
                                <Box
                                    key={poke.id}
                                    cursor={"pointer"}
                                    _hover={{ opacity: 1 }}
                                    opacity={selectedToRemove === poke.id ? 1 : 0.4}
                                    boxShadow={selectedToRemove === poke.id ? "0 0 10px 6px rgba(255, 255, 255, 0.7)" : "none"}
                                    borderRadius={8}
                                    onClick={() => setSelectedToRemove(poke.id)}
                                    w="30%"
                                >
                                    <Card
                                        poke={poke}
                                        size="M"
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
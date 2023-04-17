import { Center, Flex, Image, Text } from "@chakra-ui/react";
import swordIcon from '../../../assets/images/stats/sword.png'
import shieldIcon from '../../../assets/images/stats/shield.png'
import speedIcon from '../../../assets/images/stats/speed.png'
import healthIcon from '../../../assets/images/stats/health.png'
import { useContext } from "react";
import PlayerContext from "../../../Contexts/PlayerContext";
import accuracyIcon from '../../../assets/images/stats/accuracy.svg'
import criticalIcon from '../../../assets/images/stats/critical.svg'

export default function TeamTitle() {
    const { pokeTeam } = useContext(PlayerContext)

    const sumPokeStat = (stat) => {
        return pokeTeam?.reduce((acc, poke) => acc += poke.stats[stat], 0)
    }

    return (
        <Center flexDirection="row" justifyContent="end">
            <Center alignItems="center">
                <Flex mx={2} justifyContent="center" alignItems="center">
                    <Image
                        mr={2}
                        src={healthIcon} 
                        title={'Health'}
                        w="28px"
                    ></Image>
                    <Text ml={-1} fontSize="xl">{sumPokeStat('hp')}</Text>
                </Flex>
                <Flex mx={2} justifyContent="center" alignItems="center">
                    <Image
                        mr={2}
                        src={swordIcon} 
                        title={'Attack'}
                        w="24px"
                    ></Image>
                    <Text ml={-1} fontSize="xl">{sumPokeStat('atk')}</Text>
                </Flex>
                <Flex mx={2} justifyContent="center" alignItems="center">
                    <Image
                        mr={2}
                        src={shieldIcon} 
                        title={'Defense'}
                        w="24px"
                    ></Image>
                    <Text ml={-1} fontSize="xl">{sumPokeStat('def')}</Text>
                </Flex>
                <Flex mx={2} justifyContent="center" alignItems="center">
                    <Image
                        mr={2}
                        src={speedIcon} 
                        title={'Evasion'}
                        w="24px"
                    ></Image>
                    <Text ml={-1} fontSize="xl">{sumPokeStat('evs')}</Text>
                </Flex>
                <Flex mx={2} justifyContent="center" alignItems="center">
                    <Image
                        mr={2}
                        src={accuracyIcon} 
                        title={'Accuracy'}
                        w="24px"
                    ></Image>
                    <Text ml={-1} fontSize="xl">{sumPokeStat('acc')}</Text>
                </Flex>
                <Flex mx={2} justifyContent="center" alignItems="center">
                    <Image
                        mr={2}
                        src={criticalIcon} 
                        title={'Critical'}
                        w="24px"
                    ></Image>
                    <Text ml={-1} fontSize="xl">{sumPokeStat('crt')}</Text>
                </Flex>
            </Center>
        </Center>
    )
}
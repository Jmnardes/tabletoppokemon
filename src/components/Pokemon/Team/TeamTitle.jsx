import { Center, Image, Kbd, Text } from "@chakra-ui/react";
import swordIcon from '../../../assets/images/stats/sword.png'
import shieldIcon from '../../../assets/images/stats/shield.png'
import speedIcon from '../../../assets/images/stats/speed.png'
import healthIcon from '../../../assets/images/stats/health.png'
import accuracyIcon from '../../../assets/images/stats/accuracy.svg'
import criticalIcon from '../../../assets/images/stats/critical.svg'

export default function TeamTitle({ pokeTeam }) {
    const sumPokeStat = (stat) => {
        return pokeTeam?.reduce((acc, poke) => acc += poke.stats[stat], 0)
    }

    return (
        <Kbd display="flex" flexDir="row" mt={6} py={2}>
            <Center mx={4}>
                <Image
                    src={healthIcon} 
                    title={'Health'}
                    w="32px"
                ></Image>
                <Text fontSize="2xl">{sumPokeStat('hp')}</Text>
            </Center>
            <Center mx={4}>
                <Image
                    mr={2}
                    src={swordIcon} 
                    title={'Attack'}
                    w="32px"
                ></Image>
                <Text fontSize="2xl">{sumPokeStat('atk')}</Text>
            </Center>
            <Center mx={4}>
                <Image
                    mr={2}
                    src={shieldIcon} 
                    title={'Defense'}
                    w="32px"
                ></Image>
                <Text fontSize="2xl">{sumPokeStat('def')}</Text>
            </Center>
            <Center mx={4}>
                <Image
                    mr={2}
                    src={speedIcon} 
                    title={'Evasion'}
                    w="32px"
                ></Image>
                <Text fontSize="2xl">{sumPokeStat('evs')}</Text>
            </Center>
            <Center mx={4}>
                <Image
                    mr={2}
                    src={accuracyIcon} 
                    title={'Accuracy'}
                    w="32px"
                ></Image>
                <Text fontSize="2xl">{sumPokeStat('acc')}</Text>
            </Center>
            <Center mx={4}>
                <Image
                    mr={2}
                    src={criticalIcon} 
                    title={'Critical'}
                    w="32px"
                ></Image>
                <Text fontSize="2xl">{sumPokeStat('crt')}</Text>
            </Center>
        </Kbd>
    )
}
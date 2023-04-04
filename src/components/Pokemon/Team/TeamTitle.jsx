import { Center, Flex, Image, Text } from "@chakra-ui/react";
import swordIcon from '../../../assets/images/stats/sword.png'
import shieldIcon from '../../../assets/images/stats/shield.png'
import speedIcon from '../../../assets/images/stats/speed.png'
import healthIcon from '../../../assets/images/stats/health.png'

export default function TeamTitle({ handleTeamStats }) {
    return (
        <Center flexDirection="row" justifyContent="end">
            <Center alignItems="center">
                <Flex mx={2} justifyContent="center" alignItems="center">
                    <Image
                        mr={2}
                        src={healthIcon} 
                        title={'Health'}
                        w="32px"
                    ></Image>
                    <Text ml={-1} fontSize="xl">{handleTeamStats('hp')}</Text>
                </Flex>
                <Flex mx={2} justifyContent="center" alignItems="center">
                    <Image
                        mr={2}
                        src={swordIcon} 
                        title={'Attack'}
                        w="28px"
                    ></Image>
                    <Text ml={-1} fontSize="xl">{handleTeamStats('atk')}</Text>
                    {/* <Text ml={-1} fontSize="2xl">{statMedium(handleTeamStats('atk'))}</Text> */}
                </Flex>
                <Flex mx={2} justifyContent="center" alignItems="center">
                    <Image
                        mr={2}
                        src={shieldIcon} 
                        title={'Defense'}
                        w="28px"
                    ></Image>
                    <Text ml={-1} fontSize="xl">{handleTeamStats('def')}</Text>
                    {/* <Text ml={-1} fontSize="2xl">{statMedium(handleTeamStats('def'))}</Text> */}
                </Flex>
                <Flex mx={2} justifyContent="center" alignItems="center">
                    <Image
                        mr={2}
                        src={speedIcon} 
                        title={'Speed'}
                        w="28px"
                    ></Image>
                    <Text ml={-1} fontSize="xl">{handleTeamStats('spd')}</Text>
                </Flex>
            </Center>
            
            {/* <PokeLife total={handleTeamStats('hp')} buttonSize={"xs"} lifeSize={"2xl"} iconSize={"12px"} title={true}/> */}
        </Center>
    )
}
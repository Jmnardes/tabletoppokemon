import { Center, Flex, Image, useColorMode } from "@chakra-ui/react"
import PokeballStats from '../Trainer/PokeballStats'
import backpackIcon from '../../../assets/images/game/bag.png'
import TeamTitle from "../Team/TeamTitle"

export default function Items({ handleTeamStats }) {
    const { colorMode } = useColorMode()

    return (
        <>
            <Flex justifyContent="center" pt={2} alignItems="center" width="100%" bg={colorMode === 'light' ? "#A0AEC0" : "#2D3748"}>
                <Center flexDirection="row">
                    <TeamTitle handleTeamStats={handleTeamStats} />

                    <Image
                        src={backpackIcon} 
                        title={'Backpack'}
                        mx={6}
                        w="28px"
                    ></Image>

                    <PokeballStats />
                </Center>
            </Flex>
        </>
    )
}
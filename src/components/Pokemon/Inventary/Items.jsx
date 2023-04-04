import { Center, Flex, Image, useColorMode } from "@chakra-ui/react"
import PokeballStats from '../Trainer/PokeballStats'
import backpackIcon from '../../../assets/images/game/bag.png'

export default function Items({ children }) {
    const { colorMode } = useColorMode()

    return (
        <>
            <Flex justifyContent="center" pt={2} alignItems="center" width="100%" bg={colorMode === 'light' ? "#A0AEC0" : "#2D3748"}>
                <Center flexDirection="row">
                    {children}
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
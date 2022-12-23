import { Center, Flex, Grid, GridItem, Image, useColorMode } from "@chakra-ui/react"
import backpackIcon from '../../../assets/images/game/bag.png'

export default function Items({ children }) {
    const { colorMode } = useColorMode()

    return (
        <>
            <Flex justifyContent="center" alignItems="center" width="100%" bg={colorMode === 'light' ? "#A0AEC0" : "#2D3748"} py={3}>
                <Grid templateColumns='repeat(5, 1fr)' width="100%" h={12}>
                    <GridItem>
                        <Center h="100%">
                            <Image
                                src={backpackIcon} 
                                title={'Backpack'}
                                w="40px"
                            ></Image>
                        </Center>
                    </GridItem>

                    <GridItem colSpan={3}>
                        <Center h="100%">
                            {children}
                        </Center>
                    </GridItem>

                    <GridItem>
                        <Center h="100%">
                            <Image
                                src={backpackIcon} 
                                title={'Backpack'}
                                w="40px"
                            ></Image>
                        </Center>
                    </GridItem>
                </Grid>
            </Flex>
        </>
    )
}
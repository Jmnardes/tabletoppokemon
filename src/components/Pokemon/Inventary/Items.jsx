import { Center, Flex, Grid, GridItem, Image, useColorMode } from "@chakra-ui/react"
import backpackIcon from '../../../assets/images/game/bag.png'

export default function Items({ children }) {
    const { colorMode } = useColorMode()

    return (
        <>
            <Flex justifyContent="center" alignItems="center" width="100%" mt={4}>
                <Grid templateColumns='repeat(5, 1fr)' width="100%" h={16}>
                    <GridItem></GridItem>

                    <GridItem colSpan={3} bg={colorMode === 'light' ? "#A0AEC0" : "#2D3748"} borderRadius="64px 64px 0 0" py={4}>
                        <Grid templateColumns='repeat(5, 1fr)' width="100%" h={16}>
                            <GridItem><Center>
                                <Image
                                    src={backpackIcon} 
                                    title={'Backpack'}
                                    w="32px"
                                ></Image>
                            </Center></GridItem>

                            <GridItem colSpan={3}>
                                <Center flexDirection="row">
                                    {children}
                                </Center>
                            </GridItem>
                            
                            <GridItem><Center>
                                <Image
                                    src={backpackIcon} 
                                    title={'Backpack'}
                                    w="32px"
                                ></Image>
                            </Center></GridItem>
                        </Grid>
                    </GridItem>

                    <GridItem></GridItem>
                </Grid>
            </Flex>
        </>
    )
}
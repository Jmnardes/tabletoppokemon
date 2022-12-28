import { Center, Grid, GridItem, useColorMode } from "@chakra-ui/react";

import Element from "./Element";

export default function ElementsList() {
    const { colorMode } = useColorMode()

    return (
            <Grid templateColumns='repeat(5, 1fr)' width="100%" h={12}>
                <GridItem></GridItem>

                <GridItem colSpan={3} background={colorMode === 'light' ? "gray.400" : "gray.700"} py={4} borderRadius="0 0 64px 64px">
                    <Center flexDirection="row">
                        <Element element={"bug"} />
                        <Element element={"dark"} />
                        <Element element={"dragon"} />
                        <Element element={"electric"} />
                        <Element element={"fairy"} />
                        <Element element={"fighting"} />
                        <Element element={"fire"} />
                        <Element element={"flying"} />
                        <Element element={"ghost"} />
                        <Element element={"grass"} />
                        <Element element={"ground"} />
                        <Element element={"ice"} />
                        <Element element={"normal"} />
                        <Element element={"psychic"} />
                        <Element element={"poison"} />
                        <Element element={"rock"} />
                        <Element element={"steel"} />
                        <Element element={"water"} />
                    </Center>
                </GridItem>

                <GridItem></GridItem>
            </Grid>
    )
}



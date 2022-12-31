import { Center, Grid, GridItem, useColorMode } from "@chakra-ui/react";

import Element from "./Element";

export default function ElementsList() {
    const { colorMode } = useColorMode()

    return (
            <Grid templateColumns='repeat(5, 1fr)' width="100%" h={12}>
                <GridItem></GridItem>

                <GridItem colSpan={3} background={colorMode === 'light' ? "gray.400" : "gray.700"} py={2} borderRadius="0 0 32px 32px">
                    <Center flexDirection="row">
                        <Element element={"bug"} elementTable={true} />
                        <Element element={"dark"} elementTable={true} />
                        <Element element={"dragon"} elementTable={true} />
                        <Element element={"electric"} elementTable={true} />
                        <Element element={"fairy"} elementTable={true} />
                        <Element element={"fighting"} elementTable={true} />
                        <Element element={"fire"} elementTable={true} />
                        <Element element={"flying"} elementTable={true} />
                        <Element element={"ghost"} elementTable={true} />
                        <Element element={"grass"} elementTable={true} />
                        <Element element={"ground"} elementTable={true} />
                        <Element element={"ice"} elementTable={true} />
                        <Element element={"normal"} elementTable={true} />
                        <Element element={"psychic"} elementTable={true} />
                        <Element element={"poison"} elementTable={true} />
                        <Element element={"rock"} elementTable={true} />
                        <Element element={"steel"} elementTable={true} />
                        <Element element={"water"} elementTable={true} />
                    </Center>
                </GridItem>

                <GridItem></GridItem>
            </Grid>
    )
}



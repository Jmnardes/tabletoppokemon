import { Center } from "@chakra-ui/react";

import Element from "./Element";

export default function ElementsList() {
    return (
        <Center flexDirection="row" py={2}>
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
    )
}



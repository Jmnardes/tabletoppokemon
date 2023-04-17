import { Button, Flex, Text } from "@chakra-ui/react";
import PokeTeam from "../Trainer/PokeTeam";
import ElementsList from "./ElementsList";
import { FaArrowRight } from "react-icons/fa";

export default function TeamContainer({ finishTurn }) {
    return (
        <Flex flex="1" flexDir="column">
            <ElementsList />
            <PokeTeam />
            <Button w="100%" borderRadius={"none"} h={16} onClick={finishTurn}>
                <Text mb={1} mr={8} fontSize="2xl" fontWeight="bold">Finish turn</Text>
                <FaArrowRight size="24px"/>
            </Button>
        </Flex>
    )
}
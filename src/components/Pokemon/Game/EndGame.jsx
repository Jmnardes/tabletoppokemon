import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import PokeModal from "../Modal/Modal";
import { GiCheckeredFlag } from "react-icons/gi";
import { TrainerBar } from "../Trainer/TrainerBar";

export default function EndGame({ children, medal, trophy, setTrophy, coins }) {

    return (
        <PokeModal title={'End Game'} button={<GiCheckeredFlag size="22px"/>}>
            <Flex justifyContent="center" alignItems="center" flexDirection="column" p={4}>
                <Heading mb={12}>Congratulations, you did it!</Heading>

                <Text fontSize="2xl" textAlign="center">If you have the highest stat in one of these, you gain a trophy</Text>

                <Flex flexDirection="row" mt={12}>
                    {children}
                </Flex>

                <Flex mt={12} flexDirection="column" justifyContent="center" alignItems="center">
                    <Text mb={4}>Total Score:</Text>
                    <TrainerBar
                        medal={medal}
                        trophy={trophy}
                        isEndgame={true}
                        coin={coins}
                    />
                </Flex>

                <Button mt={6} onClick={() => setTrophy(trophy + 1)}>Poke Crown</Button>
            </Flex>
        </PokeModal>
    )
}
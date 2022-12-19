import { Flex, Text } from "@chakra-ui/react";
import PokeModal from "../Modal/Modal";
import { FaGift } from "react-icons/fa";

export default function PokeShop() {
    return (
        <PokeModal title={'Shop'} button={<FaGift size="22px"/>}>
            <Flex flexDirection="column" alignItems="center">
                <Text>
                    1 Great Ball (5 coins)
                </Text>
                <Text>
                    1 Super Ball (10 coins)
                </Text>
                <Text>
                    1 Ultra Ball (15 coins)
                </Text>
                <Text>
                    1 Medal (20 coins)
                </Text>
                <Text>
                    1 Trophy (30 coins)
                </Text>
            </Flex>
        </PokeModal>
    )
}
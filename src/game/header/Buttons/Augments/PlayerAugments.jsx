import { useContext } from "react";
import { Badge, Center, Flex, Image, Text, Wrap } from "@chakra-ui/react";

import ButtonModal from "@components/Modal/ButtonModal";
import PlayerContext from "@Contexts/PlayerContext";
import AugmentData from "../../../modals/Augments/AugmentData";

import chipIcon from '@assets/images/game/chip.png'

export default function PlayerAugments() {
    const { player } = useContext(PlayerContext)

    const AugmentContainer = ({ augment }) => {
        return (
            <Flex 
                direction={"column"} 
                backgroundColor={"gray.600"} 
                borderRadius={8} 
                p={1} gap={4} w={60} my={2}
            >
                <Badge p={2} borderRadius={8} textAlign={"center"}>
                    {augment.name}
                </Badge>
                <Center h={"100%"} flex flexDir={"column"} justifyContent={"space-around"} gap={8}>
                    <Text fontSize={"small"} textAlign={"center"}>
                        {augment.description}
                    </Text>
                    <AugmentData augment={augment} />
                </Center>
            </Flex>
        );
    }

    return (
        <ButtonModal title={'Player augments'} size={'xl'} button={
            <Image
                src={chipIcon}
                title={'Player augments'}
                w="28px"
                overflow={"hidden"}
            ></Image>
        }>
            <Center flexDirection="column" p={4}>
                {player.augments.length > 0 ? (
                    <Wrap gap={4} justify={"center"} my={4}>
                        {player.augments?.map((augment, index) => (
                            <AugmentContainer key={index} augment={augment} />
                        ))}
                    </Wrap>
                ) : (
                    <Text fontSize="2xs">No augments yet</Text>
                )}
            </Center>
        </ButtonModal>
    )
}
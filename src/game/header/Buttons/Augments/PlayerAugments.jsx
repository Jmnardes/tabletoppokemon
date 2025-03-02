import { useContext } from "react";
import { Center, Image, Wrap } from "@chakra-ui/react";

import ButtonModal from "@components/Modal/ButtonModal";
import PlayerContext from "@Contexts/PlayerContext";

import chipIcon from '@assets/images/game/chip.png'
import AugmentContainer from "@components/Augments/AugmentContainer";

export default function PlayerAugments() {
    const { player } = useContext(PlayerContext)

    return (
        <ButtonModal title={'Augments'} size={'xl'} disableButton={player.augments?.length === 0} button={
            <Image
                src={chipIcon}
                title={'Augments'}
                w="28px"
                overflow={"hidden"}
            ></Image>
        }>
            <Center flexDirection="column" p={4}>
                <Wrap gap={4} justify={"center"} my={4}>
                    {player.augments?.map((augment, index) => (
                        <AugmentContainer key={index} augment={augment} />
                    ))}
                </Wrap>
            </Center>
        </ButtonModal>
    )
}
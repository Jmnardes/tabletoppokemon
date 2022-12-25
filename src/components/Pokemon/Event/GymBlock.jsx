import { Image } from "@chakra-ui/react";
import PokeModal from "../Modal/Modal";
import event2Icon from '../../../assets/images/game/event2.png'

export default function GymBlock({ disable }) {
    return (
        <PokeModal title={'Gym'} button={
            <Image
                src={event2Icon}
                title={'Gym'}
                w="24px"
            ></Image>
        } disableButton={disable}>

        </PokeModal>
    )
}
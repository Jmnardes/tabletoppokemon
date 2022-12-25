import { Image } from "@chakra-ui/react";
import PokeModal from "../Modal/Modal";
import stealIcon from '../../../assets/images/items/steal.png'

export default function StealBlock({ disable }) {
    return (
        <PokeModal title={'Team Rocket Pass'} button={
            <Image
                src={stealIcon}
                title={'Team Rocket Pass'}
                w="24px"
            ></Image>
        } disableButton={disable}>

        </PokeModal>
    )
}
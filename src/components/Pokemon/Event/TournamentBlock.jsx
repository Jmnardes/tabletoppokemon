import { Image } from "@chakra-ui/react";
import PokeModal from "../Modal/Modal";
import event3Icon from '../../../assets/images/game/event3.png'

export default function TournamentBlock({ disable }) {
    return (
        <PokeModal title={'Tournament'} button={
            <Image
                src={event3Icon}
                title={'Tournament'}
                w="24px"
            ></Image>
        } disableButton={disable}>

        </PokeModal>
    )
}
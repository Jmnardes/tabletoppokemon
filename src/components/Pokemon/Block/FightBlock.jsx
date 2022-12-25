import { Image } from "@chakra-ui/react";
import PokeModal from "../Modal/Modal";
import fightIcon from '../../../assets/images/items/fight.png'

export default function FightBlock({ disable }) {
    return (
        <PokeModal title={'Fight Glove'} button={
            <Image
                src={fightIcon}
                title={'Fight Glove'}
                w="24px"
            ></Image>
        } disableButton={disable}>

        </PokeModal>
    )
}
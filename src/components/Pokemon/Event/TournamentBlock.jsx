import { Center, Heading, Image, Text } from "@chakra-ui/react";
import PokeModal from "../Modal/Modal";
import event3Icon from '../../../assets/images/game/event3.png'
import { diceRoll } from "../../../util";

export default function TournamentBlock({ disable }) {
    return (
        <PokeModal title={'Tournament'} button={
            <Image
                src={event3Icon}
                title={'Tournament'}
                w="24px"
            ></Image>
        } disableButton={disable}>
            <Center flexDirection="column">
                <Heading mb={12}>Pokemon Tournament</Heading>
                <Text mb={8} fontSize="2xl" textAlign="center">You can choose 5 pokemons to your team, you will use three in battle</Text>
                <Text fontWeight="bold" fontSize="2xl" mb={2}>The winner gets a Trophy</Text>
                <Text fontWeight="bold" fontSize="2xl" mb={2}>The second gets a Medal</Text>
                <Text fontWeight="bold" fontSize="2xl" mb={2}>The thir gets {diceRoll(11) + 5} coins</Text>
            </Center>
        </PokeModal>
    )
}
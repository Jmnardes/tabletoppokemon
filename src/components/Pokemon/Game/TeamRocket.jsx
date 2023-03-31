import { Image, Text } from "@chakra-ui/react";
import PokeModal from "../Modal/Modal";
import { FaSkull } from "react-icons/fa";

export function TeamRocket({ title }) {
    return (
        <PokeModal title={'Team Rocket'} button={<FaSkull size="20px"/>}>
            <Image
                src="https://c.tenor.com/x23TdFVIGW4AAAAC/team-rocket-pokemon.gif" 
                alt={title}
                m="4px auto"
                height="16rem"
                objectFit='cover'
                borderRadius={8}
                mb={2}
            />
            <Text fontWeight="bold">Roll d20:</Text>
            <Text m={1}>1: They steal a pokemon from your team.</Text>
            <Text m={1}>2-4: They steal a random treasure from you(if you don't have, 2 items then).</Text>
            <Text m={1}>5-10: They steal a random item from you.</Text>
            <Text m={1}>11-19: You escape.</Text>
            <Text m={1}>20: You earn a treasure.</Text>
        </PokeModal>
    )
}
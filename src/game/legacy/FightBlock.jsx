// import { Button, Center, Heading, Image, Text } from "@chakra-ui/react";
// import PokeModal from "../Modal/Modal";
// import fightIcon from '@assets/images/items/fight.png'

// export default function FightBlock({ disable, fight, setFight }) {
//     return (
//         <PokeModal title={'Fight Glove'} button={
//             <Image
//                 src={fightIcon}
//                 title={'Fight Glove'}
//                 w="24px"
//             ></Image>
//         } disableButton={disable}>
//             <Center flexDirection="column">
//                 <Heading mt={8}>Choose someone to Battle!</Heading>

//                 <Text mt={12} fontSize="2xl" textAlign="center">
//                     You are free to choose whatever you want to Gamble in this battle, if you don't wanna choose, the minimum gamble is 10 coins
//                 </Text>

//                 <Text mt={12} fontSize="1xl" textAlign="center">
//                     The rules are simple, you choose 5 pokemons to battle, roll a d20, the lowest choose the first pokemon, just three pokemons are used in battle
//                 </Text>

//                 <Button mt={12} w={40} isDisabled={fight === 0} onClick={() => setFight(fight - 1)}>Use Glove</Button>
//             </Center>
//         </PokeModal>
//     )
// }
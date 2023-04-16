// import { Center, Heading, Image, Text } from "@chakra-ui/react";
// import PokeModal from "../Modal/Modal";
// import event1Icon from '../../../assets/images/game/event1.png'
// import { useEffect, useState } from "react";
// import { rollEventType } from "./events";

// export default function EventBlock({ disable }) {
//     const [event, setEvent] = useState([])

//     const handleEvent = () => {
//         setEvent(rollEventType())
//     }

//     const EventComponent = ({ title, description, rules, first, second, third }) => {
//         return (
//             <Center flexDirection="column">
//                 <Heading mb={8}>{title}</Heading>
//                 <Text m={4} fontSize="2xl" textAlign="center">{description}</Text>
//                 <Text mt={8} fontSize="1xl" color="red" fontWeight="bold">{rules}</Text>
//                 <Center mt={12} flexDirection="column">
//                     <Center mb={6}>
//                         <Text mr={4} fontSize="2xl" fontWeight="bold">1st</Text>
//                         <Text>{first}</Text>
//                     </Center>
//                     <Center mb={6}>
//                         <Text mr={4} fontSize="2xl" fontWeight="bold">2nd</Text>
//                         <Text>{second}</Text>
//                     </Center>
//                     <Center mb={6}>
//                         <Text mr={4} fontSize="2xl" fontWeight="bold">3nd</Text>
//                         <Text>{third}</Text>
//                     </Center>
//                 </Center>
//                 <Text mt={4} color="red" fontSize="xs">Use tier sum or tier of participant pokemon to break ties</Text>
//             </Center>
//         )
//     }

//     useEffect(() => {
//         !disable && handleEvent()
//     }, [disable])

//     return (
//         <PokeModal title={'Event'} button={
//             <Image
//                 src={event1Icon}
//                 title={'Event'}
//                 w="24px"
//             ></Image>
//         } disableButton={disable}>
//             <Center>
//                 <EventComponent 
//                     title={event?.title}
//                     description={event?.description}
//                     rules={event?.rules}
//                     first={event?.first}
//                     second={event?.second}
//                     third={event?.third}
//                 />
//             </Center>
//         </PokeModal>
//     )
// }
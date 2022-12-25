import { Center, Heading, Image } from "@chakra-ui/react";
import PokeModal from "../Modal/Modal";
import event1Icon from '../../../assets/images/game/event1.png'

export default function EventBlock({ disable }) {
    const handleEvent = () => {

    }

    // const EventComponent = ({ title }) => {
    //     return (
    //         <Center>
    //             <Heading>{title}</Heading>
    //         <Center/>
    //     )
    // }

    return (
        <PokeModal title={'Event'} button={
            <Image
                src={event1Icon}
                title={'Event'}
                w="24px"
            ></Image>
        } disableButton={disable}>
            {/* <EventComponent /> */}
        </PokeModal>
    )
}



/*
    return ({type:'event', title:'Marathon', label:'The winner gets a Medal, the second 5 coins', rules:'Roll a d20 and sum all team speeds'})
    return ({type:'event', title:'Arm werstler', label:'The winner gets 5 coins', rules:'Roll a d6 and sum the highest attack'})
    return ({type:'event', title:'Tug of war', label:'The winner gets a Medal, the second 5 coins', rules:'Roll a d20 and sum all team attacks'})
    return ({type:'event', title:'Slap contest', label:'The winner gets 5 coins', rules:'Roll a d6 and sum the highest life'})
    return ({type:'event', title:'Resistance test', label:'The winner gets a Medal, the second 5 coins', rules:'Roll a d20 and sum all team lifes'})
    return ({type:'event', title:'Block contest', label:'The winner gets 5 coins', rules:'Roll a d6 and sum the highest defense'})
    return ({type:'event', title:'Dodge ball', label:'The winner gets a Medal, the second 5 coins', rules:'Roll a d20 and sum all team defenses'})
*/
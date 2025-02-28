import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { useContext } from "react"
import PlayerContext from "@Contexts/PlayerContext"

export default function OpponentsResult({ myRoll, myBonus, opponentsRoll }) {
    const { opponents, player } = useContext(PlayerContext)

    const OpponentRow = ({opponent}) => {
        const oppResult = opponentResults(opponent)
        return (
            <Tr>
                <Td p={4}>{opponent.status.trainerName}</Td>
                <Td p={4} textAlign={"center"}>{oppResult[0].roll}</Td>
                <Td p={4} textAlign={"center"}>+{oppResult[0].bonus}</Td>
                <Td p={4} textAlign={"center"}>{oppResult[0].total}</Td>
            </Tr>
        )
    }

    const opponentResults = (opponent) => {
        return opponentsRoll.map(roll => {
            if(roll.id === opponent.id) {
                return { roll: roll.roll, bonus: roll.bonus, total: (roll.roll + roll.bonus) }
            }
        })
    }

    return (
        <TableContainer bg={"gray.650"} p={4} borderRadius={6}>
            <Table variant='simple' mb={4}>
                <Thead>
                    <Tr>
                        <Th p={4} fontSize={"2md"}>Player</Th>
                        <Th p={4} fontSize={"2md"}>Roll</Th>
                        <Th p={4} fontSize={"2md"}>Bonus</Th>
                        <Th p={4} fontSize={"2md"}>Total</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td p={4} color={"yellow.400"}>{player.status.trainerName}</Td>
                        <Td p={4} color={"yellow.400"} textAlign={"center"}>{myRoll ? myRoll : null}</Td>
                        <Td p={4} color={"yellow.400"} textAlign={"center"}>+{myRoll ? myBonus : null}</Td>
                        <Td p={4} color={"yellow.400"} textAlign={"center"}>{myRoll ? (myRoll + myBonus) : null}</Td>
                    </Tr>
                </Tbody>
                <Tbody>
                    {
                        opponents.map(opponent => {
                            return <OpponentRow key={opponent.id} opponent={opponent} />
                        })
                    }
                </Tbody>
            </Table>
        </TableContainer>
    )
}
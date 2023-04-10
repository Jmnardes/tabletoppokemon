import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { useContext } from "react"
import PlayerContext from "../../../../Contexts/PlayerContext"

export default function OpponentsResult({ opponentsRoll }) {
    const { opponents } = useContext(PlayerContext)

    const OpponentRow = ({opponent}) => {
        return (
            <Tr>
                <Td pt={1} pb={2}>{opponent.status.trainerName}</Td>
                <Td pt={1} pb={2}>{opponentRollMatch(opponent)}</Td>
            </Tr>
        )
    }

    const opponentRollMatch = (opponent) => {
        return opponentsRoll.map(roll => {
            if(roll.id === opponent.id) {
                return roll.roll
            }
        })
    }

    return (
        <TableContainer>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th pt={0} pb={2}>Player</Th>
                        <Th pt={0} pb={2}>Result</Th>
                    </Tr>
                </Thead>
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
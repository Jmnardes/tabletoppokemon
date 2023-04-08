import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { useContext } from "react"
import PlayerContext from "../../../../Contexts/PlayerContext"

export default function OpponentsResult() {
    const { opponents } = useContext(PlayerContext)

    const OpponentRow = ({opponent}) => {
        return (
            <Tr key={opponent.id}>
                <Td pt={1} pb={2}>{opponent.status.trainerName}</Td>
                <Td pt={1} pb={2}>{opponent.status.level}</Td>
                <Td pt={1} pb={2}>{opponent.result ? '?' : opponent.result}</Td>
            </Tr>
        )
    }

    return (
        <TableContainer>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th pt={0} pb={2}>Player</Th>
                        <Th pt={0} pb={2}>Bonus</Th>
                        <Th pt={0} pb={2}>Result</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        opponents.map(opponent => {
                            return <OpponentRow opponent={opponent} />
                        })
                    }
                </Tbody>
            </Table>
        </TableContainer>
    )
}
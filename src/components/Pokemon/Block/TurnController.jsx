import { Button, Flex } from "@chakra-ui/react";
import {  useState } from "react";
import { diceRoll } from "../../../util";
import BlockController from "./BlockController";
import { blockType } from "./blockFunctions";

export default function TurnController({ setIsPokemonEncounter, setWalkedBlocks, walkedBlocks }) {
    const [block, setBlock] = useState('')
    const [rollBlockDisabed, setRollBlockDisabed] = useState(false)

    function handleBlockRoll() {
        setBlock(blockType())
        setRollBlockDisabed(true)
        setWalkedBlocks(() => walkedBlocks + diceRoll(4) + 1)
    }

    return (
        <Flex justifyContent="center" alignItems="center">
            <Flex flexDirection="column" w="100%">
                {rollBlockDisabed ? (
                    <Button mt={4} onClick={() => setIsPokemonEncounter(true)}>Go to encounter!</Button>
                ) : (
                    <Button mt={4} onClick={handleBlockRoll} disabled={rollBlockDisabed}>Go for a walk!</Button>
                )}

                <BlockController block={block} />
            </Flex>
        </Flex>
    )
}
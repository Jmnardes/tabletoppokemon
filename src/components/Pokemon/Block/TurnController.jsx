import { Button, Flex } from "@chakra-ui/react";
import {  useState } from "react";
import { diceRoll } from "../../../util";
import BlockController from "./BlockController";
import { blockType } from "./blockFunctions";

export default function TurnController({ setIsPokemonEncounter, setWalkedBlocks, walkedBlocks, setDisableShop, rollBlockDisabed, setRollBlockDisabed }) {
    const [block, setBlock] = useState([])

    function handleBlockRoll() {
        setBlock(blockType())
        setRollBlockDisabed(true)
        setWalkedBlocks(() => walkedBlocks + diceRoll(4) + 1)
    }

    return (
        <Flex justifyContent="center" alignItems="center">
            <Flex flexDirection="column" w="100%">
                <Flex mt={4} w="100%">
                    <Button w="100%" mx={2} onClick={handleBlockRoll} disabled={rollBlockDisabed}>Go for a walk!</Button>
                    <Button 
                        w="100%" 
                        mx={2} 
                        onClick={() => {
                            setIsPokemonEncounter(true)
                            setRollBlockDisabed(false)
                        }} 
                        disabled={block.length === 0}
                    >Go to encounter!</Button>
                </Flex>

                <BlockController block={block} setDisableShop={setDisableShop} />
            </Flex>
        </Flex>
    )
}
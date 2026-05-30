import { Flex } from "@chakra-ui/react";
import ActionPanel from "./ActionPanel/ActionPanel";
import TeamContainer from "./Team/TeamContainer";
import RightPanel from "./RightPanel/RightPanel";

export default function GameContent() {
    return (
        <Flex flex="1">
            <ActionPanel />
            <TeamContainer />
            <RightPanel />
        </Flex>
    )
}
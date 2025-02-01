import { Flex } from "@chakra-ui/react";
import TeamContainer from "./Team/TeamContainer";
import LeftPanel from "./LeftPanel/LeftPanel";
import RightPanel from "./RightPanel/RightPanel";

export default function GameContent() {
    return (
        <Flex flex="1">
            <LeftPanel />
            <TeamContainer />
            <RightPanel />
        </Flex>
    )
}
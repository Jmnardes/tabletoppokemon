import { useState } from "react";
import { Center, useColorMode, IconButton } from "@chakra-ui/react";
import TaskBoard from "./TaskBoard/TaskBoard";
import Chat from "./Chat/Chat";

import { FaChevronDown } from "react-icons/fa";

export default function LeftPanel() {
    const { colorMode } = useColorMode();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <Center
            padding="1rem"
            gap="1rem"
            flexDir={"column"}
            justifyContent={"space-between"}
            backgroundColor={colorMode === 'light' ? "gray.400" : "gray.700"}
            position="relative"
            transition="transform 0.3s ease-in-out"
            transform={isCollapsed ? "translateX(-80%)" : "translateX(0)"}
            minW={isCollapsed ? "" : 72}
        >
            <IconButton
                title={isCollapsed ? "Show left panel" : "Hide left panel"}
                aria-label={isCollapsed ? "Expand" : "Collapse"}
                h={"full"}
                icon={
                    <FaChevronDown
                        size={12}
                        style={{
                            transform: isCollapsed ? "rotate(-90deg)" : "rotate(90deg)",
                            transition: "transform 0.3s ease-in-out",
                        }}
                    />
                }
                onClick={toggleCollapse}
                position="absolute"
                right={isCollapsed ? "-2rem" : "-2.5rem"}
                top="50%"
                transform="translateY(-50%)"
                zIndex={isCollapsed ? 1 : -1}
                opacity={isCollapsed ? 1 : 0.2}
                _hover={{
                    opacity: 1,
                }}
                transition="all 0.3s ease-in-out"
            />
            {!isCollapsed && (
                <>
                    <TaskBoard />
                    <Chat />
                </>
            )}
        </Center>
    );
}
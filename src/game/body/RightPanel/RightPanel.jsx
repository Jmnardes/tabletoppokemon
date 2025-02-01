import { useState } from "react";
import { Center, useColorMode, IconButton } from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";
import Opponents from "../Opponents/Opponents";

export default function RightPanel() {
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
            transform={isCollapsed ? "translateX(0)" : "translateX(0)"}
        >
            <IconButton
                title={isCollapsed ? "Show right panel" : "Hide right panel"}
                aria-label={isCollapsed ? "Expand" : "Collapse"}
                h={"full"}
                icon={
                    <FaChevronDown
                        size={12}
                        style={{
                            transform: isCollapsed ? "rotate(90deg)" : "rotate(-90deg)",
                            transition: "transform 0.3s ease-in-out",
                        }}
                    />
                }
                onClick={toggleCollapse}
                position="absolute"
                left={isCollapsed ? "-0.5rem" : "-2.5rem"}
                top="50%"
                transform="translateY(-50%)"
                zIndex={1}
                opacity={isCollapsed ? 1 : 0.2}
                _hover={{
                    opacity: 1,
                }}
                transition="all 0.3s ease-in-out"
            />
            {!isCollapsed && (
                <>
                    <Opponents />
                </>
            )}
        </Center>
    );
}
import { useContext } from "react";
import { Badge, Center, Divider, Flex, Image, Text, Tooltip, useColorMode } from "@chakra-ui/react";
import PlayerContext from "@Contexts/PlayerContext";

import { FaRegCircle, FaCheckCircle } from "react-icons/fa";
import starIcon from '@assets/images/game/star.png'
import { Divide } from "phosphor-react";

export default function TaskBoard() {
    const { tasks, session } = useContext(PlayerContext)
    const { colorMode } = useColorMode()

    const bgColor = colorMode === 'light' ? "gray.200" : "gray.650"

    function getTurnsLeft(turn) {
        return (turn % 10 === 0) ? 1 : 11 - (turn % 10);
    }

    const TaskContainer = ({ task }) => {
        let taskTypeColor
        switch (task.type) {
            case "easy":
                taskTypeColor = "green.500";
                break;
            case "medium":
                taskTypeColor = "yellow.500";
                break;
            case "hard":
                taskTypeColor = "red.600";
                break;
            default:
                taskTypeColor = "gray.500";
        }

        return (
            <Flex py={3} w="full"  direction="column">
                <Center>
                    <Divider ml={4} backgroundColor={taskTypeColor} /> 
                    <Badge px={4} pt={1} mb={2} borderRadius={8} fontSize={"xx-small"} backgroundColor={taskTypeColor} textAlign={"center"}>{task.type}</Badge>
                    <Divider mr={4} backgroundColor={taskTypeColor} />
                </Center>
                <Center justifyContent={"space-between"} w={"full"} gap={4}>
                    <Flex direction="column" gap={1} w={"full"}>
                        <Tooltip label={task.description} p={4} textAlign={"center"}>
                            <Text fontSize={"x-small"}>
                                - {task.name}
                            </Text>
                        </Tooltip>
                        <Flex justifyContent={"space-between"}>
                            <Text mt={1} fontSize={"xx-small"}>Progress: {
                                task.condition.status.current}/{task.condition.status.final
                            }</Text>
                            <Flex>
                                <Text 
                                    mt={1} 
                                    fontSize={"xx-small"}
                                >{task.rank}</Text>
                                <Image
                                    ml={2}
                                    src={starIcon}
                                    title={'Ranking Points'}
                                    w={4}
                                ></Image>
                            </Flex>
                        </Flex>
                    </Flex>
                    {task.condition.status.current === task.condition.status.final ? (
                        <FaCheckCircle size={20} color={bgColor} />
                    ) : (
                        <FaRegCircle size={20} color={bgColor} />
                    )}
                </Center>
            </Flex>
        );
    };

    return (
        <Flex
            h={"full"} w={"full"}
            backgroundColor={bgColor}
            borderRadius={8}
            direction="column"
            justifyContent={"space-between"}
        >
            <Badge textAlign={"center"} w={"full"} py={4}>
                Tasks
            </Badge>
            <Center flexDir={"column"} px={4} w="full">
                {tasks?.map((task, index) => (
                    <TaskContainer key={index} task={task} />
                ))}
            </Center>
            <Badge mt={3} py={1} fontSize={"x-small"} textAlign={"center"}>{getTurnsLeft(session.turns)} turn(s) left</Badge>
        </Flex>
    );
}
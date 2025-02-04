import { useContext } from "react";
import { Center, Divider, Flex, Image, Text, Tooltip } from "@chakra-ui/react";
import PlayerContext from "@Contexts/PlayerContext";

import { FaRegCircle, FaCheckCircle } from "react-icons/fa";
import starIcon from '@assets/images/game/star.png'

export default function TaskBoard() {
    const { tasks } = useContext(PlayerContext)

    const TaskContainer = ({ task }) => {
        return (
            <Flex
                py={4} w="full"  direction="column" 
                borderBottom="1px solid"
                borderColor="gray.500"
            >
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
                        <FaCheckCircle color="green" />
                    ) : (
                        <FaRegCircle color="green" />
                    )}
                </Center>
            </Flex>
        );
    };

    return (
        <Flex
            h={"full"} w={"full"}
            backgroundColor={"gray.600"}
            borderRadius={8}
            direction="column"
        >
            <Text textAlign={"center"} w={"full"} py={4}>
                Tasks
            </Text>
            <Divider />
            <Center flexDir={"column"} p={4} w="full">
                {tasks?.map((task, index) => (
                    <TaskContainer key={index} task={task} />
                ))}
            </Center>
        </Flex>
    );
}
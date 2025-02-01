import { Center, Divider, Flex, Image, Text, Tooltip } from "@chakra-ui/react";

import { FaRegCircle, FaCheckCircle } from "react-icons/fa";
import starIcon from '@assets/images/game/star.png'

export default function TaskBoard() {
    const tasks = [
        {
            name: 'Catch a pokemon',
            description: 'You must catch a pokemon',
            rank: 10,
            difficulty: 'easy',
            done: true
        },
        {
            name: 'Win 3 battles',
            description: 'You must win three battles against players',
            rank: 30,
            difficulty: 'medium',
            done: false
        }
    ]

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
                        <Flex justifyContent={"center"}>
                            <Text ml={4} mt={1} fontSize={"xx-small"}>{task.rank}</Text>
                            <Image
                                ml={2}
                                src={starIcon}
                                title={'Ranking Points'}
                                w={4}
                            ></Image>
                        </Flex>
                    </Flex>
                    {task.done ? (
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
                {tasks &&
                    tasks.map((task) => (
                        <TaskContainer key={task.id} task={task} />
                    ))}
            </Center>
        </Flex>
    );
}
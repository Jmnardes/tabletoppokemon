import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    ModalBody,
    CloseButton,
    Center,
    Flex,
    Badge,
    Image,
} from "@chakra-ui/react"
import { useContext } from "react"
import PlayerContext from "@Contexts/PlayerContext"

import starIcon from '@assets/images/game/star.png'

export default function NewTasksModal() {
    const { updateGame, tasks } = useContext(PlayerContext)

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
            <Flex p={4} w="full"  direction="column">
                <Center gap={4}>
                    <Badge px={4} pt={1} mb={2} title={task.type} borderRadius={8} backgroundColor={taskTypeColor} textAlign={"center"}>
                        {task.name}
                    </Badge>
                </Center>
                <Center justifyContent={"space-between"} w={"full"} backgroundColor={"gray.600"} borderRadius={8} p={4}>
                    <Flex direction="column" gap={2} w={"full"}>
                        <Text textAlign={"center"} my={2}>
                            {task.description}
                        </Text>
                        <Flex justifyContent={"center"} gap={12}>
                            <Text mt={1}>Progress: {
                                task.condition.status.current}/{task.condition.status.final
                            }</Text>
                            <Flex>
                                <Text 
                                    mt={1}
                                >Reward: {task.rank}</Text>
                                <Image
                                    ml={2}
                                    src={starIcon}
                                    title={'Ranking Points'}
                                    w={6}
                                ></Image>
                            </Flex>
                        </Flex>
                    </Flex>
                </Center>
            </Flex>
        );
    };

    return (
        <>
            <Modal isOpen size="6xl" isCentered>
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(2px) hue-rotate(0deg)'
                />
                <ModalContent>
                    <ModalHeader fontSize="3xl" textAlign="center">
                        <Center justifyContent="space-between">
                            <Flex />
                            <Text ml={8}>New Tasks</Text>
                            <CloseButton onClick={() => updateGame({ openNewTasksModal: false })} />
                        </Center>
                    </ModalHeader>
                    
                    <ModalBody>
                        {tasks?.map((task, index) => (
                            <TaskContainer key={index} task={task} />
                        ))}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
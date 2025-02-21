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
} from "@chakra-ui/react"
import { useContext } from "react"
import PlayerContext from "@Contexts/PlayerContext"

export default function AugmentsModal({ augments }) {
    const { updateGame, event } = useContext(PlayerContext)

    const AugmentContainer = ({ augment }) => {
        return (
            <Center flex flexDir={"column"} backgroundColor={"gray.600"} borderRadius={8} p={4} gap={4}>
                <Badge p={2} borderRadius={8} textAlign={"center"}>
                    {augment.name}
                </Badge>
                <Text textAlign={"center"}>
                    {augment.description}
                </Text>
            </Center>
        );
    };

    const updateModals = () => {
        updateGame({ openAugmentsModal: false })
        switch (event.type) {
            case 'challenge':
                updateGame({ openChallengeModal: true })
                break
            case 'walk':
                updateGame({ openWalkModal: true })
                break
            case 'battle':
                updateGame({ openBattleModal: true })
                break
            default:
                break
        }
    }

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
                            <Text ml={8}>Choose a new Augment</Text>
                            <CloseButton onClick={updateModals} />
                        </Center>
                    </ModalHeader>
                    
                    <ModalBody>
                        <Flex direction={"row"} justifyContent={"space-between"}>
                            {augments?.map((augment, index) => (
                                <AugmentContainer key={index} augment={augment} />
                            ))}
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
import { useContext } from "react"
import { Button, Image } from "@chakra-ui/react"
import PlayerContext from "@Contexts/PlayerContext"

import crownIcon from '@assets/images/game/crown.png'

export default function BadgeCollection() {
    const { updateGame } = useContext(PlayerContext)

    const handleClick = () => {
        updateGame({ openBadgeCollectionModal: true })
    }

    return (
        <Button
            mx={1}
            onClick={handleClick}
            cursor="pointer"
            position="relative"
        >
            <Image
                src={crownIcon}
                title="Badge Collection"
                w="28px"
            />
        </Button>
    )
}

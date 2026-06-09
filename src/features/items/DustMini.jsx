import { Center, Image, Text } from "@chakra-ui/react"
import dustIcon from '@assets/images/items/dust.png'

export default function DustMini({ dusts, absolute=true }) {
    return (
        <>
            {dusts > 0 && (
                <Center flex flexDir={absolute ? "column" : "row"}>
                    {absolute ? (
                        <Text bottom={2} ml={4} position={"absolute"} fontSize={"xx-small"}>
                            {dusts}x
                        </Text>
                    ): (
                        <Text fontSize={"xx-small"}>
                            {dusts}x
                        </Text>
                    )}
                    <Image
                        title={"Dusts"}
                        src={dustIcon}
                        w={4}
                    />
                </Center>
            )}
        </>
    )
}
import { Flex, Image, Text, Box } from "@chakra-ui/react"
import { stringToUpperCase, typeColor } from '@utils'
import Types from "@components/Elements/Types"
import { useEffect, useState } from "react"

export default function ChallengePokemonCard({ poke }) {
    const [colorByType, setColorByType] = useState('#000000')

    useEffect(() => {
        let color = typeColor(poke.types)
        setColorByType(color)
    }, [poke])

    return (
        <Flex
            alignItems="center" 
            flexDirection="column"
            border={`2px solid ${colorByType}`}
            borderRadius={8}
            p={2}
            backgroundColor="gray.700"
            shadow="md"
            w="80px"
            h="110px"
            position="relative"
        >
            {/* Level badge */}
            <Flex
                h={6}
                w={6}
                top="-8px"
                left="-8px"
                position="absolute"
                borderRadius="50%"
                alignItems="center"
                justifyContent="center"
                fontWeight="bold"
                fontSize="xs"
                backgroundColor={colorByType}
                color="white"
            >
                {poke.level}
            </Flex>

            {/* Pokemon name */}
            <Text 
                fontSize="xs" 
                fontWeight="bold" 
                noOfLines={1}
                w="100%"
                textAlign="center"
                mb={1}
            >
                {stringToUpperCase(poke.name)}
            </Text>

            {/* Pokemon sprite */}
            <Image
                w={12}
                h={12}
                objectFit="contain"
                title={stringToUpperCase(poke.name)} 
                src={poke.sprites.main}
                mb={1}
            />

            {/* Types */}
            <Box mt="auto">
                <Types types={poke.types} w={5} h={5} />
            </Box>
        </Flex>
    )
}

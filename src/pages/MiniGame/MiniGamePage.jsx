import { useState } from "react"
import { Button, Flex, Heading, Image, Text, useColorMode } from "@chakra-ui/react"
import { FaArrowLeft } from "react-icons/fa"

import pokeballIcon from "@assets/images/pokeballs/pokeball.png"
import ThrowCatchGame from "./ThrowCatchGame"

export default function MiniGamePage({ setMiniGame }) {
  const { colorMode } = useColorMode()
  const [playing, setPlaying] = useState(false)

  const bgColor = colorMode === "light" ? "gray.400" : "gray.700"

  return (
    <Flex direction="column" align="center" h="full" w="full">
      <Flex w="full" p={4}>
        <Button h={12} onClick={() => playing ? setPlaying(false) : setMiniGame(false)}>
          <FaArrowLeft size="16px" />
        </Button>
      </Flex>

      <Flex
        direction="column"
        align="center"
        justify="center"
        flex={1}
        w="full"
        maxW="600px"
      >
        {!playing ? (
          <>
            <Heading size="lg" mb={8}>Mini Games</Heading>
            <Flex
              direction="column"
              align="center"
              background={bgColor}
              borderRadius={8}
              p={8}
              gap={4}
              minW="320px"
            >
              <Button
                w="100%"
                h={16}
                onClick={() => setPlaying(true)}
                leftIcon={<Image src={pokeballIcon} w={5} h={5} />}
              >
                <Text>Catch</Text>
              </Button>
            </Flex>
          </>
        ) : (
          <>
            <Heading size="md" mb={4}>Catch</Heading>
            <ThrowCatchGame onFinish={(result) => console.log("Catch result:", result)} />
          </>
        )}
      </Flex>
    </Flex>
  )
}

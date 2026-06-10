import { useState } from "react"
import { Button, Flex, Heading, Image, Text, useColorMode } from "@chakra-ui/react"
import { FaArrowLeft } from "react-icons/fa"

import pokeballIcon from "@assets/images/pokeballs/pokeball.png"
import ThrowGame from "./ThrowGame"

export default function MiniGamePage({ setMiniGame }) {
  const { colorMode } = useColorMode()
  const [selectedGame, setSelectedGame] = useState(null)

  const bgColor = colorMode === "light" ? "gray.400" : "gray.700"

  const handleFinish = (bonus) => {
    console.log("Throw result bonus:", bonus)
  }

  return (
    <Flex direction="column" align="center" h="full" w="full">
      <Flex w="full" p={4}>
        <Button h={12} onClick={() => selectedGame ? setSelectedGame(null) : setMiniGame(false)}>
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
        {!selectedGame ? (
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
                onClick={() => setSelectedGame("throw")}
                leftIcon={<Image src={pokeballIcon} w={5} h={5} />}
              >
                <Text>Throw</Text>
              </Button>
            </Flex>
          </>
        ) : (
          <>
            <Heading size="md" mb={4}>Throw</Heading>
            <ThrowGame onFinish={handleFinish} />
          </>
        )}
      </Flex>
    </Flex>
  )
}

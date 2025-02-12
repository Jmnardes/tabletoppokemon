import { Box, Center, Flex, Image, Kbd, Progress, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import BattleLog from "./BattleLog";
import { battleLogMessage, colorByHitType } from "@utils/battle";
import { stringToUpperCase } from "@utils";
import { winAnimation, hitAnimation, missAnimation, textAnimation, littleBounceAnimation } from "@utils/animations";

export default function BattleScreen({
    pokemon,
    opponent,
    battleLog,
    turnWinner,
    battleEnded,
    setBattleEnded
  }) {
    const [myHp, setMyHp] = useState(0);
    const [opponentHp, setOpponentHp] = useState(0);
    const [selfHitAnimation, setSelfHitAnimation] = useState("");
    const [opponentHitAnimation, setOpponentHitAnimation] = useState("");
    const [damageTextAnimation, setDamageTextAnimation] = useState("");
    const [currentLogIndex, setCurrentLogIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [logMessages, setLogMessages] = useState([]);
    const turnsInMilisecondsDuration = 800;
    const animationInSecondsDuration = 0.5;
    
    const handleSelfHitAnimation = () => {
      setSelfHitAnimation(`${hitAnimation} ${animationInSecondsDuration}s ease-in-out`);
      handleDamageTextAnimation();
    };
  
    const handleOpponentHitAnimation = () => {
      setOpponentHitAnimation(`${hitAnimation} ${animationInSecondsDuration}s ease-in-out`);
      handleDamageTextAnimation();
    };
  
    const handleSelfMissAnimation = () => {
      setSelfHitAnimation(`${missAnimation} ${animationInSecondsDuration}s ease-in-out`);
      handleDamageTextAnimation();
    };
  
    const handleOpponentMissAnimation = () => {
      setOpponentHitAnimation(`${missAnimation} ${animationInSecondsDuration}s ease-in-out`);
      handleDamageTextAnimation();
    };

    const handleDamageTextAnimation = () => {
      setDamageTextAnimation(`${textAnimation} ${animationInSecondsDuration}s ease-in-out`);
    }
  
    useEffect(() => {
      let timer;

      if (pokemon && opponent && !isPlaying) {
        handleStart()
      }
  
      if (isPlaying && currentLogIndex < battleLog.length) {
        const currentLog = battleLog[currentLogIndex];

        if (currentLog.damage > 0) {
          if (currentLog.defender.id === pokemon?.id) {
            setMyHp((prevHp) => prevHp - currentLog.damage);
          } else {
            setOpponentHp((prevHp) => prevHp - currentLog.damage);
          }
  
          if (currentLog.attacker.id === pokemon?.id) {
            handleOpponentHitAnimation();
          } else {
            handleSelfHitAnimation();
          }
        } else {
          if (currentLog.attacker.id === pokemon?.id) {
            handleOpponentMissAnimation();
          } else {
            handleSelfMissAnimation();
          }
        }
  
        setLogMessages((prevMessages) => [
          ...prevMessages,
          {
            myPoke: currentLog.attacker.id === pokemon?.id,
            hitType: currentLog.hitType,
            attacker: currentLog.attacker.name,
            defender: currentLog.defender.name,
            fainted: currentLog.fainted,
            message: battleLogMessage(currentLog.hitType, currentLog.attacker.name, currentLog.damage)
          },
        ]);

        if (currentLogIndex === battleLog.length - 1) {
          setBattleEnded(true)
        }
  
        timer = setTimeout(() => {
          setCurrentLogIndex((prevIndex) => prevIndex + 1);
        }, turnsInMilisecondsDuration);
      }
  
      return () => clearTimeout(timer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentLogIndex, isPlaying, battleLog, pokemon]);
  
    const handleStart = () => {
      setIsPlaying(true);
      setCurrentLogIndex(0);
      setMyHp(pokemon?.stats.hp);
      setOpponentHp(opponent?.maxHp);
      setLogMessages([]);
    };
  
    const BattlingPokemonBox = ({ sprite, hp, maxHp, name, myPoke, currentLogIndex }) => (
      <Center flexDir="column" mx={2}>
        {myPoke && battleLog[currentLogIndex].defender.id === pokemon.id && (
          <Text
            position={"absolute"}
            fontSize="4xl"
            mt={48}
            ml={64}
            opacity={0}
            color={colorByHitType(battleLog[currentLogIndex].hitType)}
            animation={damageTextAnimation}
            onAnimationStart={(e) => e.target.style.opacity = 1}
            onAnimationEnd={(e) => {
              setDamageTextAnimation('')
              e.target.style.opacity = 0
            }}
          >
            {battleLog[currentLogIndex].damage > 0 ? `-${battleLog[currentLogIndex].damage}` : "MISS"}
          </Text>
        )}

        <Text mb={1}>{name.toUpperCase()}</Text>

        <Image
          w={72}
          animation={myPoke ? selfHitAnimation : opponentHitAnimation}
          onAnimationEnd={() => myPoke ? setSelfHitAnimation('') : setOpponentHitAnimation('')}
          src={sprite}
          position="absolute"
          mt={52}
          style={{
            animationFillMode: 'forwards',
            pointerEvents: 'none',
          }}
        />

        <Box>
          <Progress
            value={hp} max={maxHp} 
            size={"lg"} w={24}
            colorScheme={"green"}
            borderRadius={4}
          />
          <Text
            position="relative"
            textAlign={"center"}
            w={"100%"}
            bottom={3.5}
            fontSize={"x-small"}
          >
            {hp}/{maxHp}
          </Text>
        </Box>
        
        {!myPoke && battleLog[currentLogIndex].defender.id === opponent?.pokemonId && (
          <Text
            key={currentLogIndex}
            position={"absolute"}
            fontSize="4xl"
            mt={48}
            mr={64}
            opacity={0}
            color={colorByHitType(battleLog[currentLogIndex].hitType)}
            animation={damageTextAnimation}
            onAnimationStart={(e) => e.target.style.opacity = 1}
            onAnimationEnd={(e) => {
              setDamageTextAnimation('')
              e.target.style.opacity = 0
            }}
          >
            {battleLog[currentLogIndex].damage > 0 ? `-${battleLog[currentLogIndex].damage}` : "MISS"}
          </Text>
        )}
      </Center>
    );

    const WinnerPokemon = ({ sprite, name }) => (
      <Center w={"100%"} flexDir="column" mx={2}>
        <Image
          w={48}
          src={sprite}
          animation={`${winAnimation} 4s ease-in-out infinite`}
        />
        <Text mt={2} fontSize={"2xl"} animation={`${littleBounceAnimation} 10s ease-in-out infinite`}>{stringToUpperCase(name)} wins!!!</Text>
      </Center>
    )
  
    return (
      <Flex flex="1" h="100%" flexDirection="row">
        {battleLog && battleLog[currentLogIndex] && !battleEnded && (
          <Flex w="100%" h="100%" mx={24} flexDirection="row">
            <Center w="100%" h="100%">
              {pokemon && (
                <BattlingPokemonBox
                  key={pokemon?.id}
                  sprite={pokemon?.sprites.back}
                  hp={myHp}
                  maxHp={pokemon?.stats.hp}
                  name={pokemon?.name}
                  myPoke={true}
                  currentLogIndex={currentLogIndex}
                />
              )}
            </Center>
  
            <Center alignItems="start" w="100%" h="100%">
              {opponent && pokemon && (
                <BattlingPokemonBox
                  key={opponent?.pokemonId}
                  sprite={opponent?.sprite}
                  hp={opponentHp}
                  maxHp={opponent?.maxHp}
                  name={opponent?.name}
                  myPoke={false}
                  currentLogIndex={currentLogIndex}
                />
              )}
            </Center>
          </Flex>
        )}
        {battleEnded && (
          <Flex w="100%" h="100%" mx={24} flex={"column"}>
            <WinnerPokemon
              sprite={turnWinner === pokemon?.id ? pokemon?.sprites.front : opponent?.sprite}
              name={turnWinner === pokemon?.id ? pokemon?.name : opponent?.name}
            />
          </Flex>
        )}
        <BattleLog logMessages={logMessages} />
      </Flex>
    );
  }
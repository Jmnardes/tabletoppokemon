import { useState, useEffect, useCallback, useRef } from "react"
import { Box, Flex, HStack, Image, Text, useColorMode } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import { keyframes } from "@emotion/react"

import pokeballImg from "@assets/images/pokeballs/pokeball.png"
import greatballImg from "@assets/images/pokeballs/greatball.png"
import ultraballImg from "@assets/images/pokeballs/ultraball.png"
import masterballImg from "@assets/images/pokeballs/masterball.png"
import pikachuImg from "@assets/images/pokemons/pikachu.png"

// ─── Keyframes ───

const absorbIntoBall = keyframes`
  0%   { transform: scale(1); opacity: 1; filter: brightness(1); }
  40%  { transform: scale(0.6); opacity: 0.8; filter: brightness(1.6); }
  70%  { transform: scale(0.2); opacity: 0.4; filter: brightness(2); }
  100% { transform: scale(0);  opacity: 0;   filter: brightness(3); }
`

const ballDrop = keyframes`
  0%   { transform: translateY(-30px); }
  60%  { transform: translateY(8px); }
  80%  { transform: translateY(-3px); }
  100% { transform: translateY(0); }
`

const wobble = keyframes`
  0%   { transform: rotate(0deg); }
  25%  { transform: rotate(20deg); }
  50%  { transform: rotate(-20deg); }
  75%  { transform: rotate(10deg); }
  100% { transform: rotate(0deg); }
`

const wobbleStrong = keyframes`
  0%   { transform: rotate(0deg); }
  15%  { transform: rotate(25deg); }
  35%  { transform: rotate(-25deg); }
  50%  { transform: rotate(18deg); }
  65%  { transform: rotate(-15deg); }
  80%  { transform: rotate(8deg); }
  100% { transform: rotate(0deg); }
`

const catchSuccessGlow = keyframes`
  0%   { filter: brightness(1) drop-shadow(0 0 0px transparent); transform: scale(1); }
  30%  { filter: brightness(1.4) drop-shadow(0 0 16px rgba(72,187,120,0.8)); transform: scale(1.1); }
  60%  { filter: brightness(1.2) drop-shadow(0 0 24px rgba(72,187,120,0.6)); transform: scale(1.05); }
  100% { filter: brightness(1) drop-shadow(0 0 8px rgba(72,187,120,0.4)); transform: scale(1); }
`

const catchFailExplode = keyframes`
  0%   { filter: brightness(1); transform: scale(1); opacity: 1; }
  30%  { filter: brightness(1.8) hue-rotate(-30deg); transform: scale(1.3); opacity: 1; }
  60%  { filter: brightness(2) hue-rotate(-40deg); transform: scale(1.6); opacity: 0.6; }
  100% { filter: brightness(3) hue-rotate(-50deg); transform: scale(2); opacity: 0; }
`

const reappearFromBall = keyframes`
  0%   { transform: scale(0); opacity: 0; filter: brightness(2); }
  50%  { transform: scale(1.15); opacity: 0.7; filter: brightness(1.3); }
  75%  { transform: scale(0.95); opacity: 0.9; filter: brightness(1.1); }
  100% { transform: scale(1); opacity: 1; filter: brightness(1); }
`

const sparkleKf = keyframes`
  0%   { opacity: 0; transform: scale(0) rotate(0deg); }
  50%  { opacity: 1; transform: scale(1) rotate(180deg); }
  100% { opacity: 0; transform: scale(0) rotate(360deg); }
`

// ─── Constants ───

const POWER_SPEED = 2.5
const POWER_SPEED_MAX = 3.5
const THROW_DURATION = 500

const STAGE_H = 360
const BALL_START_Y = STAGE_H - 40
const CARD_CENTER_Y = STAGE_H / 2 - 60

// Zone configs per ball type — half-widths as fraction of total bar
const BALL_ZONES = {
  pokeball:   { perfectPct: 0.005, goodPct: 0.075, badPct: 0.175 },
  greatball:  { perfectPct: 0.010, goodPct: 0.100, badPct: 0.150 },
  ultraball:  { perfectPct: 0.015, goodPct: 0.125, badPct: 0.125 },
  masterball: { perfectPct: 0.500, goodPct: 0.000, badPct: 0.000 },
}

const BALL_BONUS = { pokeball: 0, greatball: 3, ultraball: 6, masterball: 20 }

const BALL_IMAGES = {
  pokeball: pokeballImg,
  greatball: greatballImg,
  ultraball: ultraballImg,
  masterball: masterballImg,
}

const getThrowResult = (deviation, ballType, t) => {
  const zones = BALL_ZONES[ballType] || BALL_ZONES.pokeball
  if (deviation <= zones.perfectPct) return { label: t('minigame.perfect'), color: "green.400", bonus: 4 }
  if (deviation <= zones.goodPct)    return { label: t('minigame.good'),    color: "yellow.400", bonus: 2 }
  if (deviation <= (0.5 - zones.badPct)) return { label: t('minigame.ok'), color: "gray.400", bonus: 0 }
  return { label: t('minigame.bad'),   color: "red.400",   bonus: -1 }
}

const rollCatch = (ballType, throwBonus) => {
  const roll = Math.floor(Math.random() * 20) + 1
  const ballBonus = BALL_BONUS[ballType] || 0
  return (roll + ballBonus + throwBonus) >= 10
}

// ─── Phase machine ───

const PHASES = {
  IDLE: "idle",
  POWER: "power",
  THROWN: "thrown",
  CENTERING: "centering",
  ABSORBING: "absorbing",
  DROPPING: "dropping",
  WOBBLE_1: "wobble_1",
  WOBBLE_2: "wobble_2",
  WOBBLE_3: "wobble_3",
  RESULT: "result",
}

const CENTER_Y = STAGE_H / 2 - 26

const CATCH_PHASE_DURATIONS = {
  [PHASES.CENTERING]: 450,
  [PHASES.ABSORBING]: 500,
  [PHASES.DROPPING]: 400,
  [PHASES.WOBBLE_1]: 600,
  [PHASES.WOBBLE_2]: 600,
  [PHASES.WOBBLE_3]: 600,
}

const CATCH_PHASE_ORDER = [
  PHASES.CENTERING,
  PHASES.ABSORBING,
  PHASES.DROPPING,
  PHASES.WOBBLE_1,
  PHASES.WOBBLE_2,
  PHASES.WOBBLE_3,
  PHASES.RESULT,
]

export default function ThrowCatchGame({ onFinish, onCatchResolve, balls, targetSprite, targetName }) {
  const isJourneyMode = !!onCatchResolve
  const { colorMode } = useColorMode()
  const { t } = useTranslation()
  const isDark = colorMode === "dark"

  const [phase, setPhase] = useState(PHASES.IDLE)
  const [power, setPower] = useState(0)
  const [, setPowerDir] = useState(1)
  const [ballY, setBallY] = useState(BALL_START_Y)
  const [throwResult, setThrowResult] = useState(null)
  const [caught, setCaught] = useState(false)
  const [selectedBall, setSelectedBall] = useState("pokeball")
  const [waitingServer, setWaitingServer] = useState(false)

  const zones = BALL_ZONES[selectedBall] || BALL_ZONES.pokeball

  const powerRef = useRef(0)
  const powerDirRef = useRef(1)
  const bounceRef = useRef(0)
  const speedRef = useRef(POWER_SPEED)
  const timerRef = useRef(null)

  const displaySprite = targetSprite || pikachuImg
  const displayName = targetName || "Pikachu"

  // ─── Power bar oscillation ───
  useEffect(() => {
    if (phase !== PHASES.POWER) return
    const interval = setInterval(() => {
      setPower(prev => {
        let dir = powerDirRef.current
        let speed = speedRef.current
        let next = prev + dir * speed
        if (next >= 100) {
          next = 100
          setPowerDir(-1)
          powerDirRef.current = -1
          bounceRef.current += 1
          if (bounceRef.current % 2 === 0) speedRef.current = Math.min(speed + 0.08, POWER_SPEED_MAX)
        }
        if (next <= 0) {
          next = 0
          setPowerDir(1)
          powerDirRef.current = 1
          bounceRef.current += 1
          if (bounceRef.current % 2 === 0) speedRef.current = Math.min(speed + 0.08, POWER_SPEED_MAX)
        }
        powerRef.current = next
        return next
      })
    }, 16)
    return () => clearInterval(interval)
  }, [phase])

  // ─── Throw animation ───
  const throwBall = useCallback((lockedPower) => {
    const deviation = Math.abs(lockedPower - 50) / 50
    const result = getThrowResult(deviation, selectedBall, t)
    setThrowResult(result)

    const maxOffset = BALL_START_Y - CARD_CENTER_Y
    const targetY = CARD_CENTER_Y + (deviation * maxOffset * 0.6)

    const startY = BALL_START_Y
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const t = Math.min(elapsed / THROW_DURATION, 1)
      const ease = 1 - Math.pow(1 - t, 3)

      setBallY(startY + (targetY - startY) * ease)

      if (t < 1) {
        requestAnimationFrame(animate)
      } else {
        timerRef.current = setTimeout(() => {
          setBallY(CENTER_Y)
          setPhase(PHASES.CENTERING)
        }, 600)
      }
    }

    requestAnimationFrame(animate)
  }, [selectedBall, t])

  // ─── Auto-advance catch phases ───
  useEffect(() => {
    const idx = CATCH_PHASE_ORDER.indexOf(phase)
    if (idx === -1 || phase === PHASES.RESULT) return

    const nextPhase = CATCH_PHASE_ORDER[idx + 1]
    const duration = CATCH_PHASE_DURATIONS[phase]
    if (!duration || !nextPhase) return

    if (nextPhase === PHASES.RESULT) {
      if (isJourneyMode) {
        // Journey mode: ask server to resolve capture after wobble animation
        timerRef.current = setTimeout(() => {
          setWaitingServer(true)
          onCatchResolve({ ballType: selectedBall, throwBonus: throwResult?.bonus ?? 0 }, (serverCaught) => {
            setCaught(serverCaught)
            setWaitingServer(false)
            setPhase(PHASES.RESULT)
          })
        }, duration)
      } else {
        timerRef.current = setTimeout(() => {
          setCaught(rollCatch(selectedBall, throwResult?.bonus ?? 0))
          setPhase(PHASES.RESULT)
        }, duration)
      }
    } else {
      timerRef.current = setTimeout(() => setPhase(nextPhase), duration)
    }

    return () => clearTimeout(timerRef.current)
  }, [phase, throwResult, selectedBall, isJourneyMode, onCatchResolve])

  // ─── Click handler ───
  const handleClick = useCallback(() => {
    if (waitingServer) return
    if (phase === PHASES.IDLE) {
      if (balls && (balls[selectedBall] || 0) <= 0) return
      const startPower = Math.random() * 100
      const startDir = Math.random() < 0.5 ? 1 : -1
      setPower(startPower)
      powerRef.current = startPower
      setPowerDir(startDir)
      powerDirRef.current = startDir
      bounceRef.current = 0
      speedRef.current = POWER_SPEED
      setPhase(PHASES.POWER)
    } else if (phase === PHASES.POWER) {
      setPhase(PHASES.THROWN)
      throwBall(powerRef.current)
    } else if (phase === PHASES.RESULT) {
      if (onFinish) onFinish({ caught, bonus: throwResult?.bonus ?? 0, ballType: selectedBall })
      if (!isJourneyMode) {
        clearTimeout(timerRef.current)
        setCaught(false)
        setThrowResult(null)
        setBallY(BALL_START_Y)
        setPower(0)
        setPhase(PHASES.IDLE)
      }
    }
  }, [phase, caught, throwResult, onFinish, throwBall, isJourneyMode, selectedBall, balls, waitingServer])

  // ─── Derived states ───
  const isBeforeThrow = phase === PHASES.IDLE || phase === PHASES.POWER
  const isThrowing = phase === PHASES.THROWN
  const isCatchPhase = [PHASES.CENTERING, PHASES.ABSORBING, PHASES.DROPPING, PHASES.WOBBLE_1, PHASES.WOBBLE_2, PHASES.WOBBLE_3, PHASES.RESULT].includes(phase)

  const showCard = isBeforeThrow || isThrowing || phase === PHASES.CENTERING || (phase === PHASES.RESULT && !caught)
  const cardAbsorbing = phase === PHASES.ABSORBING
  const showBall = isThrowing || isCatchPhase

  const isWobbling = phase === PHASES.WOBBLE_1 || phase === PHASES.WOBBLE_2 || phase === PHASES.WOBBLE_3
  const wobbleCount = phase === PHASES.WOBBLE_1 ? 1 : phase === PHASES.WOBBLE_2 ? 2 : phase === PHASES.WOBBLE_3 ? 3 : 0

  const getBallAnimation = () => {
    if (phase === PHASES.DROPPING) return `${ballDrop} 0.4s ease-out forwards`
    if (isWobbling) {
      if (phase === PHASES.WOBBLE_3) return `${wobbleStrong} 0.6s ease-in-out`
      return `${wobble} 0.5s ease-in-out`
    }
    if (phase === PHASES.RESULT && caught) return `${catchSuccessGlow} 0.8s ease-out forwards`
    if (phase === PHASES.RESULT && !caught) return `${catchFailExplode} 0.5s ease-out forwards`
    return "none"
  }

  const getCardAnimation = () => {
    if (cardAbsorbing) return `${absorbIntoBall} 0.5s ease-in forwards`
    if (phase === PHASES.RESULT && !caught) return `${reappearFromBall} 0.6s 0.3s ease-out both`
    return "none"
  }

  const sparkles = [
    { top: "-12px", left: "50%", delay: "0s" },
    { top: "30%", right: "-16px", delay: "0.15s" },
    { bottom: "-12px", left: "40%", delay: "0.3s" },
    { top: "20%", left: "-16px", delay: "0.1s" },
    { top: "60%", right: "-10px", delay: "0.25s" },
    { bottom: "10%", left: "-8px", delay: "0.4s" },
  ]

  const getText = () => {
    if (phase === PHASES.IDLE) return "Click to start!"
    if (phase === PHASES.POWER) return "Click to throw!"
    if (phase === PHASES.THROWN && throwResult) return throwResult.label
    if (waitingServer) return "..."
    if (isWobbling) return `${"● ".repeat(wobbleCount)}${"○ ".repeat(3 - wobbleCount)}`
    if (phase === PHASES.RESULT && caught) return "Caught!"
    if (phase === PHASES.RESULT && !caught) return "Oh no! It broke free!"
    return ""
  }

  const getTextColor = () => {
    if (phase === PHASES.THROWN && throwResult) return throwResult.color
    if (phase === PHASES.RESULT) return caught ? "green.400" : "red.400"
    return isDark ? "gray.300" : "gray.600"
  }

  const isClickable = (phase === PHASES.IDLE || phase === PHASES.POWER || phase === PHASES.RESULT) && !waitingServer
  const canSelectBall = phase === PHASES.IDLE || phase === PHASES.RESULT

  // Zone boundaries for power bar (as % of bar width)
  const perfectHalf = zones.perfectPct * 100
  const goodHalf = zones.goodPct * 100
  const badHalf = zones.badPct * 100
  const okLeft = badHalf
  const okRight = 100 - badHalf

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap={4}
      w="full"
      maxW="440px"
      cursor={isClickable ? "pointer" : "default"}
      onClick={handleClick}
      userSelect="none"
    >
      {/* ─── Stage ─── */}
      <Flex
        position="relative"
        w="300px"
        h={`${STAGE_H}px`}
        align="center"
        justify="center"
        bg={isDark ? "gray.800" : "gray.200"}
        borderRadius="xl"
        border="3px solid"
        borderColor={isDark ? "gray.600" : "gray.400"}
        overflow="hidden"
        flexDir="column"
      >
        {/* Pokémon card */}
        <Box
          position="absolute"
          top={`${CARD_CENTER_Y}px`}
          display={showCard || cardAbsorbing ? "flex" : "none"}
          alignItems="center"
          justifyContent="center"
          animation={getCardAnimation()}
        >
          <Box
            bg={isDark ? "gray.700" : "white"}
            borderRadius="lg"
            border="2px solid"
            borderColor={isDark ? "gray.500" : "gray.300"}
            p={4}
            boxShadow="lg"
          >
            <Image src={displaySprite} w="100px" h="100px" objectFit="contain" />
            <Text fontSize="sm" fontWeight="bold" textAlign="center" mt={1} color={isDark ? "gray.200" : "gray.700"}>
              {displayName}
            </Text>
          </Box>
        </Box>

        {/* Pokéball */}
        {showBall && (
          <Box
            position="absolute"
            top={isCatchPhase ? "50%" : `${ballY}px`}
            left="50%"
            transform={isCatchPhase ? "translate(-50%, -50%)" : "translateX(-50%)"}
            transition={phase === PHASES.CENTERING ? "top 0.4s ease-in-out, transform 0.4s ease-in-out" : "none"}
            zIndex={2}
          >
            <Box animation={getBallAnimation()}>
              <Box position="relative">
                <Image src={BALL_IMAGES[selectedBall]} w="52px" h="52px" objectFit="contain" />

                {phase === PHASES.RESULT && caught && sparkles.map((pos, i) => (
                  <Box
                    key={i}
                    position="absolute"
                    w="10px"
                    h="10px"
                    bg="green.300"
                    borderRadius="full"
                    animation={`${sparkleKf} 0.6s ${pos.delay} ease-out both`}
                    {...pos}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        )}

        {/* Wobble dots */}
        {isWobbling && (
          <Flex position="absolute" bottom="16px" gap={2}>
            {[1, 2, 3].map(n => (
              <Box
                key={n}
                w="10px"
                h="10px"
                borderRadius="full"
                bg={n <= wobbleCount ? (isDark ? "yellow.300" : "yellow.500") : (isDark ? "gray.600" : "gray.400")}
                transition="background 0.2s"
              />
            ))}
          </Flex>
        )}
      </Flex>

      {/* ─── Power bar ─── */}
      {(phase === PHASES.IDLE || phase === PHASES.POWER) && (
        <Box w="300px" h="28px" position="relative" borderRadius="md" overflow="hidden" border="2px solid" borderColor={isDark ? "gray.600" : "gray.400"}>
          {/* Bad — full background */}
          <Box position="absolute" inset={0} bg={isDark ? "rgba(229,62,62,0.35)" : "rgba(229,62,62,0.25)"} />
          {/* Ok — between bad edges */}
          {okLeft < 50 && (
            <Box position="absolute" top={0} bottom={0} left={`${okLeft}%`} w={`${okRight - okLeft}%`} bg={isDark ? "rgba(160,174,192,0.3)" : "rgba(160,174,192,0.25)"} />
          )}
          {/* Good */}
          {goodHalf > 0 && (
            <Box position="absolute" top={0} bottom={0} left={`${50 - goodHalf}%`} w={`${goodHalf * 2}%`} bg={isDark ? "rgba(236,201,75,0.35)" : "rgba(236,201,75,0.3)"} />
          )}
          {/* Perfect */}
          {perfectHalf > 0 && (
            <Box position="absolute" top={0} bottom={0} left={`${50 - perfectHalf}%`} w={`${perfectHalf * 2}%`} bg={isDark ? "rgba(72,187,120,0.6)" : "rgba(72,187,120,0.5)"} />
          )}

          {/* Cursor line */}
          {phase === PHASES.POWER && (
            <Box
              position="absolute"
              left={`${power}%`}
              top={0}
              bottom={0}
              w="3px"
              bg="white"
              boxShadow="0 0 6px white"
              transform="translateX(-50%)"
              zIndex={3}
            />
          )}
        </Box>
      )}

      {/* ─── Ball selector ─── */}
      <HStack spacing={4}>
        {Object.entries(BALL_IMAGES).map(([key, src]) => {
          const count = balls ? (balls[key] || 0) : null
          const disabled = balls ? count <= 0 : false
          return (
            <Box
              key={key}
              p={2}
              borderRadius="md"
              border="2px solid"
              borderColor={selectedBall === key ? "blue.400" : "transparent"}
              bg={selectedBall === key ? (isDark ? "whiteAlpha.200" : "blackAlpha.100") : "transparent"}
              opacity={canSelectBall && !disabled ? 1 : 0.5}
              cursor={canSelectBall && !disabled ? "pointer" : "default"}
              onClick={(e) => { e.stopPropagation(); if (canSelectBall && !disabled) setSelectedBall(key) }}
              transition="all 0.15s"
            >
              <Image src={src} w={8} h={8} />
              {balls && (
                <Text fontSize="2xs" textAlign="center" color={isDark ? "gray.400" : "gray.500"} mt={0.5}>
                  {count}
                </Text>
              )}
            </Box>
          )
        })}
      </HStack>

      {/* ─── Text ─── */}
      <Flex direction="column" align="center" minH="50px" justify="center">
        <Text fontSize="xl" fontWeight="bold" color={getTextColor()} textAlign="center">
          {getText()}
        </Text>
        {phase === PHASES.RESULT && (
          <Text fontSize="sm" color={isDark ? "gray.500" : "gray.400"} mt={1}>
            {isJourneyMode ? "Click to continue" : "Click to replay"}
          </Text>
        )}
      </Flex>
    </Flex>
  )
}

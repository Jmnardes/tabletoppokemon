import { useState, useEffect, useRef, useCallback } from "react"
import { Flex, Text, Image, HStack, Box, useColorMode } from "@chakra-ui/react"

import pokeballImg from "@assets/images/pokeballs/pokeball.png"
import greatballImg from "@assets/images/pokeballs/greatball.png"
import ultraballImg from "@assets/images/pokeballs/ultraball.png"
import masterballImg from "@assets/images/pokeballs/masterball.png"
import pikachuImg from "@assets/images/pokemons/pikachu.png"

const CANVAS_W = 500
const CANVAS_H = 640

// Layout constants
const MARGIN = 2
const GAP = 2
const R = 4 // border radius
const BAR_H = 24
const FIELD_X = MARGIN
const FIELD_W = CANVAS_W - MARGIN * 2

// Layout: field top, power bar below, text at bottom
const FIELD_TOP_H = Math.round(CANVAS_H * 0.72)  // ~460
const BAR_Y = FIELD_TOP_H + GAP
const TEXT_AREA_Y = BAR_Y + BAR_H + GAP

// Center of the field
const TARGET_CX = FIELD_X + FIELD_W / 2
const TARGET_CY = FIELD_TOP_H / 2

// Zone configs per ball type (half-heights as % of FIELD_H)
// greatball: pokeball +5% perfect, +5% good
// ultraball: greatball +5% perfect, +5% good
const BALL_ZONES = {
  pokeball:   { perfectPct: 0.005, goodPct: 0.075, badPct: 0.09 },
  greatball:  { perfectPct: 0.010, goodPct: 0.100, badPct: 0.08 },
  ultraball:  { perfectPct: 0.015, goodPct: 0.125, badPct: 0.07 },
  masterball: { perfectPct: 0.500, goodPct: 0.500, badPct: 0.000 },
}

const BALL_IMAGES = {
  pokeball: pokeballImg,
  greatball: greatballImg,
  ultraball: ultraballImg,
  masterball: masterballImg,
}

const NEUTRAL_H = Math.round(FIELD_TOP_H * 0.50)

const BALL_START_Y = FIELD_TOP_H - 30
const BALL_SIZE = 22
const PIKA_SIZE = 72

const POWER_SPEED = 3.5
const POWER_SPEED_MAX = 4.0
const THROW_DURATION = 600

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

const PHASES = {
  IDLE: "idle",
  POWER: "power",
  THROWN: "thrown",
  RESULT: "result",
}

export default function ThrowGame({ onFinish, externalBall, targetSprite }) {
  const isJourneyMode = externalBall !== undefined
  const canvasRef = useRef(null)
  const { colorMode } = useColorMode()
  const ballImgsRef = useRef({})
  const targetImgRef = useRef(null)

  const [phase, setPhase] = useState(PHASES.IDLE)
  const [power, setPower] = useState(0)
  const [powerDir, setPowerDir] = useState(1)
  const [ballPos, setBallPos] = useState({ x: TARGET_CX, y: BALL_START_Y })
  const [result, setResult] = useState(null)
  const [bonus, setBonus] = useState(0)
  const [imgsLoaded, setImgsLoaded] = useState(0)
  const [internalBall, setInternalBall] = useState("pokeball")

  const selectedBall = externalBall || internalBall

  const powerRef = useRef(power)
  const powerDirRef = useRef(powerDir)
  const bounceRef = useRef(0)
  const speedRef = useRef(POWER_SPEED)

  const zones = BALL_ZONES[selectedBall] || BALL_ZONES.ultraball
  const PERFECT_H = Math.round(FIELD_TOP_H * zones.perfectPct)
  const GOOD_H = Math.round(FIELD_TOP_H * zones.goodPct)
  const BAD_H = Math.round(FIELD_TOP_H * zones.badPct)
  const OK_BOUNDARY = NEUTRAL_H - BAD_H

  useEffect(() => { powerRef.current = power }, [power])
  useEffect(() => { powerDirRef.current = powerDir }, [powerDir])

  // Load images
  useEffect(() => {
    Object.entries(BALL_IMAGES).forEach(([key, src]) => {
      const img = new window.Image()
      img.src = src
      img.onload = () => { ballImgsRef.current[key] = img; setImgsLoaded(p => p + 1) }
    })

    const targetSrc = targetSprite || pikachuImg
    const target = new window.Image()
    target.src = targetSrc
    target.onload = () => { targetImgRef.current = target; setImgsLoaded(p => p + 1) }
  }, [targetSprite])

  // Power bar oscillation
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
          bounceRef.current += 1
          if (bounceRef.current % 2 === 0) {
            speedRef.current = Math.min(speed + 0.1, POWER_SPEED_MAX)
          }
        }
        if (next <= 0) {
          next = 0
          setPowerDir(1)
          bounceRef.current += 1
          if (bounceRef.current % 2 === 0) {
            speedRef.current = Math.min(speed + 0.1, POWER_SPEED_MAX)
          }
        }
        powerRef.current = next
        return next
      })
    }, 16)
    return () => clearInterval(interval)
  }, [phase])

  // Throw animation
  const throwBall = useCallback((lockedPower) => {
    const startX = TARGET_CX
    const startY = BALL_START_Y

    // Map power directly to the same Y range as the power bar
    // power 0 = bottom of field (TARGET_CY + NEUTRAL_H)
    // power 50 = center (TARGET_CY)
    // power 100 = top of field (TARGET_CY - NEUTRAL_H)
    const targetY = TARGET_CY + NEUTRAL_H - (lockedPower / 100) * NEUTRAL_H * 2
    const targetX = TARGET_CX

    const perfectH = PERFECT_H
    const goodH = GOOD_H
    const okBoundary = OK_BOUNDARY

    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const t = Math.min(elapsed / THROW_DURATION, 1)
      const ease = 1 - Math.pow(1 - t, 3)

      const x = startX + (targetX - startX) * ease
      const y = startY + (targetY - startY) * ease

      setBallPos({ x, y })

      if (t < 1) {
        requestAnimationFrame(animate)
      } else {
        const dy = Math.abs(y - TARGET_CY)

        let b = 0
        let r = "bad"
        if (dy <= perfectH) {
          b = 4
          r = "perfect"
        } else if (dy <= goodH) {
          b = 2
          r = "good"
        } else if (dy <= okBoundary) {
          r = "ok"
        }

        setBonus(b)
        setResult(r)
        setPhase(PHASES.RESULT)
      }
    }

    requestAnimationFrame(animate)
  }, [PERFECT_H, GOOD_H, OK_BOUNDARY])

  const handleClick = useCallback(() => {
    // In journey mode, block interaction until a ball is selected
    if (externalBall === null) return

    if (phase === PHASES.IDLE) {
      // Randomize start position and direction
      const startPower = Math.random() * 100
      const startDir = Math.random() < 0.5 ? 1 : -1
      setPower(startPower)
      powerRef.current = startPower
      setPowerDir(startDir)
      bounceRef.current = 0
      speedRef.current = POWER_SPEED
      setPhase(PHASES.POWER)
    } else if (phase === PHASES.POWER) {
      const lockedPower = powerRef.current
      setPhase(PHASES.THROWN)
      throwBall(lockedPower)
    } else if (phase === PHASES.RESULT) {
      if (onFinish) {
        onFinish(bonus)
      }
      if (!externalBall) {
        setPower(0)
        setPowerDir(1)
        setBallPos({ x: TARGET_CX, y: BALL_START_Y })
        setResult(null)
        setBonus(0)
        setPhase(PHASES.IDLE)
      }
    }
  }, [phase, bonus, onFinish, throwBall, externalBall])

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")

    const isDark = colorMode === "dark"
    const bgColor = isDark ? "#1A202C" : "#E2E8F0"
    const neutralColor = isDark ? "#2D3748" : "#CBD5E0"
    const goodColor = isDark ? "rgba(236, 201, 75, 0.3)" : "rgba(214, 158, 46, 0.25)"
    const goodStroke = isDark ? "#ECC94B" : "#D69E2E"
    const perfectColor = isDark ? "rgba(72, 187, 120, 0.4)" : "rgba(56, 161, 105, 0.3)"
    const perfectStroke = isDark ? "#48BB78" : "#38A169"
    const textColor = isDark ? "#E2E8F0" : "#1A202C"
    const centerLineColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)"

    // Clear
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)

    // Neutral zone (full field) - gray background with rounded corners
    roundRect(ctx, FIELD_X, TARGET_CY - NEUTRAL_H, FIELD_W, NEUTRAL_H * 2, R)
    ctx.fillStyle = neutralColor
    ctx.fill()
    ctx.strokeStyle = isDark ? "#4A5568" : "#A0AEC0"
    ctx.lineWidth = 3
    ctx.stroke()

    // Bad zones (outer edges of neutral zone)
    if (BAD_H > 0) {
      const badColor = isDark ? "rgba(237, 100, 100, 0.35)" : "rgba(197, 48, 48, 0.25)"
      ctx.save()
      roundRect(ctx, FIELD_X, TARGET_CY - NEUTRAL_H, FIELD_W, NEUTRAL_H * 2, R)
      ctx.clip()
      ctx.fillStyle = badColor
      ctx.fillRect(FIELD_X, TARGET_CY - NEUTRAL_H, FIELD_W, BAD_H)
      ctx.fillRect(FIELD_X, TARGET_CY + NEUTRAL_H - BAD_H, FIELD_W, BAD_H)
      ctx.restore()
    }

    // Good zone
    roundRect(ctx, FIELD_X, TARGET_CY - GOOD_H, FIELD_W, GOOD_H * 2, R)
    ctx.fillStyle = goodColor
    ctx.fill()
    ctx.strokeStyle = goodStroke
    ctx.lineWidth = 3
    ctx.stroke()

    // Perfect zone
    roundRect(ctx, FIELD_X + 4, TARGET_CY - PERFECT_H, FIELD_W - 8, PERFECT_H * 2, R)
    ctx.fillStyle = perfectColor
    ctx.fill()
    ctx.strokeStyle = perfectStroke
    ctx.lineWidth = 3
    ctx.stroke()

    // Center indicator line
    ctx.strokeStyle = centerLineColor
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(FIELD_X, TARGET_CY)
    ctx.lineTo(FIELD_X + FIELD_W, TARGET_CY)
    ctx.stroke()

    // Target pokemon/pikachu in center
    if (targetImgRef.current) {
      ctx.drawImage(targetImgRef.current, TARGET_CX - PIKA_SIZE / 2, TARGET_CY - PIKA_SIZE / 2, PIKA_SIZE, PIKA_SIZE)
    }

    // Zone labels (small, on left edge)
    ctx.font = "bold 10px sans-serif"
    ctx.textAlign = "left"
    ctx.textBaseline = "middle"
    ctx.fillStyle = perfectStroke
    ctx.fillText("+4", FIELD_X + 6, TARGET_CY - PERFECT_H + 10)
    ctx.fillStyle = goodStroke
    ctx.fillText("+2", FIELD_X + 6, TARGET_CY - GOOD_H + 10)
    ctx.fillStyle = isDark ? "#A0AEC0" : "#718096"
    ctx.fillText("+0", FIELD_X + 6, TARGET_CY - NEUTRAL_H + 10)

    // Power bar (horizontal, below field)
    if (phase === PHASES.POWER || phase === PHASES.IDLE) {
      const barX = FIELD_X
      const barW = FIELD_W

      roundRect(ctx, barX, BAR_Y, barW, BAR_H, R)
      ctx.fillStyle = isDark ? "#4A5568" : "#A0AEC0"
      ctx.fill()
      ctx.strokeStyle = isDark ? "#4A5568" : "#A0AEC0"
      ctx.lineWidth = 3
      ctx.stroke()

      // Power fill (clipped to rounded rect, left to right)
      const fillW = (power / 100) * barW
      const powerColor = "#48BB78"
      ctx.save()
      roundRect(ctx, barX, BAR_Y, barW, BAR_H, R)
      ctx.clip()
      ctx.fillStyle = powerColor
      ctx.fillRect(barX, BAR_Y, fillW, BAR_H)
      ctx.restore()

      // Border on top of fill
      roundRect(ctx, barX, BAR_Y, barW, BAR_H, R)
      ctx.strokeStyle = isDark ? "#4A5568" : "#A0AEC0"
      ctx.lineWidth = 3
      ctx.stroke()

      // Center mark on power bar (vertical line at 50%)
      ctx.strokeStyle = centerLineColor
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(barX + barW / 2, BAR_Y - 3)
      ctx.lineTo(barX + barW / 2, BAR_Y + BAR_H + 3)
      ctx.stroke()
    }

    // Ball (selected pokeball image or fallback)
    const currentBallImg = ballImgsRef.current[selectedBall]
    if (currentBallImg) {
      ctx.drawImage(currentBallImg, ballPos.x - BALL_SIZE / 2, ballPos.y - BALL_SIZE / 2, BALL_SIZE, BALL_SIZE)
    } else {
      ctx.fillStyle = "#EDF2F7"
      ctx.fillRect(ballPos.x - BALL_SIZE / 2, ballPos.y - BALL_SIZE / 2, BALL_SIZE, BALL_SIZE)
    }

    // --- Text area (below power bar) ---
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    const textCenterY = TEXT_AREA_Y + (CANVAS_H - TEXT_AREA_Y) / 2

    if (phase === PHASES.RESULT) {
      const resultColors = { perfect: "#48BB78", good: "#ECC94B", ok: "#A0AEC0", bad: "#E53E3E" }
      const resultTexts = { perfect: "Perfect throw!", good: "Good throw!", ok: "Ok throw!", bad: "Bad throw!" }

      ctx.fillStyle = resultColors[result]
      ctx.font = "bold 28px sans-serif"
      ctx.fillText(resultTexts[result], CANVAS_W / 2, textCenterY - 10)

      ctx.fillStyle = textColor
      ctx.font = "14px sans-serif"
      ctx.fillText("Click to continue", CANVAS_W / 2, textCenterY + 22)
    } else if (phase === PHASES.IDLE) {
      ctx.fillStyle = textColor
      ctx.font = "16px sans-serif"
      const idleText = externalBall === null ? "Select a ball" : "Click to start"
      ctx.fillText(idleText, CANVAS_W / 2, textCenterY)
    } else if (phase === PHASES.POWER) {
      ctx.fillStyle = textColor
      ctx.font = "16px sans-serif"
      ctx.fillText("Click to throw!", CANVAS_W / 2, textCenterY)
    }
  }, [phase, power, ballPos, result, colorMode, imgsLoaded, selectedBall, PERFECT_H, GOOD_H, BAD_H, OK_BOUNDARY, externalBall])

  const canSelectBall = phase === PHASES.IDLE || phase === PHASES.RESULT

  return (
    <Flex direction="column" align="center" gap={4}>
      <canvas
        ref={canvasRef}
        width={CANVAS_W}
        height={CANVAS_H}
        onClick={handleClick}
        style={{ cursor: "pointer", borderRadius: "4px", border: "3px solid", borderColor: colorMode === "dark" ? "#4A5568" : "#A0AEC0" }}
      />
      {!isJourneyMode && (
        <HStack spacing={4} mt={1}>
          {Object.entries(BALL_IMAGES).map(([key, src]) => (
            <Box
              key={key}
              p={2}
              borderRadius="md"
              border="2px solid"
              borderColor={selectedBall === key ? "blue.400" : "transparent"}
              bg={selectedBall === key ? (colorMode === "dark" ? "whiteAlpha.200" : "blackAlpha.100") : "transparent"}
              opacity={canSelectBall ? 1 : 0.5}
              cursor={canSelectBall ? "pointer" : "default"}
              onClick={() => canSelectBall && setInternalBall(key)}
              transition="all 0.15s"
            >
              <Image src={src} w={8} h={8} />
            </Box>
          ))}
        </HStack>
      )}
      {phase === PHASES.RESULT && (
        <Text fontSize="lg" fontWeight="bold" color={result === "perfect" ? "green.400" : result === "good" ? "yellow.400" : result === "ok" ? "gray.400" : "red.400"}>
          Catch Bonus: +{bonus}
        </Text>
      )}
    </Flex>
  )
}

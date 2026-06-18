import { useContext, useEffect, useRef, useState, useCallback } from "react"
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import PlayerContext from "@context/PlayerContext"
import ashIcon from "@assets/images/game/ash.png"

const TUTORIAL_STEPS = [
    { target: null, tab: null, i18nKey: "tutorial.step0" },
    { target: "player-info", tab: null, i18nKey: "tutorial.step1" },
    { target: "quick-items", tab: null, i18nKey: "tutorial.step2" },
    { target: "tab-buttons", tab: null, i18nKey: "tutorial.step3" },
    { target: "team-cards", tab: "bag", i18nKey: "tutorial.step4" },
    { target: "box-pokemon", tab: "bag", i18nKey: "tutorial.step5" },
    { target: "bag-items", tab: "bag", i18nKey: "tutorial.step6" },
    { target: "turn-control", tab: null, i18nKey: "tutorial.step7" },
    { target: "daycare-panel", tab: "daycare", i18nKey: "tutorial.step8" },
    { target: "training-panel", tab: "training", i18nKey: "tutorial.step9" },
    { target: "farm-panel", tab: "farm", i18nKey: "tutorial.step10" },
    { target: "craft-panel", tab: "craft", i18nKey: "tutorial.step11" },
    { target: "journey-panel", tab: "journey", i18nKey: "tutorial.step12" },
    { target: "gym-panel", tab: "gym", i18nKey: "tutorial.step13" },
    { target: "settings-panel", tab: "settings", i18nKey: "tutorial.step14" },
    { target: null, tab: null, i18nKey: "tutorial.step15" },
]

const TOTAL_STEPS = TUTORIAL_STEPS.length

export default function TutorialOverlay() {
    const { game, updateGame, setActiveTab } = useContext(PlayerContext)
    const { t } = useTranslation()
    const [highlightRect, setHighlightRect] = useState(null)
    const rafRef = useRef(null)

    const currentStep = game.tutorialStep ?? 0
    const stepConfig = TUTORIAL_STEPS[currentStep]

    const exitTutorial = useCallback(() => {
        localStorage.setItem("tutorialCompleted", "true")
        updateGame({ tutorialStep: null })
        setActiveTab("bag")
    }, [updateGame, setActiveTab])

    const nextStep = useCallback(() => {
        if (currentStep >= TOTAL_STEPS - 1) {
            exitTutorial()
            return
        }
        const next = currentStep + 1
        const nextConfig = TUTORIAL_STEPS[next]
        if (nextConfig.tab) {
            setActiveTab(nextConfig.tab)
        }
        updateGame({ tutorialStep: next })
    }, [currentStep, exitTutorial, updateGame, setActiveTab])

    // Measure target element position
    useEffect(() => {
        if (!stepConfig.target) {
            setHighlightRect(null)
            return
        }

        const measure = () => {
            const el = document.querySelector(`[data-tutorial="${stepConfig.target}"]`)
            if (el) {
                const rect = el.getBoundingClientRect()
                setHighlightRect({
                    top: rect.top,
                    left: rect.left,
                    width: rect.width,
                    height: rect.height,
                })
            } else {
                setHighlightRect(null)
            }
            rafRef.current = requestAnimationFrame(measure)
        }

        // Small delay to let tab switch render
        const timer = setTimeout(() => {
            measure()
        }, 100)

        return () => {
            clearTimeout(timer)
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [stepConfig.target, currentStep])

    // Cleanup RAF on unmount
    useEffect(() => {
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [])

    const hasHighlight = highlightRect !== null
    const padding = 6

    // Decide bubble placement: top-left vs bottom-left
    // Move to top when highlight is in the bottom half OR when it's a large panel covering most of the screen
    const highlightInBottomHalf = hasHighlight && (highlightRect.top + highlightRect.height / 2) > window.innerHeight * 0.5
    const highlightIsLargePanel = hasHighlight && highlightRect.height > window.innerHeight * 0.4
    const bubbleAtTop = highlightInBottomHalf || highlightIsLargePanel

    return (
        <Box
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            zIndex={9999}
            pointerEvents="none"
        >
            {/* Dark overlay with spotlight hole */}
            {hasHighlight ? (
                <Box
                    position="fixed"
                    top={`${highlightRect.top - padding}px`}
                    left={`${highlightRect.left - padding}px`}
                    width={`${highlightRect.width + padding * 2}px`}
                    height={`${highlightRect.height + padding * 2}px`}
                    borderRadius="8px"
                    boxShadow="0 0 0 9999px rgba(0, 0, 0, 0.78)"
                    zIndex={9999}
                    pointerEvents="none"
                    transition="all 0.35s ease"
                />
            ) : (
                <Box
                    position="fixed"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bg="rgba(0, 0, 0, 0.78)"
                    zIndex={9999}
                    pointerEvents="none"
                />
            )}

            {/* Ash + Speech bubble — fixed left, top or bottom depending on highlight position */}
            <Flex
                position="fixed"
                left="16px"
                {...(bubbleAtTop ? { top: "16px" } : { bottom: "16px" })}
                zIndex={10000}
                direction="row"
                alignItems={bubbleAtTop ? "flex-start" : "flex-end"}
                gap={0}
                pointerEvents="auto"
                maxW="calc(100vw - 32px)"
            >
                {/* Ash character */}
                <Image
                    src={ashIcon}
                    w="90px"
                    h="auto"
                    objectFit="contain"
                    flexShrink={0}
                    filter="drop-shadow(0 2px 8px rgba(0,0,0,0.5))"
                    mr={-2}
                    zIndex={10001}
                />

                {/* Bubble */}
                <Box
                    bg="gray.800"
                    border="2px solid"
                    borderColor="yellow.400"
                    borderRadius="12px"
                    p={4}
                    maxW="420px"
                    minW="280px"
                    position="relative"
                    boxShadow="0 4px 20px rgba(0,0,0,0.4)"
                >
                    {/* Triangle tail pointing toward Ash */}
                    <Box
                        position="absolute"
                        bottom="18px"
                        left="-12px"
                        w={0}
                        h={0}
                        borderTop="8px solid transparent"
                        borderBottom="8px solid transparent"
                        borderRight="12px solid"
                        borderRightColor="yellow.400"
                    />
                    <Box
                        position="absolute"
                        bottom="19px"
                        left="-9px"
                        w={0}
                        h={0}
                        borderTop="7px solid transparent"
                        borderBottom="7px solid transparent"
                        borderRight="10px solid"
                        borderRightColor="gray.800"
                    />

                    {/* Step counter */}
                    <Text fontSize="2xs" color="yellow.300" fontWeight="bold" mb={2}>
                        {t("tutorial.stepCounter", { current: currentStep + 1, total: TOTAL_STEPS })}
                    </Text>

                    {/* Tutorial text */}
                    <Text fontSize="xs" color="white" lineHeight="1.6" mb={4}>
                        {t(stepConfig.i18nKey)}
                    </Text>

                    {/* Action buttons */}
                    <Flex gap={2} justifyContent="flex-end">
                        <Button
                            size="xs"
                            variant="ghost"
                            color="gray.400"
                            _hover={{ color: "white" }}
                            onClick={exitTutorial}
                        >
                            {t("tutorial.exit")}
                        </Button>
                        <Button
                            size="xs"
                            colorScheme="yellow"
                            onClick={nextStep}
                        >
                            {currentStep >= TOTAL_STEPS - 1 ? t("common.close") : t("tutorial.next")} →
                        </Button>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}

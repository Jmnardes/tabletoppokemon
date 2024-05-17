import { Button, Center, Heading, Image, Text, useColorMode } from "@chakra-ui/react";
import { diceRoll, parseNumberToNatural } from "../../../util";
import { useEffect, useState } from "react";
import swordIcon from '../../../assets/images/stats/sword.png'
import shieldIcon from '../../../assets/images/stats/shield.png'
import speedIcon from '../../../assets/images/stats/speed.png'
import accuracyIcon from '../../../assets/images/stats/accuracy.svg'
import criticalIcon from '../../../assets/images/stats/critical.svg'
import healthIcon from '../../../assets/images/stats/health.png'
import fightIcon from '../../../assets/images/items/fight.png'
import starIcon from '../../../assets/images/game/star.png'
import Element from '../Team/Element'
import { useContext } from "react";
import PlayerContext from "../../../Contexts/PlayerContext";
import SadIcon from "../../Icons/emote/SadIcon";

export default function GymBlock({ gymTier }) {
    const { player, updateItem, updateCurrency, pokeTeam, setConfetti } = useContext(PlayerContext)
    const { colorMode } = useColorMode()
    const [showResult, setShowResult] = useState(false)
    const [trainerWin, setTrainerWin] = useState(false)
    const [trainer, setTrainer] = useState(gymLeader())
    const [disableButton, setDisableButton] = useState(false)
    const [disableSpecialMove, setDisableSpecialMove] = useState(false)
    const [isSpecialMoveOn, setIsSpecialMoveOn] = useState(false)
    const [winPercentage, setWinPercentage] = useState(0)
    const [gymStats, setGymStats] = useState(gymStrength(gymTier))

    const sumPokeStat = (stat) => {
        return pokeTeam?.reduce((acc, poke) => acc += poke.stats[stat], 0)
    }
    
    function eachStatPercentage(myStat, gymStat, type) {
        if(type === 'hp') {
            let hpDif = 0

            if(gymTier < 3) {
                hpDif = 2
            } else if(gymTier < 6) {
                hpDif = 3
            } else if(gymTier < 9) {
                hpDif = 4
            } else {
                hpDif = 5
            }
            
            if( myStat > gymStat ) return 10 + ( parseNumberToNatural(myStat, hpDif) )
        } else {
            if( myStat > gymStat ) return 10 + (myStat - gymStat)
        }
        if( myStat === gymStat ) return 7
        if( myStat >= (gymStat - 1) ) return 3
        if( myStat >= (gymStat - 2) ) return 2
        if( myStat >= (gymStat - 3) ) {
            return 1
        } else {
            return 0
        }
    }

    function calcWinPercentage() {
        let totalPercentage = 0

        if(pokeTeam) {
            totalPercentage += eachStatPercentage(sumPokeStat('hp'), gymStats.hp, 'hp')
            totalPercentage += eachStatPercentage(sumPokeStat('atk'), gymStats.atk, 'atk')
            totalPercentage += eachStatPercentage(sumPokeStat('def'), gymStats.def, 'def')
            totalPercentage += eachStatPercentage(sumPokeStat('evs'), gymStats.evs, 'evs')
            totalPercentage += eachStatPercentage(sumPokeStat('acc'), gymStats.acc, 'acc')
            totalPercentage += eachStatPercentage(sumPokeStat('crt'), gymStats.crt, 'crt')
        }
        if (isSpecialMoveOn) totalPercentage += 10

        return totalPercentage
    }

    function handleChallengeRoll() {
        let challengeRoll = diceRoll(100)

        setDisableButton(true)
        setShowResult(true)
        if(challengeRoll < winPercentage) {
            setTrainerWin(true)
            updateCurrency(1, 'stars')
            setConfetti(true)
        } else {
            setTrainerWin(false)
        }
    }

    function colorOfStat(myStat, gymStat) {
        if( myStat > gymStat + 2 ) return '#0081cc'
        if( myStat > gymStat + 1 ) return '#00ccb1'
        if( myStat > gymStat ) return '#20c000'
        if( myStat === gymStat ) return '#72ca00'
        if( myStat > (gymStat - 1) ) return '#ced100'
        if( myStat > (gymStat - 2) ) return '#cf9f00'
        if( myStat > (gymStat - 3) ) {
            return '#d15e00'
        } else {
            return '#be1903'
        }
    }

    function colorOfHp(myStat, gymStat, tier) {
        if(tier < 2) {
            if( myStat > gymStat + 4 ) return '#0081cc'
            if( myStat > gymStat + 2 ) return '#00ccb1'
            if( myStat > gymStat ) return '#20c000'
            if( myStat === gymStat ) return '#72ca00'
            if( myStat > (gymStat - 2) ) return '#ced100'
            if( myStat > (gymStat - 4) ) return '#cf9f00'
            if( myStat > (gymStat - 6) ) {
                return '#d15e00'
            } else {
                return '#be1903'
            }
        }
        if(tier < 5) {
            if( myStat > gymStat + 6 ) return '#0081cc'
            if( myStat > gymStat + 3 ) return '#00ccb1'
            if( myStat > gymStat ) return '#20c000'
            if( myStat === gymStat ) return '#72ca00'
            if( myStat > (gymStat - 3) ) return '#ced100'
            if( myStat > (gymStat - 6) ) return '#cf9f00'
            if( myStat > (gymStat - 9) ) {
                return '#d15e00'
            } else {
                return '#be1903'
            }
        }
        if(tier < 8) {
            if( myStat > gymStat + 8 ) return '#0081cc'
            if( myStat > gymStat + 4 ) return '#00ccb1'
            if( myStat > gymStat ) return '#20c000'
            if( myStat === gymStat ) return '#72ca00'
            if( myStat > (gymStat - 4) ) return '#ced100'
            if( myStat > (gymStat - 8) ) return '#cf9f00'
            if( myStat > (gymStat - 12) ) {
                return '#d15e00'
            } else {
                return '#be1903'
            }
        }
        if(tier < 11) {
            if( myStat > gymStat + 10 ) return '#0081cc'
            if( myStat > gymStat + 5 ) return '#00ccb1'
            if( myStat > gymStat ) return '#20c000'
            if( myStat === gymStat ) return '#72ca00'
            if( myStat > (gymStat - 5) ) return '#ced100'
            if( myStat > (gymStat - 10) ) return '#cf9f00'
            if( myStat > (gymStat - 15) ) {
                return '#d15e00'
            } else {
                return '#be1903'
            }
        }
    }

    function overallPercentColor() {
        if(winPercentage < 5) return "#be1903"
        if(winPercentage < 10) return "#d15e00"
        if(winPercentage < 15) return "#cf9f00"
        if(winPercentage < 20) return "#ced100"
        if(winPercentage < 25) return "#72ca00"
        if(winPercentage < 30) return "#20c000"
        if(winPercentage < 35) return "#00ccb1"
        if(winPercentage >= 35) return "#0081cc"
    }

    function handleSpecialMove() {
        setIsSpecialMoveOn(true)
        updateItem(-1, 'fight')
        setDisableSpecialMove(true)
    }

    useEffect(() => {
        setWinPercentage(calcWinPercentage())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Center flexDirection="column">
            <Heading>
                <Center>
                    <Text mb={2} mr={2}>{trainer.name}</Text>
                    <Element element={trainer.element} />
                </Center>
            </Heading>
            {/* <Text mt={2} fontSize="xs">Rock trainer</Text> */}
            <Center mt={6}>
                <Center mx={2}>
                    <Image
                        src={healthIcon} 
                        title={'Health'}
                        w="28px"
                    ></Image>
                    <Text ml={2} fontWeight="bold" fontSize="2xl" color={colorOfHp(sumPokeStat('hp'), gymStats.hp ,gymTier)}>{sumPokeStat('hp')}</Text>
                </Center>
                <Center mx={2}>
                    <Image
                        src={swordIcon} 
                        title={'Attack'}
                        w="28px"
                    ></Image>
                    <Text ml={2} fontWeight="bold" fontSize="2xl" color={colorOfStat(sumPokeStat('atk'), gymStats.atk)}>{sumPokeStat('atk')}</Text>
                </Center>
                <Center mx={2}>
                    <Image
                        src={shieldIcon} 
                        title={'Defense'}
                        w="28px"
                    ></Image>
                    <Text ml={2} fontWeight="bold" fontSize="2xl" color={colorOfStat(sumPokeStat('def'), gymStats.def)}>{sumPokeStat('def')}</Text>
                </Center>
                <Center mx={2}>
                    <Image
                        src={speedIcon} 
                        title={'Evasion'}
                        w="28px"
                    ></Image>
                    <Text ml={2} fontWeight="bold" fontSize="2xl" color={colorOfStat(sumPokeStat('evs'), gymStats.evs)}>{sumPokeStat('evs')}</Text>
                </Center>
                <Center mx={2}>
                    <Image
                        src={accuracyIcon} 
                        title={'Accuracy'}
                        w="28px"
                    ></Image>
                    <Text ml={2} fontWeight="bold" fontSize="2xl" color={colorOfStat(sumPokeStat('acc'), gymStats.acc)}>{sumPokeStat('acc')}</Text>
                </Center>
                <Center mx={2}>
                    <Image
                        src={criticalIcon} 
                        title={'Critical'}
                        w="28px"
                    ></Image>
                    <Text ml={2} fontWeight="bold" fontSize="2xl" color={colorOfStat(sumPokeStat('crt'), gymStats.crt)}>{sumPokeStat('crt')}</Text>
                </Center>
            </Center>
            <Center mt={1}>
                <Text title="God" fontWeight="bold" fontSize="xs" cursor="pointer" mr={1} color="#0081cc">{'Blue >'}</Text>
                <Text title="Very Good" fontWeight="bold" fontSize="xs" cursor="pointer" mr={1} color="#00ccb1">{'Aqua >'}</Text>
                <Text title="Good" fontWeight="bold" fontSize="xs" cursor="pointer" mr={1} color="#20c000">{'Green >'}</Text>
                <Text title="Intersting" fontWeight="bold" fontSize="xs" cursor="pointer" mr={1} color="#72ca00">{'Moss >'}</Text>
                <Text title="Ok" fontWeight="bold" fontSize="xs" cursor="pointer" mr={1} color="#ced100">{'Yellow >'}</Text>
                <Text title="Average" fontWeight="bold" fontSize="xs" cursor="pointer" mr={1} color="#cf9f00">{'Amber >'}</Text>
                <Text title="Bad" fontWeight="bold" fontSize="xs" cursor="pointer" mr={1} color="#d15e00">{'Orange >'}</Text>
                <Text title="Very bad" fontWeight="bold" fontSize="xs" cursor="pointer" color="#be1903">{'Red'}</Text>
            </Center>
            {/* <Text mt={4}>Win chance: {winPercentage}%</Text> */}
            <Center mt={6}>
                <Button mr={2} isDisabled={disableSpecialMove || player.items.fight === 0} onClick={() => handleSpecialMove()}>
                    <Image
                        src={fightIcon} 
                        title={'Increases your chances to win against the Gym'}
                        w="28px"
                    ></Image>
                </Button>
                <Button w={40} border={`2px solid ${overallPercentColor()}`} isDisabled={disableButton} onClick={() => handleChallengeRoll()}>Challenge</Button>
            </Center>

            <Center my={6} w={96} h={32} borderRadius={8} background={colorMode === 'light' ? "gray.200" : "gray.650"}>
                {showResult &&
                    <Text fontSize="3xl" fontWeight="bold">
                        {trainerWin ? (
                            <Image w="58px" src={starIcon} />
                        ) : (
                            <SadIcon w={16} h={16}/>
                        )}
                    </Text>
                }
            </Center>
        </Center>
    )
}

function hpVariation(tier) {
    if(tier < 3) return diceRoll(5)
    if(tier < 6) return diceRoll(7)
    if(tier < 9) {
        return diceRoll(9)
    } else {
        return diceRoll(11)
    }
}

function hpScaling(tier) {
    const hpBase = 3
    if(tier < 3) return (hpBase + (tier * 2) * 3)
    if(tier < 6) return (hpBase + (tier * 3) * 3)
    if(tier < 9) {
        return (hpBase + (tier * 4) * 3)
    } else {
        return (hpBase + (tier * 5) * 3)
    }
}

function evsScaling(tier) {
    if(tier < 4) return 1
    if(tier < 8) {
        return 2
    } else {
        return 3
    }
}

function gymStrength(tier) {
    let baseStatHpScale = hpScaling(tier) + (hpVariation(tier) * 2)
    let baseStatScale = ((tier + 1) * 3) + diceRoll(7)
    let baseStatCrtScale = 3 + diceRoll(7)
    let baseStatEvsScale = (evsScaling(tier) * 3) + diceRoll(7)
    let statDecrease = diceRoll(4)
    let hpDecrease = hpVariation(tier)

    return {
        hp: baseStatHpScale - hpDecrease,
        atk: baseStatScale - statDecrease,
        def: baseStatScale - statDecrease,
        acc: baseStatScale - statDecrease,
        evs: baseStatEvsScale - statDecrease,
        crt: baseStatCrtScale - statDecrease
    }
}

function gymLeader() {
    let leaderRoll = diceRoll(35)

    const leaders = [
        {
            name: 'Giovani',
            element: 'ground'
        },
        {
            name: 'Erika',
            element: 'grass'
        },
        {
            name: 'Brock',
            element: 'rock'
        },
        {
            name: 'Misty',
            element: 'water'
        },
        {
            name: 'L.t Surge',
            element: 'electric'
        },
        {
            name: 'Koga',
            element: 'poison'
        },
        {
            name: 'Sabrina',
            element: 'psychic'
        },
        {
            name: 'Blaine',
            element: 'fire'
        },
        {
            name: 'Falkner',
            element: 'flying'
        },
        {
            name: 'Bugsy',
            element: 'bug'
        },
        {
            name: 'Whitney',
            element: 'normal'
        },
        {
            name: 'Morty',
            element: 'ghost'
        },
        {
            name: 'Chuck',
            element: 'fighting'
        },
        {
            name: 'Jasmine',
            element: 'steel'
        },
        {
            name: 'Pryce',
            element: 'ice'
        },
        {
            name: 'Clair',
            element: 'dragon'
        },
        {
            name: 'Valerie',
            element: 'fairy'
        },
        {
            name: 'Piers',
            element: 'dark'
        },
        {
            name: 'Clay',
            element: 'ground'
        },
        {
            name: 'Gardenia',
            element: 'grass'
        },
        {
            name: 'Roxanne',
            element: 'rock'
        },
        {
            name: 'Wallace',
            element: 'water'
        },
        {
            name: 'Wattson',
            element: 'electric'
        },
        {
            name: 'Roxie',
            element: 'poison'
        },
        {
            name: 'Tate and Liza',
            element: 'psychic'
        },
        {
            name: 'Flannery',
            element: 'fire'
        },
        {
            name: 'Winona',
            element: 'flying'
        },
        {
            name: 'Burgh',
            element: 'bug'
        },
        {
            name: 'Norman',
            element: 'normal'
        },
        {
            name: 'Fantina',
            element: 'ghost'
        },
        {
            name: 'Brawly',
            element: 'fighting'
        },
        {
            name: 'Byron',
            element: 'steel'
        },
        {
            name: 'Candice',
            element: 'ice'
        },
        {
            name: 'Iris',
            element: 'dragon'
        },
        {
            name: ' Opal',
            element: 'fairy'
        },
        {
            name: 'Marnie',
            element: 'dark'
        },
    ]

    return leaders[leaderRoll]
}
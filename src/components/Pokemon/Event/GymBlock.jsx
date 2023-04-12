import { Button, Center, Heading, Image, Text, useColorMode } from "@chakra-ui/react";
import { diceRoll, parseNumberToNatural } from "../../../util";
import { useEffect, useState } from "react";
import swordIcon from '../../../assets/images/stats/sword.png'
import shieldIcon from '../../../assets/images/stats/shield.png'
import speedIcon from '../../../assets/images/stats/speed.png'
import healthIcon from '../../../assets/images/stats/health.png'
import fightIcon from '../../../assets/images/items/fight.png'

import { useContext } from "react";
import PlayerContext from "../../../Contexts/PlayerContext";

export default function GymBlock({ gymTier, team, setConfetti }) {
    const { colorMode } = useColorMode()
    const [showResult, setShowResult] = useState(false)
    const [trainerWin, setTrainerWin] = useState(false)
    const [trainerName, setTrainerName] = useState('')
    const [disableButton, setDisableButton] = useState(false)
    const [disableSpecialMove, setDisableSpecialMove] = useState(false)
    const [isSpecialMoveOn, setIsSpecialMoveOn] = useState(false)
    const [winPercentage, setWinPercentage] = useState(0)
    const [gymStats, setGymStats] = useState({
        hp: 0,
        atk: 0,
        def: 0,
        spd: 0
    })
    const { player, updateItem, updateCurrency } = useContext(PlayerContext)

    function eachStatPercentage(myStat, gymStat, type) {
        if(type === 'hp') {
            let hpDif = 0

            if(gymTier < 2) {
                hpDif = 2
            } else if(gymTier < 5) {
                hpDif = 3
            } else if(gymTier < 8) {
                hpDif = 4
            } else {
                hpDif = 5
            }
            
            if( myStat > gymStat ) return 10 + ( parseNumberToNatural(myStat, hpDif) )
        } else {
            if( myStat > gymStat ) return 10 + (myStat - gymStat)
        }
        if( myStat === gymStat ) return 7
        if( myStat >= (gymStat - 2) ) return 3
        if( myStat >= (gymStat - 4) ) return 2
        if( myStat >= (gymStat - 6) ) {
            return 1
        } else {
            return 0
        }
    }

    function calcWinPercentage() {
        let totalPercentage = 0

        if(team) {
            totalPercentage += eachStatPercentage(team('hp'), gymStats.hp, 'hp')
            totalPercentage += eachStatPercentage(team('atk'), gymStats.atk, 'atk')
            totalPercentage += eachStatPercentage(team('def'), gymStats.def, 'def')
            totalPercentage += eachStatPercentage(team('spd'), gymStats.spd, 'spd')
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
            // setConfetti(true)
        } else {
            setTrainerWin(false)
        }
    }

    function colorOfStat(myStat, gymStat) {
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
    }, [team])

    useEffect(() => {
        setDisableButton(false)
        setGymStats(gymStrength(gymTier))
        setTrainerName(gymLeader().name)

        // if (disable) {
        //     setShowResult(false)
        //     setDisableSpecialMove(false)
        //     setIsSpecialMoveOn(false)
        // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Center flexDirection="column">
            <Heading>{trainerName}</Heading>
            {/* <Text mt={2} fontSize="xs">Rock trainer</Text> */}
            <Center mt={12}>
                <Center mx={2}>
                    <Image
                        src={healthIcon} 
                        title={'Health'}
                        w="28px"
                    ></Image>
                    <Text ml={2} fontWeight="bold" fontSize="2xl" color={colorOfHp(team('hp'),gymStats.hp ,gymTier)}>{team('hp')}</Text>
                </Center>
                <Center mx={2}>
                    <Image
                        src={swordIcon} 
                        title={'Attack'}
                        w="28px"
                    ></Image>
                    <Text ml={2} fontWeight="bold" fontSize="2xl" color={colorOfStat(team('atk'),gymStats.atk)}>{team('atk')}</Text>
                </Center>
                <Center mx={2}>
                    <Image
                        src={shieldIcon} 
                        title={'Defense'}
                        w="28px"
                    ></Image>
                    <Text ml={2} fontWeight="bold" fontSize="2xl" color={colorOfStat(team('def'),gymStats.def)}>{team('def')}</Text>
                </Center>
                <Center mx={2}>
                    <Image
                        src={speedIcon} 
                        title={'Speed'}
                        w="28px"
                    ></Image>
                    <Text ml={2} fontWeight="bold" fontSize="2xl" color={colorOfStat(team('spd'),gymStats.spd)}>{team('spd')}</Text>
                </Center>
            </Center>
            <Center mt={4}>
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
            <Center>
                <Button mt={8} mr={2} isDisabled={disableSpecialMove || player.items.fight === 0} onClick={() => handleSpecialMove()}>
                    <Image
                        src={fightIcon} 
                        title={'Increases your chances to win against the Gym'}
                        w="28px"
                    ></Image>
                </Button>
                <Button mt={8} w={40} border={`2px solid ${overallPercentColor()}`} isDisabled={disableButton} onClick={() => handleChallengeRoll()}>Challenge</Button>
            </Center>

            <Center mt={12} w={96} h={32} borderRadius={8} background={colorMode === 'light' ? "gray.200" : "gray.650"}>
                {showResult &&
                    <Text fontSize="3xl" fontWeight="bold" color={trainerWin ? 'green' : 'red'}>
                        {trainerWin ? 'You won!' : 'You lost!'}
                    </Text>
                }
            </Center>
        </Center>
    )
}

function hpRollPerTier(tier) {
    if(tier < 2) return diceRoll(5)
    if(tier < 5) return diceRoll(10)
    if(tier < 8) return diceRoll(13)
    if(tier < 11) return diceRoll(16)
}

function gymStrength(tier) {
    let hpRoll = hpRollPerTier(tier)
    let atkRoll = diceRoll(5)
    let defRoll = diceRoll(4)
    let spdRoll = diceRoll(5)

    if(tier === 1) return {
        hp: 17 + hpRoll,
        atk: 8 + atkRoll,
        def: 17 + defRoll,
        spd: 16 + spdRoll
    }

    if(tier === 2) return {
        hp: 22 + hpRoll,
        atk: 12 + atkRoll,
        def: 17 + defRoll,
        spd: 19 + spdRoll
    }
    
    if(tier === 3) return {
        hp: 29 + hpRoll,
        atk: 15 + atkRoll,
        def: 20 + defRoll,
        spd: 22 + spdRoll
    }
    
    if(tier === 4) return {
        hp: 42 + hpRoll,
        atk: 22 + atkRoll,
        def: 20 + defRoll,
        spd: 25 + spdRoll
    }
    
    if(tier === 5) return {
        hp: 47 + hpRoll,
        atk: 23 + atkRoll,
        def: 22 + defRoll,
        spd: 28 + spdRoll
    }
    
    if(tier === 6) return {
        hp: 55 + hpRoll,
        atk: 26 + atkRoll,
        def: 21 + defRoll,
        spd: 32 + spdRoll
    }
    
    if(tier === 7) return {
        hp: 78 + hpRoll,
        atk: 32 + atkRoll,
        def: 24 + defRoll,
        spd: 35 + spdRoll
    }
    
    if(tier === 8) return {
        hp: 89 + hpRoll,
        atk: 34 + atkRoll,
        def: 25 + defRoll,
        spd: 37 + spdRoll
    }
    
    if(tier === 9) return {
        hp: 111 + hpRoll,
        atk: 37 + atkRoll,
        def: 29 + defRoll,
        spd: 42 + spdRoll
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
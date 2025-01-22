import { Flex, Image, Text, useToast } from "@chakra-ui/react";
import { createContext, useCallback, useEffect, useState } from "react";
import socket from '@client'
import { rarityName, stringToUpperCase } from "@utils";

const PlayerContext = createContext();

export function PlayerProvider({children}) {
    const toast = useToast()
    const [loadingApi, setLoadingApi] = useState(false)
    const [loadingText, setLoadingText] = useState('')
    const [hasGameStarted, setHasGameStarted] = useState(false)
    const [waitingForPlayers, setWaitingForPlayers] = useState(false)
    const [session, setSession] = useState({})
    const [opponents, setOpponents] = useState([])
    const [player, setPlayer] = useState({})
    const [encounter, setEncounter] = useState({})
    const [pokeTeam, setPokeTeam] = useState([])
    const [pokeBox, setPokeBox] = useState([])
    const [results, setResults] = useState({})
    const [game, setGame] = useState({
        gameEnded: false,
        isPokemonRollDisabled: false,
        openPokeShop: false,
        updateShop: false,
        showBagLength: false,
        openChallengeModal: false,
        openWalkModal: false,
        openGymModal: false,
        openEncounterModal: false,
        openSelectScreenModal: false,
        openPokeBoxModal: false,
        openBattleModal: false,
        openDayCareModal: false,
        openPokeItemModal: false,
    })

    const emit = useCallback((name, data) => {
        const request = {
            id: player.id,
            sessionCode: session.sessionCode,
            data,
        }

        socket.emit(name, request)
    }, [player, session])
    
    const handleToast = (args) => {
        let bgColor = "gray.400"

        if(args.status === 'error') bgColor = 'red.400'
        if(args.status === 'warning') bgColor = 'orange.400'
        if(args.status === 'success') bgColor = 'green.400'
        if(args.status === 'info') bgColor = 'blue.400'

        if (!toast.isActive(args.id)) {
            toast({
                ...args, 
                duration: args.duration ?? 6000,
                render: ({ onClose }) => (
                    <Flex p={4} borderRadius={8} bg={bgColor} onClick={onClose}>
                        {args.icon && args.icon}
                        <Flex ml={2} flexDir="column">
                            <Text mb={2}>{args.title}</Text>
                            <Text fontSize="2xs">{args.description}</Text>
                        </Flex>
                    </Flex>
                ),
            })
        }
    }

    /* TOAST PROPS
        id,
        title,
        description,
        status,
        icon,
        position,
        duration,
        isClosable */

    const updateGame = (newData) => {setGame(old => ({...old, ...newData}))}

    const updatePlayer = useCallback((amount, key, type) => {
        if(type) {
            const newObj = { ...player[key] }
    
            newObj[type] = amount
    
            setPlayer({...player, [key]: newObj})
        } else {
            setPlayer({...player, [key]: amount})
        }
    }, [player])

    const updateOpponent = useCallback((id, value, key, type = null) => {
        if(type) {
            setOpponents((old => old.map(opponent => {
                if (opponent.id === id) {
                    const newObj = { ...opponent[key] }
                    newObj[type] = value
                    return { ...opponent, [key]: newObj }
                }
                else return opponent
            })))
        } else {
            setOpponents((old => old.map(opponent => {
                return (opponent.id === id) ? { ...opponent, [key]: value } : opponent
            })))
        }
    }, [])
    const updateOpponents = useCallback((value, key, type = null) => {
        if(type) {
            setOpponents((old => old.map(opponent => {
                const newObj = { ...opponent[key] }
                newObj[type] = value
                return { ...opponent, [key]: newObj }
            })))
        } else {
            setOpponents((old => old.map(opponent => ({ ...opponent, [key]: value }))))
        }
    }, [])
    const newOpponent = (opponent) => setOpponents(old => [...old, opponent])
    const removeOpponentById = (id) => setOpponents(old => old.filter(player => player.id!== id))

    const updatePokeTeam = (poke) => setPokeTeam(old => old ? [...old, poke] : [poke])
    const updatePokemonOnTeam = (updatedPoke) => {
        setPokeTeam(old => old.map(poke => {
            if(poke.id === updatedPoke.id) {
                return updatedPoke
            }
            return poke
        }))
    }
    const updatePokeBox = (poke) => setPokeBox(old => old ? [...old, poke] : [poke])
    const removeFromPokeTeam = (poke, arr) => {
        // eslint-disable-next-line array-callback-return
        arr.filter((data, index) => {
            if(data.id === poke.id) {
                arr.splice(index, 1)
            }
            setPokeTeam(arr)
        })
    }
    const removeFromPokeBox = (poke, arr) => {
        // eslint-disable-next-line array-callback-return
        arr.filter((data, index) => {
            if(data.id === poke.id) {
                arr.splice(index, 1)
            }
            setPokeBox(arr)
        })
    }
    const removeFromPokeBoxById = (id, arr) => {
        // eslint-disable-next-line array-callback-return
        arr.filter((data, index) => {
            if(data.id === id) {
                arr.splice(index, 1)
            }
            setPokeBox(arr)
        })
    }

    const changeBall = (amount, which) => updatePlayer(amount, 'balls', which)
    const updateBall = (amount, which) => updatePlayer(player.balls[which] + amount, 'balls', which)

    const updatePokeball = (amount) => updateBall(amount, 'pokeball')
    const updateGreatball = (amount) => updateBall(amount, 'greatball')
    const updateUltraball = (amount) => updateBall(amount, 'ultraball')
    const updateMasterball = (amount) => updateBall(amount,'masterball')

    const changeItem = (amount, type) => updatePlayer(amount, 'items', type)
    const updateItem = (amount, type) => updatePlayer(player.items[type] + amount, 'items', type)

    // const changeCurrency = (qty, which) => {
    //     let newQty = player.currency[which] + qty;
    //     if (newQty < 0) {
    //         newQty = 0;
    //     }
    //     updatePlayer(newQty, 'currency', which)
    // }
    const updateCurrency = (amount, which) => {
        const newAmount = player.currency[which] + amount;
        updatePlayer(newAmount < 0 ? 0 : newAmount, 'currency', which);
    }

    const updateCoins = (amount) => updateCurrency(amount, 'coins')
    const updateStars = (amount) => updateCurrency(amount, 'stars')
    const updateCrowns = (amount) => updateCurrency(amount, 'crowns')

    const updateStatus = (status) => updatePlayer(player.status[status]++, 'status', status)
    const updateStatusAmount = (amount, status) => updatePlayer(player.status[status] + amount, 'status', status)

    const updateLoading = (bool) => setLoadingApi(bool)

    useEffect(() => {
        if (player.status) {
            emit('player-update-status', { level: player.status.level })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [player.status?.level])

    useEffect(() => {
        if (player.currency) {
            emit('player-update-currency', player.currency)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [player.currency?.coins, player.currency?.stars, player.currency?.crowns])

    useEffect(() => {
        socket.on('error', res => {
            if(Object.keys(res)) {
                handleToast({
                    id: 'error',
                    title: 'Error',
                    description: res,
                    status: 'error',
                    position: 'top'
                })
            }
        })

            // SESSION
        socket.on('session-join', (res) => {
            setSession(res.session)
            setOpponents(res.opponents)
            setPlayer(res.player)

            localStorage.setItem('session', JSON.stringify(res.session))
        })

        socket.on('session-join-other', res => {
            handleToast({
                id: 'opponent-join',
                title: `${res.status.trainerName} joined the room`,
                status: 'info',
            })
            newOpponent(res)
        })

        socket.on('session-leave-other', res => {
            handleToast({
                id: 'opponent-left',
                title: `${res.name} left the room`,
                status: 'info',
            })
            removeOpponentById(res.id)
        })

        socket.on('player-session-disconnected', res => {
            handleToast({
                id: 'session-disconnection',
                title: 'User disconnected',
                description: `${res} was disconnected from the server`,
                status: 'error',
            })
            updateLoading(true)
        })

        socket.on('player-session-reconnected', res => {
            handleToast({
                id: 'session-reconnection',
                title: 'User reconnected',
                description: `${res} reconnected`,
                status: 'success',
            })
            updateLoading(false)
        })

            // LOBBY
        socket.on('lobby-ready', res => {
            setPlayer(old => ({ ...old, ready: res }))
        })

        socket.on('lobby-ready-other', res => {
            updateOpponent(res.id, res.ready, 'ready')
        })

        socket.on('lobby-start', (res) => {
            setEncounter([...res.starters])
            setHasGameStarted(true)
            updateGame({ openEncounterModal: true })
        })

            //TURNS
        // receiveng other players turn ready
        socket.on('turn-end-other', res => {
            updateOpponent(res, true, 'turnReady')
        })

        socket.on('game-end', res => {
            setResults(res)
            updateGame({ gameEnded: true })
        })
        
            //PLAYERS
        socket.on('player-update-status-other', res => {
            updateOpponent(res.id, res.data, 'status')
        })

        socket.on('player-update-currency-other', res => {
            updateOpponent(res.id, res.data, 'currency')
        })

        socket.on('player-capture-pokemon', res => {
            updateLoading(false)
            // console.log('catch pokemon:', res)
            handleToast({
                id: 'catch',
                title: 'You caught a Pokémon!',
                description: (
                    'lv.' + res.pokemon.level + ' ' + stringToUpperCase(res.pokemon.name) + ' | ' + 
                    'Rarity: ' + rarityName(res.pokemon.rarity.rarity)
                ),
                icon: <Image 
                        width="32px"
                        src={res.pokemon.sprites.mini} 
                        fallbackSrc={res.pokemon.sprites.front}
                    ></Image>,
                duration: 5000,
                position: 'bottom-left',
                status: 'success',
            })

            if (res.catches > 3) {
                updatePokeBox(res.pokemon)
                updateGame({ showBagLength: true })
            } else {
                updatePokeTeam(res.pokemon)
            }

            updateGame({ openEncounterModal: false })
        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <PlayerContext.Provider value={{
            emit,
            handleToast,

            loadingApi,
            setLoadingApi,
            loadingText,
            setLoadingText,

            session,
            setSession,

            opponents,
            setOpponents,
            updateOpponent,
            updateOpponents,

            player,
            setPlayer,
            updatePlayer,

            encounter,
            setEncounter,

            hasGameStarted,
            setHasGameStarted,

            waitingForPlayers,
            setWaitingForPlayers,

            game,
            updateGame,

            pokeTeam,
            updatePokeTeam,
            updatePokemonOnTeam,
            removeFromPokeTeam,
            pokeBox,
            updatePokeBox,
            removeFromPokeBox,
            removeFromPokeBoxById,

            // changeCurrency,
            updateCurrency,
            updateCoins,
            updateStars,
            updateCrowns,

            updateBall,
            changeBall,
            updatePokeball,
            updateGreatball,
            updateUltraball,
            updateMasterball,
            
            updateItem,
            changeItem,

            updateStatus,
            updateStatusAmount,

            results,
        }}>
            {children}
        </PlayerContext.Provider>
    )
}

export default PlayerContext;
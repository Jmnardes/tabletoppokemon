import { Center, Flex, Image, Kbd, Text } from "@chakra-ui/react";
import { useContext } from "react";
import PlayerContext from "../../../../Contexts/PlayerContext";
import { stringToUpperCase, typeColor } from "../../../../util";
import PokemonTable from "../../Table/PokemonTable";
import Types from "../../Table/Types";
import TeamTitle from "../../Team/TeamTitle";

export default function ShowBattleTeam({ battleTeam, setBattleTeam }) {
    const { updatePokeBox } = useContext(PlayerContext)
    
    const updateBattleTeam = (poke, arr) => {
        // eslint-disable-next-line array-callback-return
        arr?.filter((data, index) => {
            if(data.id === poke.id) {
                arr.splice(index, 1)
            }
            setBattleTeam(arr)
        })
    }

    const BattlePokeCard = ({ poke }) => {
        let color = typeColor(poke.types)

        const rarityColor = (rarity) => {
            if(rarity === 1) return '#ff666690'
            if(rarity === 2) return '#4682B4'
            if(rarity === 3) return '#d4af37'
            return '#FFFFFF50'
        }

        return (
            <Center px={2}>
                <Flex
                    alignItems="center"
                    flexDirection="column"
                    border={`8px ridge ${rarityColor(poke.rarity.rarity)}`}
                    borderRadius={8}
                    my={1}
                    p={1}
                    // backgroundColor={`${color}99`}
                    background={ poke.shiny ? `linear-gradient(165deg, ${color}15 15%, ${color} 50%, ${color}15 85%)` : ''}
                    shadow="dark-lg"
                    _hover={{
                        backgroundColor: `${color}`
                    }}
                    onClick={() => {
                        updateBattleTeam(poke, battleTeam)
                        updatePokeBox(poke)
                    }}
                >
                    <Flex flexDirection="column">
                        <Center pb={2}>
                            <Flex textAlign="center" flexDirection={"column"}>
                                <Center>
                                    {/* {poke.shiny && <FaStar title="Shiny" size={8}/>} */}
                                    <Text fontWeight="bold" ml={1.5} letterSpacing={2}>
                                        {stringToUpperCase(poke.name)}
                                    </Text>
                                </Center>
                                <Center>
                                    <Kbd w="fit-content">
                                        <Center flexDir="row">
                                            {poke.tier} - {stringToUpperCase(poke.nature)} - <Types types={poke.types} w={3} h={3}/>
                                        </Center>
                                    </Kbd>
                                </Center>
                            </Flex>
                        </Center>
                        <Center background={color} borderRadius={8}>
                            <Image
                                w={52}
                                title={stringToUpperCase(poke.name)} 
                                src={poke.sprites.front}
                            />
                        </Center>

                        <PokemonTable
                            health={poke.stats.hp}
                            attack={poke.stats.atk}
                            defense={poke.stats.def}
                            accuracy={poke.stats.acc}
                            evasion={poke.stats.evs}
                            critical={poke.stats.crt}
                            tier={poke.tier}
                            type={poke.types}
                            nature={poke.nature}
                            name={poke.name}
                            shiny={poke.shiny}
                        />
                    </Flex>
                </Flex>
            </Center>
        )
    }

    return (
        <Center flexDir="column">
            <TeamTitle pokeTeam={battleTeam} />
            <Center pt={4}>
                {battleTeam?.map(poke => {
                    return <BattlePokeCard key={poke.id} poke={poke} />
                })}
            </Center>
        </Center>
    )
}
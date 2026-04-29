/* eslint-disable array-callback-return */
import { Center, Image, Text, Tooltip } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { stringToUpperCase } from "@utils";

import bug from '@assets/images/elements/bug.webp'
import dark from '@assets/images/elements/dark.webp'
import dragon from '@assets/images/elements/dragon.webp'
import electric from '@assets/images/elements/electric.webp'
import fairy from '@assets/images/elements/fairy.webp'
import fighting from '@assets/images/elements/fighting.webp'
import fire from '@assets/images/elements/fire.webp'
import flying from '@assets/images/elements/flying.webp'
import ghost from '@assets/images/elements/ghost.png'
import grass from '@assets/images/elements/grass.png'
import ground from '@assets/images/elements/ground.webp'
import ice from '@assets/images/elements/ice.webp'
import normal from '@assets/images/elements/normal.webp'
import psychic from '@assets/images/elements/psychic.webp'
import poison from '@assets/images/elements/poison.webp'
import rock from '@assets/images/elements/rock.webp'
import steel from '@assets/images/elements/steel.webp'
import water from '@assets/images/elements/water.webp'

import elements from '@assets/json/elements.json'

export default function Element({ element, elementTable, w = 5, h = 5 }) {
    const [elementsTooltip, setElementsTooltip] = useState('')

    const ElementComponent = React.forwardRef(({ type, icon }, ref) => {
        return (
            <Tooltip ref={ref} label={elementTable ? (
                elementsTooltip
            ) : (
                <Text>{type}</Text>
            )} borderRadius={16}>
                <Image
                    _hover={{ opacity: '0.6' }}
                    cursor="pointer"
                    key={type} 
                    src={icon}
                    w={w} 
                    h={h}
                    mx={2}
                    ml={!elementTable && 1}
                    my={!elementTable && 0.5}
                />
            </Tooltip>
        )
    })

    const ElementImage = ({ t }) => {
        return (
            <Image
                key={t} 
                src={iconType(t)}
                w={6} 
                h={6} 
                mx={1}
            />
        )
    }

    const ElementTooltip = () => {
        setElementsTooltip(() => {
            let atackEffective = elements[element].attack_effective
            let attackIneffective = elements[element].attack_ineffective
            let defenseEffective = elements[element].defense_effective
            let defenseIneffective = elements[element].defense_ineffective
            return (
                <Center w="100%" flexDirection="column">
                    <Text fontWeight="bold">{stringToUpperCase(element)}</Text>
                    <Text pt={1}>Hits effective</Text>
                    <Center pb={1} flexDirection="row">
                        {atackEffective.map(t => {
                            if(t) {
                                return (
                                    <ElementImage key={t} t={t} />
                                )
                            } else {
                                return <Text key={'none'} fontSize="xs">None</Text>
                            }
                        })}
                    </Center>
                    <Text pt={1}>Hits ineffective</Text>
                    <Center pb={1} flexDirection="row">
                        {attackIneffective.map(t => {
                            if(t) {
                                return (
                                    <ElementImage key={t} t={t} />
                                )
                            } else {
                                return <Text key={'none'} fontSize="xs">None</Text>
                            }
                        })}
                    </Center>
                    <Text pt={1}>Receives ineffective</Text>
                    <Center pb={1} flexDirection="row">
                        {defenseEffective.map(t => {
                            if(t) {
                                return (
                                    <ElementImage key={t} t={t} />
                                )
                            } else {
                                return <Text key={'none'} fontSize="xs">None</Text>
                            }
                        })}
                    </Center>
                    <Text pt={1}>Receives effective</Text>
                    <Center pb={1} flexDirection="row">
                        {defenseIneffective.map(t => {
                            if(t) {
                                return (
                                    <ElementImage key={t} t={t} />
                                )
                            } else {
                                return <Text key={'none'} fontSize="xs">None</Text>
                            }
                        })}
                    </Center>
                </Center>
            )
        })
    }

    const iconType = (type) => {
        if(type === 'bug') return bug
        if(type === 'dark') return dark
        if(type === 'dragon') return dragon
        if(type === 'electric') return electric
        if(type === 'fairy') return fairy
        if(type === 'fighting') return fighting
        if(type === 'fire') return fire
        if(type === 'flying') return flying
        if(type === 'ghost') return ghost
        if(type === 'grass') return grass
        if(type === 'ground') return ground
        if(type === 'ice') return ice
        if(type === 'normal') return normal
        if(type === 'psychic') return psychic
        if(type === 'poison') return poison
        if(type === 'rock') return rock
        if(type === 'steel') return steel
        if(type === 'water') return water
    }

    useEffect(() => {
        ElementTooltip()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Center>
            <Tooltip label={elementsTooltip} borderRadius={16}>
                <ElementComponent type={element} icon={iconType(element)}/>
            </Tooltip>
        </Center>
    )
}



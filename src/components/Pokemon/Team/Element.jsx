/* eslint-disable array-callback-return */
import { Center, Image, Text, Tooltip } from "@chakra-ui/react";

import bug from '../../../assets/images/elements/bug.webp'
import dark from '../../../assets/images/elements/dark.webp'
import dragon from '../../../assets/images/elements/dragon.webp'
import electric from '../../../assets/images/elements/electric.webp'
import fairy from '../../../assets/images/elements/fairy.webp'
import fighting from '../../../assets/images/elements/fighting.webp'
import fire from '../../../assets/images/elements/fire.webp'
import flying from '../../../assets/images/elements/flying.webp'
import ghost from '../../../assets/images/elements/ghost.png'
import grass from '../../../assets/images/elements/grass.png'
import ground from '../../../assets/images/elements/ground.webp'
import ice from '../../../assets/images/elements/ice.webp'
import normal from '../../../assets/images/elements/normal.webp'
import psychic from '../../../assets/images/elements/psychic.webp'
import poison from '../../../assets/images/elements/poison.webp'
import rock from '../../../assets/images/elements/rock.webp'
import steel from '../../../assets/images/elements/steel.webp'
import water from '../../../assets/images/elements/water.webp'

import { typeAdvantage, typeDisadvantage } from "../../../util";
import { useEffect, useState } from "react";

export default function Element({ element }) {
    const [elementsTooltip, setElementsTooltip] = useState('')

    function elementsTable(type, isAdvantage) {
        let types = []

        if(type) {
            isAdvantage ? type = typeAdvantage(type) : type = typeDisadvantage(type)
            type.map((t) => {
                types.push(t)
            })
        }

        return types
    }

    const ElementComponent = ({ type, icon }) => {
        return (
            <Tooltip label={elementsTooltip} borderRadius={16}>
                <Image
                    cursor="pointer"
                    key={type} 
                    src={icon}
                    w={6} 
                    h={6} 
                    mx={2}
                />
            </Tooltip>
        )
    }

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
            let strenghtness = elementsTable(element, true)
            let weakness = elementsTable(element, false)
            return (
                <Center mb={4} w="100%" flexDirection="column">
                    <Text p={4}>Strong against</Text>
                    <Center flexDirection="row">
                        {strenghtness.map(t => {
                            if(t) {
                                return (
                                    <ElementImage key={t} t={t} />
                                )
                            } else {
                                return <Text key={'none'} fontSize="xs">None</Text>
                            }
                        })}
                    </Center>
                    <Text p={4}>Weak against</Text>
                    <Center flexDirection="row">
                        {weakness.map(t => {
                            return (
                                <ElementImage key={t} t={t} />
                            )
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
    }, [])

    return (
        <Center>
            <Tooltip label={elementsTooltip} borderRadius={16}>
                <ElementComponent type={element} icon={iconType(element)}/>
            </Tooltip>
        </Center>
    )
}



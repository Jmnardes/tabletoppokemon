import { Center, Kbd, Text, Tooltip } from "@chakra-ui/react";
import { stringToUpperCase } from "@utils";
import { useState } from "react";
import Types from "./Types";
import { useEffect } from "react";
import { FaStar } from "react-icons/fa"

export default function CardTitle({ poke }) {
    const [titleStatsTooltip, setTitleStatsTooltip] = useState('')

    const PokeRarity = ({ quantity }) => {
        const renderStars = () => {
          const stars = [];
          
          for (let i = 0; i < quantity; i++) {
            stars.push(<FaStar key={i} size={12} />);
          }
      
          return stars;
        };
      
        return renderStars();
    };

    const TitleTooltip = () => {
        setTitleStatsTooltip(() => {
            return (
                <Center alignItems="center" justifyContent="center" flexDir="column">
                    {/* <Center mt={2}>
                        <PokeRarity quantity={poke.rarity.rarity} />
                    </Center> */}
                    <Text my={2} fontSize="xs" fontWeight="bold">
                        {stringToUpperCase(poke.nature)}
                    </Text>
                    <Types types={poke.types} w={6} h={6}/>
                </Center>
            )
        })
    }

    /* eslint-disable */
    useEffect(() => {
        TitleTooltip()
    }, [poke])

    return (
        <Tooltip label={titleStatsTooltip} placement="top" h={24} w={36} borderRadius={8}>
            <Center flexDirection={"column"}>
                {/* <Kbd fontSize={"2xl"} fontWeight="bold" ml={1.5} letterSpacing={2}> */}
                <Text fontFamily={"Press Start 2P"}>
                    {stringToUpperCase(poke.name)}
                </Text>
                {/* </Kbd> */}
            </Center>
        </Tooltip>
    )
}
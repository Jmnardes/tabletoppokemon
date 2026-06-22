import { Box, Button, Heading, Text, SimpleGrid, VStack, Image, Tooltip, Badge, useColorMode } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import pokeballIcon from '@assets/images/pokeballs/pokeball.png'
import greatballIcon from '@assets/images/pokeballs/greatball.png'
import ultraballIcon from '@assets/images/pokeballs/ultraball.png'
import masterballIcon from '@assets/images/pokeballs/masterball.png'
import dustIcon from '@assets/images/items/dust.png'
import lureIcon from '@assets/images/items/lure.png'
import potionIcon from '@assets/images/items/potion.png'
import superPotionIcon from '@assets/images/items/super-potion.png'
import hyperPotionIcon from '@assets/images/items/hyper-potion.png'
import gymTicketIcon from '@assets/images/game/gym-ticket.png'

export default function ItemsGuide({ goBack }) {
    const { t } = useTranslation();
    const { colorMode } = useColorMode();

    const balls = [
        { name: "Pok\u00e9ball", bonus: "\u2014", icon: pokeballIcon, desc: t('consulta.itemPokeball') },
        { name: "Great Ball", bonus: "+15%", icon: greatballIcon, desc: t('consulta.itemGreatball') },
        { name: "Ultra Ball", bonus: "+30%", icon: ultraballIcon, desc: t('consulta.itemUltraball') },
        { name: "Master Ball", bonus: "100%", icon: masterballIcon, desc: t('consulta.itemMasterball') },
    ];

    const items = [
        { name: "Dust", icon: dustIcon, desc: t('consulta.itemDust') },
        { name: "Incense", icon: lureIcon, desc: t('consulta.itemIncense') },
        { name: "Potion", icon: potionIcon, desc: t('consulta.itemPotion') },
        { name: "Super Potion", icon: superPotionIcon, desc: t('consulta.itemSuperPotion') },
        { name: "Hyper Potion", icon: hyperPotionIcon, desc: t('consulta.itemHyperPotion') },
        { name: "Gym Ticket", icon: gymTicketIcon, desc: t('consulta.itemGymTicket') },
    ];

    const renderItem = (item, showBonus = false) => (
        <Tooltip
            key={item.name}
            label={
                <VStack spacing={1} p={1}>
                    <Text fontWeight="bold">{item.name}</Text>
                    <Text fontSize="sm">{item.desc}</Text>
                </VStack>
            }
            hasArrow
        >
            <VStack
                p={3}
                borderRadius={8}
                bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
                border="1px solid"
                borderColor={colorMode === 'light' ? 'gray.300' : 'gray.600'}
                cursor="pointer"
                _hover={{ borderColor: 'blue.400', bg: colorMode === 'light' ? 'gray.200' : 'gray.600' }}
                minH="80px"
                justify="center"
            >
                <Image src={item.icon} w={8} h={8} />
                <Text fontSize="xs" fontWeight="bold" textAlign="center">{item.name}</Text>
                {showBonus && (
                    <Badge colorScheme="purple">{item.bonus}</Badge>
                )}
            </VStack>
        </Tooltip>
    );

    return (
        <Box p={5}>
            <Button mb={6} onClick={goBack}>
                {t('common.back')}
            </Button>
            <Heading size="md" mb={4}>{t('consulta.items')}</Heading>

            <Heading size="sm" mb={3}>{t('consulta.pokeballs')}</Heading>
            <SimpleGrid columns={[2, 4]} spacing={3} mb={6}>
                {balls.map(ball => renderItem(ball, true))}
            </SimpleGrid>

            <Heading size="sm" mb={3}>{t('consulta.specialItems')}</Heading>
            <SimpleGrid columns={[2, 3]} spacing={3}>
                {items.map(item => renderItem(item))}
            </SimpleGrid>
        </Box>
    );
}

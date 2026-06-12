import { Button, Center, Image, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Element from "@features/elements/Element";
import { stringToUpperCase } from "@utils"

export default function ChooseAttack({ 
    capturedPokemon, 
    attackType, 
    setAttackType,
    specialType,
    setSpecialType,
    setChooseAttackType
}) {
    const { t } = useTranslation()
    const ChooseTypes = ({ title, setter, selectedType, types }) => {
        return (
            <Center flex flexDir={"column"}>
                <Text fontSize={"small"}>{title}</Text>
                <Center m={4} gap={4}>
                    {types.map((type) => (
                        <Button
                            key={type}
                            onClick={() => setter(type)}
                            isDisabled={type === selectedType}
                            border={type === selectedType ? '2px solid' : 'none'}
                        >
                            <Element element={type} w={8} h={8} />
                        </Button>
                    ))}
                </Center>
            </Center>
        );
    };

    return (
        <>
            <Center flex flexDir={"column"}>
                <Text>{t('encounter.caughtPokemon')}</Text>
                <Text mt={4} fontSize={"2xl"}>{stringToUpperCase(capturedPokemon.name)}</Text>
            </Center>

            <Image
                h={52} w={52} mb={8}
                title={stringToUpperCase(capturedPokemon.name)} 
                src={capturedPokemon.sprites.front}
                fallbackSrc={capturedPokemon.sprites.mini}
            />

            <ChooseTypes
                title={t('encounter.chooseAttackType', { name: stringToUpperCase(capturedPokemon.name) })}
                setter={setAttackType}
                selectedType={attackType}
                types={capturedPokemon.types}
            />
            {/* <ChooseTypes
                title="Choose his special type:"
                setter={setSpecialType}
                selectedType={specialType}
                types={capturedPokemon.types}
            /> */}

            <Button w={"100%"} h={16} mt={2} onClick={() => setChooseAttackType(false)}>{t('common.confirm')}</Button>
        </>
    )
}
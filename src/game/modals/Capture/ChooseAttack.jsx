import { Button, Center, Image, Text } from "@chakra-ui/react";
import Element from "@components/Elements/Element";
import { stringToUpperCase } from "@utils"

export default function ChooseAttack({ 
    capturedPokemon, 
    attackType, 
    setAttackType,
    specialType,
    setSpecialType,
    setChooseAttackType
}) {
    const ChooseTypes = ({ title, setter, selectedType, types }) => {
        return (
            <>
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
            </>
        );
    };

    return (
        <>
            <Text>You caught a {stringToUpperCase(capturedPokemon.name)}!</Text>

            <Image
                h={24} w={24} mb={8}
                title={stringToUpperCase(capturedPokemon.name)} 
                src={capturedPokemon.sprites.mini}
                fallbackSrc={capturedPokemon.sprites.front}
            />

            <ChooseTypes
                title="Choose his attack type:"
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

            <Button w={"100%"} mt={2} onClick={() => setChooseAttackType(false)}>Confirm</Button>
        </>
    )
}
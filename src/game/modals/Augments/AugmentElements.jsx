import { Badge, Center } from "@chakra-ui/react"
import Element from "@components/Elements/Element"

export default function AugmentElements({ augment }) {
    return (
        <>
            <Center flex gap={2}>
                {augment.data.map((element, index) => {
                    return <Element key={index} element={element} elementTable={false} h={8} w={8}/>
                })}
            </Center>
            <Badge p={2} borderRadius={6} fontSize={"small"}>Bonus +{augment.amount}</Badge>
        </>
    )
}
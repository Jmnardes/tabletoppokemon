import { CircularProgress } from '@chakra-ui/react'

export default function Loading({ children }) {
    return (
        <CircularProgress isIndeterminate />
    )
}
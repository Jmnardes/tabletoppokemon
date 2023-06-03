import { useColorMode } from "@chakra-ui/react"

export default function Defense({w = 32, h = 32}) {
    const { colorMode } = useColorMode()
    return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24"><path fill={colorMode === 'dark' ? 'white' : 'currentColor'} d="M12 22q-3.475-.875-5.738-3.988T4 11.1V5l8-3l8 3v6.1q0 3.8-2.263 6.913T12 22Z"/></svg>
}
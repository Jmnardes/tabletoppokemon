import { useColorMode } from "@chakra-ui/react"

export default function Health({w = 32, h = 32}) {
    const { colorMode } = useColorMode()
    return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24"><path fill={colorMode === 'dark' ? 'white' : 'currentColor'} d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812Q2.775 11.5 2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.388 2.25t-1.362 2.412q-.975 1.313-2.625 2.963T13.45 19.7L12 21Z"/></svg>
}
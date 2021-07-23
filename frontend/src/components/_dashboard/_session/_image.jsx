import { Image } from '@chakra-ui/react'
import React from 'react'

export function ImageComponents({src}){
    return(
        <Image src={src} alt="Weather condition icon" boxSize="90px"/>
    )
}

export default ImageComponents
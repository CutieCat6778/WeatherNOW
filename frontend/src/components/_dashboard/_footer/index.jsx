import { Flex, Spacer, Text } from '@chakra-ui/layout'
import React from 'react'
import { InfoIcon, RepeatIcon } from '@chakra-ui/icons'

export function Footer(){
    return(
        <Flex paddingY={2}>
            <Text fontSize={13}>
                © 2021 all rights reserved
            </Text>
            <Spacer/>
            <Text>
                <RepeatIcon onClick={() => window.location.reload()}/>
            </Text>
        </Flex>
    )
}

export default Footer
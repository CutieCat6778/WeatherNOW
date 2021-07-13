
import React from 'react';
import {Spinner, Heading, Flex} from '@chakra-ui/react'

function Loading(){
    return(
        <div>
            <Flex display="flex" justifyContent="center" alignItems="center" m={4} h="100%">
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                />
                <Heading size="xl" ml={4}>
                    Loading...
                </Heading>
            </Flex>
        </div>
    )
}

export default Loading;
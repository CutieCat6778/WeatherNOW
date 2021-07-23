
import React from 'react';
import {Spinner, Heading, Flex} from '@chakra-ui/react'

function Loading(){
    return(
        <div>
            <Flex display="flex" justifyContent="center" alignItems="center" m={4} h="100vh">
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    color="gray.800"
                    size="xl"
                />
            </Flex>
        </div>
    )
}

export default Loading;
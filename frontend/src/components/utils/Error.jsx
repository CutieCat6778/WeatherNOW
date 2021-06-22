import React from 'react';
import { Box, Heading, Badge, Code, Text} from '@chakra-ui/react'

export function Error({error}){
    console.log(error, error.stack)

    return(
        <>
            <Box display={{ xl: "flex" }} alignItems="center" justifyContent="space-around" m={5}>
                <Box>
                    <Heading>
                    <Badge colorScheme="red" fontSize="2rem">500</Badge> Internal Server Error
                    </Heading>
                    <Box display="inline">
                        <Text>
                            Contact support@weathernow.gq for more informations
                        </Text>
                    </Box>
                    <Box>
                        <Code 
                            color="white"
                            background="black"
                            p={4}
                            display="block"
                            whiteSpace="pre"
                            children={error.stack}
                            borderRadius="10px"
                        />
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Error
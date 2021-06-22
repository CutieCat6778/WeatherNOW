import React from 'react'
import Error from '../../components/utils/Error'
import { Flex, Heading, Text, Button } from '@chakra-ui/layout'

export function DashboardPage({
    history
}) {
    try{
        return(
            <Flex>
                <Heading>
                    What is weather now?
                </Heading>
                <Text>
                    Your question will be answered, if you click on this button
                </Text>
                <Button href={`/dash`}>
                    Get started
                </Button>
            </Flex>
        )
    }catch(e){
        return(
            <Error error={e}/>
        )
    }
}
import React from 'react'
import AddressFlex from './address_flex';
import WeatherFlex from './weather_flex';
import { Box, Divider, Spacer } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/layout'

export function Session({ data, data2, config }) {
    return (
        <Box>
            <Box display={{ base: "none", md: "block" }} backgroundColor={config.day ? "#f7f7f7" : "#1c232d"} bgGradient={config.day ? { base: "linear(to-r, #cccccc, #bdbdbd)", lg: "linear(to-r, #f7f7f7, #cccccc, #bdbdbd)" } : { base: "linear(to-r, #2f3b4a, #1c232d)", lg: "linear(to-r, #374657, #2f3b4a, #1c232d)" }} w="100%" h="100%">
                <Flex justifyContent="center" alignItems="center" h="100vh">
                    <Flex
                        justifyContent="center"
                        flexDirection="column"
                        maxW="350px"
                        p={6}
                        backgroundColor={config.day ? "#f5f5f5" : "#1c232b"}
                        color={config.day ? "gray.800" : "#ffffff"}
                        borderRadius="12px"
                        boxShadow="dark-lg"
                    >
                        <WeatherFlex data={data2.getRealtimeWeather} config={config} />
                        <Divider colorScheme="facebook" />
                        <AddressFlex data={data.getLocationData} />
                    </Flex>
                </Flex>
            </Box>
            <Flex
                display={{ base: "flex", md: "none" }}
                backgroundColor={config.day ? "#f5f5f5" : "#1c232b"}
                color={config.day ? "gray.800" : "#ffffff"}
                h="100vh" flexDirection="column">
                <WeatherFlex data={data2.getRealtimeWeather} config={config} />
                <Spacer />
                <Box>
                    <Divider colorScheme="facebook" />
                    <AddressFlex data={data.getLocationData} />
                </Box>
            </Flex>
        </Box>
    )
}

export default Session
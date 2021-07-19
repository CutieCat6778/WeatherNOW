import React from 'react'
import {
    Stat,
    StatLabel,
    StatNumber,
    Heading,
    Image,
    Flex,
    Box,
    Spacer
} from "@chakra-ui/react"
import Error from '../utils/Error';

export function WeatherFlex({ data, config }) {
    try{
        return (
            <Flex flexDirection="column" ml={4} p={4} textAlign="right">
                <Flex>
                    <Image src={data.condition.icon} alt="Weather condition icon" boxSize="100px"/>
                    <Spacer/>
                    <Box textAlign="right">
                        <Heading textAlign="right">
                            {config.temp == 1 ? data.temp_c + "°C" : data.temp_f + "°F"}
                        </Heading>
                        <Flex alignItems="center" justifyContent="right">
                            <Heading fontSize="2rem">
                                {data.condition.text}
                            </Heading>
                        </Flex>
                    </Box>
                </Flex>
                <Flex flexDirection="column" textAlign="right">
                    <Flex flexDirection="row" justifyContent="space-around">
                        <Stat>
                            <StatLabel>Wind</StatLabel> <StatNumber fontWeight="600">{data.wind_kph}km/h</StatNumber>
                        </Stat>
                        <Stat>
                            <StatLabel>Cloud</StatLabel> <StatNumber fontWeight="600">{data.cloud}%</StatNumber>
                        </Stat>
                    </Flex>
                    <Flex justifyContent="space-around">
                        <Stat>
                            <StatLabel>Humidity</StatLabel> <StatNumber fontWeight="600">{data.humidity}%</StatNumber>
                        </Stat>
                        <Stat>
                            <StatLabel>Visibility</StatLabel> <StatNumber fontWeight="600">{data.vis_km}km</StatNumber>
                        </Stat>
                    </Flex>
                </Flex>
            </Flex>
        )
    }catch(e){
        return (
            <Error error={e}/>
        )
    }
    
}

export default WeatherFlex;
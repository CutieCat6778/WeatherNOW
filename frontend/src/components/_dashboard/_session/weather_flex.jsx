import React, { lazy, Suspense } from 'react'
import {
    Stat,
    StatLabel,
    StatNumber,
    Heading,
    Flex,
    Box,
    Spacer
} from "@chakra-ui/react"
import Error from '../../utils/Error';
import Loading from '../../utils/Loading';
const Image = lazy(() => import('./_image'));

export function WeatherFlex({ data, config }) {
    try{
        return (
            <Flex flexDirection="column" ml={4} p={4} textAlign="right">
                <Flex>
                    <Suspense fallback={<Loading/>}>
                        <Image src={data.condition.icon}/>
                    </Suspense>
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
                            <StatLabel>Wind</StatLabel> <StatNumber fontWeight="600">{config.dist ? data.wind_kph + " km/h" : data.wind_mph + " mi/h"}</StatNumber>
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
                            <StatLabel>Visibility</StatLabel> <StatNumber fontWeight="600">{config.dist ? data.vis_km + " Km" : data.vis_miles + " Miles"}</StatNumber>
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
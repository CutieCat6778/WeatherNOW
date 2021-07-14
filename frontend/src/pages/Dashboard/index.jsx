import React, { useEffect, useState } from 'react'
import Error from '../../components/utils/Error'
import { Flex, Heading, Text } from '@chakra-ui/layout'
import { useQuery } from '@apollo/client'
import { getLocationData } from '../../graphql/queries/location';
import { getRealtimeWeather } from '../../graphql/queries/weather';
import Loading from '../../components/utils/Loading';
import { Avatar, Box } from '@chakra-ui/react';
import {
    Stat,
    StatLabel,
    StatNumber,
} from "@chakra-ui/react"

export function DashboardPage({ geolocation }) {
    try {
        const [config, setConfig] = useState();

        const { loading, error, data } = useQuery(getLocationData, { variables: { lat: "" + geolocation.lat, long: "" + geolocation.long } });
        const { loading: loading2, error: error2, data: data2 } = useQuery(getRealtimeWeather, { variables: { lat: "" + geolocation.lat, long: "" + geolocation.long } });

        if (error || error2) {
            return (
                error ? <Error error={error} /> : <Error error={error2} />
            )
        }

        if (!config) {
            setConfig({
                temp: 1,
                dist: 1,
                long: 1,
                pres: 1
            })
        }
        console.log(config)

        if (!loading && !loading2) {
            return (
                <Box p={6}>
                    <Heading textAlign="center">
                        Weather NOW
                    </Heading>
                    <Flex justifyContent="center" p={6} display={{ base: "block", sm: "flex" }}>
                        <Flex flexDirection="column" p={4}>
                            <Heading>
                                {data.getLocationData.address.addressLine}
                            </Heading>
                            <Text>
                                {data.getLocationData.address.locality}
                            </Text>
                            <Text>
                                {data.getLocationData.address.adminDistrict2}, {data.getLocationData.address.postalCode}
                            </Text>
                            <Text>
                                {data.getLocationData.address.adminDistrict}
                            </Text>
                            <Text>
                                {data.getLocationData.address.countryRegion}
                            </Text>
                        </Flex>
                        <Flex flexDirection="column" backgroundColor="#a0aec0" ml={4} p={4} textAlign="right">
                            <Heading textAlign="right">
                                {config.temp == 1 ? data2.getRealtimeWeather.temp_c + "°C" : data2.getRealtimeWeather.temp_f + "°F"}
                            </Heading>
                            <Flex alignItems="center" justifyContent="right">
                                <Avatar src={data2.getRealtimeWeather.condition.icon} />
                                <Heading fontSize="2rem">
                                    {data2.getRealtimeWeather.condition.text}
                                </Heading>
                            </Flex>
                            <Flex flexDirection="column" textAlign="right">
                                <Flex flexDirection="row" justifyContent="space-around">
                                    <Stat>
                                        <StatLabel>Wind</StatLabel> <StatNumber fontWeight="600">{data2.getRealtimeWeather.wind_kph}km/h</StatNumber>
                                    </Stat>
                                    <Stat>
                                        <StatLabel>Cloud</StatLabel> <StatNumber fontWeight="600">{data2.getRealtimeWeather.cloud}%</StatNumber>
                                    </Stat>
                                </Flex>
                                <Flex justifyContent="space-around">
                                    <Stat>
                                        <StatLabel>Humidity</StatLabel> <StatNumber fontWeight="600">{data2.getRealtimeWeather.humidity}%</StatNumber>
                                    </Stat>
                                    <Stat>
                                        <StatLabel>Visibility</StatLabel> <StatNumber fontWeight="600">{data2.getRealtimeWeather.vis_km}km</StatNumber>
                                    </Stat>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                </Box>
            )
        } else if (loading || loading2) {
            return (<Loading />)
        }
    } catch (e) {
        console.log("error", e)
        return (
            <Error error={new Error(e)} />
        )
    }
}
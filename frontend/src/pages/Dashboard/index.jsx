import React, { useState } from 'react'
import Error from '../../components/utils/Error'
import { Flex } from '@chakra-ui/layout'
import { useQuery } from '@apollo/client'
import { getLocationData } from '../../graphql/queries/location';
import { getRealtimeWeather } from '../../graphql/queries/weather';
import Loading from '../../components/utils/Loading';
import AddressFlex from '../../components/_dashboard/address_flex';
import WeatherFlex from '../../components/_dashboard/weather_flex';
import { Box, Divider } from '@chakra-ui/react';

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
                <Box backgroundColor={!data2.getRealtimeWeather.is_day ? "#f7f7f7" : "#1c232d"} bgGradient={!data2.getRealtimeWeather.is_day ? "linear(to-r, #f7f7f7, #cccccc, #bdbdbd)" :"linear(to-r, #374657, #2f3b4a, #1c232d)"} w="100%" h="100%">
                    <Flex justifyContent="center" alignItems="center" h="100vh">
                        <Flex
                            justifyContent="center"
                            flexDirection="column"
                            maxW="350px"
                            p={6}
                            backgroundColor={!data2.getRealtimeWeather.is_day ? "#f5f5f5" : "#1c232b"}
                            color={!data2.getRealtimeWeather.is_day ? "#263145" : "#ffffff"}
                            borderRadius="12px"
                            boxShadow="dark-lg"
                            >
                            <WeatherFlex data={data2.getRealtimeWeather} config={config} />
                            <Divider colorScheme="facebook" />
                            <AddressFlex data={data.getLocationData} />
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
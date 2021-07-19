import React, { useState } from 'react'
import Error from '../../components/utils/Error'
import { Flex } from '@chakra-ui/layout'
import { useQuery } from '@apollo/client'
import { getLocationData } from '../../graphql/queries/location';
import { getRealtimeWeather } from '../../graphql/queries/weather';
import Loading from '../../components/utils/Loading';
import AddressFlex from '../../components/_dashboard/address_flex';
import WeatherFlex from '../../components/_dashboard/weather_flex';
import { Divider } from '@chakra-ui/react';

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
                <Flex 
                    justifyContent="center" 
                    flexDirection="column" 
                    maxW="300px" 
                    p={6} 
                    backgroundColor={data2.getRealtimeWeather.is_day ? "#fffef0" : "#1c232b"}
                    color={data2.getRealtimeWeather.is_day ? "#263145" : "#ffffff"}
                    borderRadius="12px"
                    m={12}
                    boxShadow="xl">
                    <WeatherFlex data={data2.getRealtimeWeather} config={config}/>
                    <Divider/>
                    <AddressFlex data={data.getLocationData}/>
                </Flex>
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
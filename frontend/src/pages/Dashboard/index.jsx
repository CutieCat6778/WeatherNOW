import React, { useState } from 'react'
import Error from '../../components/utils/Error'
import { useQuery } from '@apollo/client'
import { getLocationData } from '../../graphql/queries/location';
import { getRealtimeWeather } from '../../graphql/queries/weather';
import Loading from '../../components/utils/Loading';
import { Grid } from '@chakra-ui/react';
import Session from '../../components/_dashboard/_session';
import Navigation from '../../components/_dashboard/_navigation';


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

        if (!loading && !loading2) {
            if (!config) {
                setConfig({
                    temp: 1,
                    dist: 1,
                    long: 1,
                    pres: 1,
                    day: data2.getRealtimeWeather.is_day
                })
            }
            console.log(config)
            return (
                <Grid w="100%">
                    <Navigation setConfig={setConfig} config={config}/>
                    <Session data={data} data2={data2} config={config}/>
                </Grid>
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
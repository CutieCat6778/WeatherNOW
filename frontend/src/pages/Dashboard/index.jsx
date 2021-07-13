import React from 'react'
import Error from '../../components/utils/Error'
import { Flex, Heading, Text, Button } from '@chakra-ui/layout'
import { useQuery } from '@apollo/client'
import { getLocationData } from '../../graphql/queries/location';
import { getRealtimeWeather } from '../../graphql/queries/weather';
import Loading from '../../components/utils/Loading';

export function DashboardPage({geolocation}) {
    try{
        console.log({lat: geolocation.lat.toString(), long: geolocation.long.toString()})
        const {loading, error, data} = useQuery(getLocationData, {variables: {lat: ""+geolocation.lat, long: ""+geolocation.long}});
        const {loading2, error2, data2} = useQuery(getRealtimeWeather, {variables: {lat: ""+geolocation.lat, long: ""+geolocation.long}});
        if(error || error2){
            console.log("error", error, error2)
            return(
                error ? <Error error={error}/> : <Error error={error2}/>
            )
        }
        if(!loading && !loading2){
            console.log(data, data2)
            console.log("weather", data2)
            return(
                <Flex flexDirection="column">
                    <Heading>
                        Your current location
                    </Heading>
                    <Text>
                        {data.getLocationData.address.addressLine}
                    </Text>
                    <Text>
                        {data.getLocationData.address.adminDistrict2}, {data.getLocationData.address.postalCode}
                    </Text>
                    <Text>
                        {data.getLocationData.address.adminDistrict}
                    </Text>
                </Flex>
            )
        }else if(loading || loading2){
            return(<Loading/>)
        }
    }catch(e){
        console.log("error", e)
        return(
            <Error error={new Error(e)}/>
        )
    }
}
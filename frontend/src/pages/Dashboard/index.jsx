import React from 'react'
import Error from '../../components/utils/Error'
import { Flex, Heading, Text, Button } from '@chakra-ui/layout'
import { useQuery } from '@apollo/client'
import { getLocationData } from '../../graphql/queries/location';
import Loading from '../../components/utils/Loading';

export function DashboardPage({
    lat, 
    long,
    history,
}) {
    try{
        const {loading, error, data} = useQuery(getLocationData, {args: {lat, long}});
        if(error){
            throw new Erorr(error);
        }
        if(!loading){
            return(
                <Heading>
                    {data.getLocationData.addressLine}
                </Heading>
            )
        }else if(loading){
            return(<Loading/>)
        }
    }catch(e){
        return(
            <Error error={e}/>
        )
    }
}
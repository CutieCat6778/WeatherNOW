import {gql} from '@apollo/client'

export const getRealtimeWeather = gql`
    query getRealtimeWeather($lat: String!, $long: String!){
        getRealtimeWeather(lat: $lat, long: $long){
            last_updated
            temp_c
            temp_f
            is_day
            wind_kph
            wind_mph
            humidity
            cloud
            condition{
                text
                icon
            }
            vis_km
            vis_miles
        }
    }
`
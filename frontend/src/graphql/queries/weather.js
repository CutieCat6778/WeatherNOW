import {gql} from '@apollo/client'

export const getRealtimeWeather = gql`
    query getRealtimeWeather($lat: String!, $long: String!){
        getRealtimeWeather(lat: $lat, long: $long){
            last_updated
            temp_c
            is_day
            wind_kph
            pressure_mb
            precip_mm
            humidity
            cloud
            wind_dir
            feelslike_c
            condition{
                text
                icon
            }
            vis_km
            uv
            gust_kph
        }
    }
`
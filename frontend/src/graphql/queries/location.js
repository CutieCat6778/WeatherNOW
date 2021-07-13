import {gql} from '@apollo/client'

export const getLocationData = gql`
    query getLocationData($lat: String!, $long: String!){
        getLocationData(lat: $lat, long: $long){
            address{
                addressLine
                adminDistrict
                adminDistrict2
                countryRegion
                postalCode
            }
            confidence
            point
        }
    }
`
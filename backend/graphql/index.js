const {
    GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean, GraphQLInt, GraphQLSchema,
} = require('graphql');

// Secondary Types
// --- Location Types
const IntersectionType = new GraphQLObjectType({
    name: "IntersectionType",
    fields: () => ({
        baseStreet: {type: GraphQLString},
        secondaryStreet1: {type: GraphQLString},
        intersectionType: {type: GraphQLString},
        displayName: {type: GraphQLString}
    })
})

const AddressType = new GraphQLObjectType({
    name: "AddressType",
    fields: () => ({
        addressLine:{type: GraphQLString},
        adminDistrict:{type: GraphQLString},
        adminDistrict2:{type: GraphQLString},
        countryRegion:{type: GraphQLString},
        formattedAddress:{type: GraphQLString},
        intersection: {type: IntersectionType},
        locality:{type: GraphQLString},
        postalCode:{type: GraphQLString},
        countryRegionIso2:{type: GraphQLString}
    })
})

const ConditionType = new GraphQLObjectType({
    name: "ConditionType",
    fields: () => ({
        text: {type: GraphQLString},
        icon: {type: GraphQLString},
        code: {type: GraphQLInt}
    })
})

// Main Types
const LocationType = new GraphQLObjectType({
    name: "LocationType",
    fields: () => ({
        address: {type: AddressType},
        name: {type: GraphQLString},
        point: {type: GraphQLList(GraphQLString)},
        confidence: {type: GraphQLString}
    })
})

const WeatherType = new GraphQLObjectType({
    name: "WeatherType",
    fields: () => ({
        last_updated_epoch: {type: GraphQLInt},
        last_updated: {type: GraphQLString},
        temp_c: {type: GraphQLInt},
        temp_f: {type: GraphQLInt},
        is_day: {type: GraphQLInt},
        condition: {type: ConditionType},
        wind_mph: {type: GraphQLInt},
        wind_kph: {type: GraphQLInt},
        wind_degree: {type: GraphQLInt},
        wind_dir: {type: GraphQLString},
        pressure_mb: {type: GraphQLInt},
        pressure_in: {type: GraphQLInt},
        precip_mm: {type: GraphQLInt},
        precip_in: {type: GraphQLInt},
        humidity: {type: GraphQLInt},
        cloud: {type: GraphQLInt},
        feelslike_c: {type: GraphQLInt},
        feelslike_f: {type: GraphQLInt},
        vis_km: {type: GraphQLInt},
        vis_miles: {type: GraphQLInt},
        uv: {type: GraphQLInt},
        gust_mph: {type: GraphQLInt},
        gust_kph: {type: GraphQLInt}
    })
})

// Queries and Mutations
const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        getLocationData: {
            type: LocationType,
            args: {
                "lat": {
                    type: GraphQLString
                },
                "long": {
                    type: GraphQLString
                }
            },
            async resolve(parent, args, request){
                if(!args || !args.lat || !args.long) return null;
                const locationData = (await require('../utils/locations/index').getLocationData(args.lat, args.long)).data.resourceSets[0].resources[0];
                const data = {
                    address: locationData.address,
                    name: locationData.name,
                    point: locationData.point.coordinates,
                    confidence: locationData.confidence
                }
                return data;
            }
        },
        getRealtimeWeather: {
            type: WeatherType,
            args: {
                "lat": {
                    type: GraphQLString
                },
                "long": {
                    type: GraphQLString
                }
            },
            async resolve(parent, args, request){
                if(!args || !args.lat || !args.long) return null;
                const weatherData = (await require('../utils/weather-api/index').getRealTimeData(args.lat, args.long)).data
                console.log(weatherData);
                return weatherData.current
            }
        }
    }
})

module.exports = new GraphQLSchema({query: RootQuery});
const {
    GraphQLObjectType, GraphQLString, GraphQLList, GraphQLFloat, GraphQLBoolean, GraphQLInt, GraphQLSchema,
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
        temp_c: {type: GraphQLFloat},
        temp_f: {type: GraphQLFloat},
        is_day: {type: GraphQLFloat},
        condition: {type: ConditionType},
        wind_mph: {type: GraphQLFloat},
        wind_kph: {type: GraphQLFloat},
        wind_degree: {type: GraphQLFloat},
        wind_dir: {type: GraphQLString},
        pressure_mb: {type: GraphQLFloat},
        pressure_in: {type: GraphQLFloat},
        precip_mm: {type: GraphQLFloat},
        precip_in: {type: GraphQLFloat},
        humidity: {type: GraphQLFloat},
        cloud: {type: GraphQLFloat},
        feelslike_c: {type: GraphQLFloat},
        feelslike_f: {type: GraphQLFloat},
        vis_km: {type: GraphQLFloat},
        vis_miles: {type: GraphQLFloat},
        uv: {type: GraphQLFloat},
        gust_mph: {type: GraphQLFloat},
        gust_kph: {type: GraphQLFloat}
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
                console.log("args:", args)
                if(!args || !args.lat || !args.long) return null;
                console.log(args)
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
                console.log("point", args)
                if(!args || !args.lat || !args.long) return null;
                console.log(args)
                const weatherData = (await require('../utils/weather-api/index').getRealTimeData(args.lat, args.long)).data
                console.log(weatherData.current);
                const res = weatherData.current;
                return res
            }
        }
    }
})

module.exports = new GraphQLSchema({query: RootQuery});
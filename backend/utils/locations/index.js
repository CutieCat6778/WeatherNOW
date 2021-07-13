const axios = require('axios');
const URL = 'http://dev.virtualearth.net/REST/v1/Locations/'

module.exports = {
    getLocationData: (lat, long) => {
        return axios.get(`${URL}${lat},${long}?includeEntityTypes=Address&includeNeighborhood=0&verboseplacenames=true&include=ciso2&key=${process.env.BINGMAP_API_KEY}`)
    }
}
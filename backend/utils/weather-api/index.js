const axios = require('axios');
const URL = 'http://api.weatherapi.com/v1/'

module.exports = {
    "getRealTimeData": (lat, long) => {
        return axios.get(`${URL}current.json?key=${process.env.WEATHER_API_KEY}&q=${lat},${long}`)
    }
}
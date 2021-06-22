const express = new require('express')
const routers = express.Router()

routers.get('/', (req, res, next) => {
    return res.sendStatus(200);
})

module.exports = routers;
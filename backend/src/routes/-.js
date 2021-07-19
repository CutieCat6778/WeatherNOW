const express = new require('express')
const routers = express.Router()

routers.get('/', (req, res, next) => {
    return res.sendStatus(200);
})

routers.get('/origin', (req, res, next) => {
    const origin = req.get('origin');
    console.log(origin);
    return res.status(200).send({origin});
})

module.exports = routers;
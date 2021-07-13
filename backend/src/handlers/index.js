const { readdirSync } = require("fs")
const routes = readdirSync('./src/routes');

module.exports = async(app) => {
    for (let route of routes) {
        console.log(route)
        if(route.startsWith('-')){
            const file = require(`../routes/${route}`);
            let routeName = route.split('.js')[0];
            routeName = routeName.replace(/-/g, "/");
            app.use(routeName, file);
        }
    }
}
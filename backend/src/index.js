require('dotenv').config();
const express = require('express');
const cors = require('cors');
//const mongoose = require('mongoose');
// const cookieParser = require('cookie-parser');
// const session = require('express-session');
// const MongoStore = require('connect-mongo');
const { graphqlHTTP } = require('express-graphql');

const app = new express();
const GraphQLRootSchema = require('../graphql/index.js');

// (async () => {
//     await mongoose.connect(process.env.MONGO_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useCreateIndex: true,
//         useFindAndModify: true
//     })
// })();

app.use(cors({
    origin: "http://localhost:8080",
    credentials: true
}))

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', "http://localhost:8080");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    if ('OPTIONS' == req.method) {
        res.send(200);
    } else {
        next();
    }
});

/*
const sessionConfig = {
    name: "user-credential.sid",
    // secret used for using signed cookies w/ the session
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        ttl: 14 * 24 * 60 * 60 // save session for 14 days
    }),

    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 14 // expires in 14 days
    }
}

if (process.env.NODE_ENV) {
    sessionConfig.cookie.secure = true; // serve secure cookies in production environment
    app.set("trust proxy", 1); // trust first proxy
}


app.use(session(sessionConfig));

app.use(cookieParser());
*/


app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: GraphQLRootSchema,
}));


module.exports = app;
module.exports = (app) => {

    return new Promise((s, f) => {

        const redis = require('redis')
        const session = require('express-session')
        let RedisStore = require('connect-redis')(session)

        let redisClient = redis.createClient()

        s(app.use(
            session({
                store: new RedisStore({ client: redisClient }),
                saveUninitialized: true,
                secret: 'keyboard cat',
                resave: true,
            })
        )
        )

    })




}
import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import RestaurantsDAO from "./dao/restaurantsDAO.js"
import ReviewsDAO from "./dao/reviewsDAO.js"
dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

/* Connect to the database */
MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI,
    {
        /* only 50 people can connect */
        maxPoolSize: 50,
        /* 2500 miliseconds, request times out */
        wtimeoutMS: 2500,
        /* new connection string parser behind a flag */
        useNewUrlParser: true
    })
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        /* call injectdb */
        await RestaurantsDAO.injectDB(client)
        await ReviewsDAO.injectDB(client)
        /* app.listen starts the web server after database is connected too*/
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })
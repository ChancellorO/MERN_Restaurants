/* Configure an express server */
import express from "express"
import cors from "cors"
import restaurants from "./api/restaurants.route.js"

const app = express()

/* Apply our middleware */

app.use(cors())
/* Our Server accepts json as a body of request */
app.use(express.json())

/* Establish the routes */
app.use("/api/v1/restaurants", restaurants) //in restaurants file
app.use("*", (req, res) => res.status(404).json({error: "not found"}))

/* Export app as module using the ES6 */
export default app

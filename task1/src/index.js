const express = require("express")

const connect = require("./configs/db")

require("dotenv").config()

const app = express()
var cors = require('cors')
app.use(cors())

app.use(express.json())

const CollectionData = require('./controllers/data.controller');


app.use('/', CollectionData);

const port = process.env.PORT || 2346

app.listen(port, async () => {
    try {
        await connect()
        console.log(`Listen To my port ${port}`)
    } catch (err) {
        console.log("Error:", err.message)
    }
})
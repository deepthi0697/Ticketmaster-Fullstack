const express = require('express')
const app = express()
const PORT = 3033
const setupDB = require('./config/database')
const router = require('./config/routes')
const cors = require('cors')

app.use(cors())

setupDB()
app.use(express.json())
app.use('/', router)


app.listen(PORT, () => {
    console.log('listening on port', PORT)
})
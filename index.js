require('dotenv').config()
const express = require('express')
const cors = require('cors')
require('./Connection/db')


const userRoutes = require('./Routes/UserRoutes')
const taskRoutes = require('./Routes/TaskRoutes')

const app = express()
app.use(cors())
app.use(express.json());

PORT = 4001 || process.env.PORT

app.use('/api/auth' , userRoutes)
app.use('/api/tasks', taskRoutes)

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})
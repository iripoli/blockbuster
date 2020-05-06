const express = require('express')

const homeRoutes = require('./routes/home')
const genresRoutes = require('./routes/genres')

const app = express()

app.use(express.json())

app.use('/api/', homeRoutes)
app.use('/api/genres', genresRoutes)

//PORT
const port = process.env.PORT || 3000
app.listen(port, ()=>console.log(`Listening to port ${port}`))
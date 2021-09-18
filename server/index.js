const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const userRoutes = require('./routes/user.routes')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json());

app.use('/api/users', userRoutes)

app.get("/", (req, res) => {
  res.status(200).json({"The Database is alive!": true})
})

const port = process.env.PORT
const host = process.env.HOST

app.listen(port, host, () => {
  console.log(`Server started at ${host} port ${port}`);
})
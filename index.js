// Require needed packages
let express = require('express')
let cors = require('cors')
let morgan = require('morgan')
// Instantiate app
let app = express()

// Set up middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))

app.use(express.json({ limit: '30mb' }))

// Routes
app.get('*', (req, res) => {
    res.status(404).send({ message: 'Not Found'})
})

app.listen(process.env.PORT || 3005)

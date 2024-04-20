if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const methodOverride = require('method-override')
const cors = require('cors')
const passport = require('./config/passport')
const routes = require('./routes')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(passport.initialize())
app.use(methodOverride('_method'))

app.use('/api', routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const methodOverride = require('method-override')
const cors = require('cors')
const passport = require('passport')
const routes = require('./routes')

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(passport.initialize())
app.use(methodOverride('_method'))

app.use('/api', routes)

// 開發和生產環境
const PORT = process.env.PORT || '8080'
const HOST = '0.0.0.0'

app.listen(PORT, HOST, () => {
  console.log(`App is running on http://${HOST}:${PORT}`)
})

module.exports = app

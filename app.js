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

// 開發
if (process.env.NODE_ENV !== 'production') {
  const PORT = 3000
  app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`)
  })
} else {
// 部署
  const PORT = process.env.PORT || '8080'
  app.listen(PORT, '0.0.0.0', () => {
    console.log('App is running on https://my-blog-backend.fly.dev')
  })
}

module.exports = app

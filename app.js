if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const methodOverride = require('method-override')
const cors = require('cors')
const passport = require('passport')
const routes = require('./routes')

const app = express()
// const PORT = 3000
const PORT = process.env.PORT || '8080'

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(passport.initialize())
app.use(methodOverride('_method'))

// app.use('/api', routes)
app.use('https://my-blog-backend.fly.dev', routes)

// app.listen(PORT, () => {
//   console.log(`App is running on http://localhost:${PORT}`)
// })
app.listen(PORT, '0.0.0.0', () => {
  // console.log(`App is running on http://localhost:${PORT}`)
  console.log('App is running on https://my-blog-backend.fly.dev')
})

const saltRounds = 10
const getUser = (req) => {
  return req.user || null
}

module.exports = {
  saltRounds,
  getUser
}

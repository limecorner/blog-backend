const { User, Article } = require('./models')

const arrayToObj = (array) => {
  const obj = {}
  for (let i = 0; i < array.length; i++) {
    const key = array[i]
    obj[key] = key
  }
  return obj
}

const userPermissions = User.rawAttributes.permission.values
const userPermissionsEnum = arrayToObj(userPermissions)

const articlePermissions = Article.rawAttributes.permission.values
const articlePermissionsEnum = arrayToObj(articlePermissions)

module.exports = {
  userPermissionsEnum,
  articlePermissionsEnum
}

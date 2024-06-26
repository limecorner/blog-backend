'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate (models) {
      User.hasMany(models.Article, { foreignKey: 'userId' })
      User.hasMany(models.Response, { foreignKey: 'userId' })
      User.belongsToMany(User, {
        through: models.Followship,
        foreignKey: 'idolId',
        as: 'Fans'
      })
      User.belongsToMany(User, {
        through: models.Followship,
        foreignKey: 'fanId',
        as: 'Idols'
      })
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    bio: DataTypes.STRING,
    photo: DataTypes.STRING,
    permission: DataTypes.ENUM('login', 'member'),
    role: DataTypes.STRING // 就是 permission，最後使用 permission
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    underscored: true
  })
  return User
}

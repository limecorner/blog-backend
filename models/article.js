'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    static associate (models) {
      Article.belongsTo(models.User, { foreignKey: 'userId' })
      Article.belongsTo(models.Category, { foreignKey: 'categoryId' })
      Article.belongsToMany(models.User, {
        through: models.Response,
        foreignKey: 'articleId',
        as: 'RespondedArticles'
      })
    }
  };
  Article.init({
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    permission: DataTypes.ENUM('guest', 'login', 'member'),
    clapCount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Article',
    tableName: 'Articles',
    underscored: true
  })
  return Article
}

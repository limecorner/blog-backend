'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Response extends Model {
    static associate (models) {
      Response.belongsTo(models.Article, { foreignKey: 'articleId' })
      Response.belongsTo(models.User, { foreignKey: 'userId' })
    }
  };
  Response.init({
    articleId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING,
    clapCount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Response',
    tableName: 'Responses',
    underscored: true
  })
  return Response
}

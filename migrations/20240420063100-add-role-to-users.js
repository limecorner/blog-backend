'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'role', {
      type: Sequelize.STRING,
      defaultValue: false,
      allowNull: false
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'role')
  }
}

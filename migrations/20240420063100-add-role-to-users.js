'use strict'

// role 就是 permission，最後使用 permission
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'role', {
      type: Sequelize.STRING,
      defaultValue: 'user'
      // allowNull: false
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'role')
  }
}

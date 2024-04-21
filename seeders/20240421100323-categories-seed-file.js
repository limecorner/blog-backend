'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = [
      { name: 'ExpressJS' },
      { name: 'MySQL' },
      { name: 'Sequelize' },
      { name: 'MongoDB' },
      { name: 'Mongoose' },
      { name: 'PassportJs' },
      { name: 'VueJS' },
      { name: 'JavaScript' }
    ]
    await queryInterface.bulkInsert('Categories',
      categories
        .map(item => ({
          name: item.name,
          created_at: new Date(),
          updated_at: new Date()
        })), {})
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', {})
  }
}

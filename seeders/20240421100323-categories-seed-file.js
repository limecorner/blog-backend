'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = [
      { name: '心情隨筆' },
      { name: '心得' },
      { name: '歌曲' },
      { name: '週報' }
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

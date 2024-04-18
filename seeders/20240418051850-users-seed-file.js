'use strict'
const { User } = require('../models')
const getRandomPermission = () => {
  const permissions = Object.values(User.rawAttributes.permission.values)
  return permissions[Math.floor(Math.random() * permissions.length)]
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      email: 'root@gmail.com',
      password: '1234',
      name: 'root',
      bio: 'root',
      photo: 'https://loremflickr.com/320/240/avatar',
      permission: getRandomPermission(),
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'user1@gmail.com',
      password: '1234',
      name: 'user1',
      bio: 'user1',
      photo: 'https://loremflickr.com/320/240/avatar',
      permission: getRandomPermission(),
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'user2@gmail.com',
      password: '1234',
      name: 'user2',
      bio: 'user2',
      photo: 'https://loremflickr.com/320/240/avatar',
      permission: getRandomPermission(),
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', {})
  }
}

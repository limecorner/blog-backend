'use strict'
const { User } = require('../models')
const bcrypt = require('bcryptjs')
const { saltRounds } = require('../helpers/auth-helpers')

const getRandomPermission = () => {
  const permissions = Object.values(User.rawAttributes.permission.values)
  return permissions[Math.floor(Math.random() * permissions.length)]
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      email: 'boss@gmail.com',
      password: await bcrypt.hash('123', saltRounds),
      name: 'boss',
      bio: 'boss',
      photo: 'https://loremflickr.com/320/240/avatar',
      permission: getRandomPermission(),
      role: 'admin',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'user1@gmail.com',
      password: await bcrypt.hash('123', saltRounds),
      name: 'user1',
      bio: 'user1',
      photo: 'https://loremflickr.com/320/240/avatar',
      permission: getRandomPermission(),
      role: 'user',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'user2@gmail.com',
      password: await bcrypt.hash('123', saltRounds),
      name: 'user2',
      bio: 'user2',
      photo: 'https://loremflickr.com/320/240/avatar',
      permission: getRandomPermission(),
      role: 'user',
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', {})
  }
}

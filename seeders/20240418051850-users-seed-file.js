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
      // permission: getRandomPermission(),
      permission: 'admin',
      // role: 'admin',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'blue@gmail.com',
      password: await bcrypt.hash('123', saltRounds),
      name: '藍秋',
      bio: '追求卓越',
      photo: 'https://loremflickr.com/320/240/avatar',
      // permission: getRandomPermission(),
      permission: 'login',
      // role: 'login',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'fa@gmail.com',
      password: await bcrypt.hash('123', saltRounds),
      name: '法罕',
      bio: '我想拍動物',
      photo: 'https://loremflickr.com/320/240/avatar',
      // permission: getRandomPermission(),
      permission: 'login',
      // role: 'login',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'la@gmail.com',
      password: await bcrypt.hash('123', saltRounds),
      name: '拉朱',
      bio: '摔斷了腿，我才重新站起來',
      photo: 'https://loremflickr.com/320/240/avatar',
      // permission: getRandomPermission(),
      permission: 'login',
      // role: 'login',
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', {})
  }
}

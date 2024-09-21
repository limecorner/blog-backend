const chai = require('chai')
const request = require('supertest')
const sinon = require('sinon')
const app = require('../../app')
const helpers = require('../../helpers/auth-helpers')
const should = chai.should()
const expect = chai.expect
const db = require('../../models')
const passportUseJWT = require('../../middleware/auth-jwt-strategy')

describe('# user requests', () => {
  context('# POST ', () => {
    describe('POST /api/signup', () => {
      before(async () => {
        // 清除測試資料庫資料
        await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, { raw: true })
        await db.User.destroy({ where: {}, truncate: true, force: true })
        await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, { raw: true })
      })

      // 註冊自己的帳號 POST /signup
      it(' - successfully', (done) => {
        request(app)
          .post('/api/signup')
          .send('name=User1&email=User1@example.com&password=User1&passwordCheck=User1')
          .set('Accept', 'application/json')
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err)
            // 檢查是否有成功新增資料到資料庫裡
            db.User.findByPk(1).then(user => {
              user.name.should.equal('User1')
              user.email.should.equal('User1@example.com')
              return done()
            })
          })
      })

      after(async () => {
        // 清除測試資料庫資料
        // 取消外鍵約束
        await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, { raw: true })
        await db.User.destroy({ where: {}, truncate: true, force: true })
        // 開啟外鍵約束
        await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, { raw: true })
      })
    })
  })

  context('# GET ', () => {
    describe('GET /users/:id', () => {
      before(async () => {
        // 清除測試資料庫資料
        await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, { raw: true })
        await db.User.destroy({ where: {}, truncate: true, force: true })
        await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, { raw: true })
        // 模擬登入資料
        const rootUser = await db.User.create({ name: 'root', email: 'root@', password: 'root', permission: 'login' })
        this.authenticate = sinon.stub(passportUseJWT, 'authenticate').callsFake((strategy, options, callback) => {
          callback(null, { ...rootUser })
          return (req, res, next) => {}
        })

        this.getUser = sinon.stub(
          helpers, 'getUser'
        ).returns({ ...rootUser.toJSON() })
        // 在測試資料庫中，新增 mock 資料
        await db.User.create({ name: 'User1', email: 'User1', password: 'User1' })
        await db.User.create({ name: 'User2', email: 'User2', password: 'User2' })
      })

      // GET /users/:id
      it(' - successfully', (done) => {
        request(app)
          .get('/api/users/1')
          .set('Accept', 'application/json')
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err)
            // 檢查是否回傳資料裡有 root 的資料
            res.body.user.name.should.equal('root')

            return done()
          })
      })

      after(async () => {
        // 清除登入及測試資料庫資料
        this.authenticate.restore()
        this.getUser.restore()
        await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, { raw: true })
        await db.User.destroy({ where: {}, truncate: true, force: true })
        await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, { raw: true })
      })
    })
  })
})

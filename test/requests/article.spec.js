const chai = require('chai')
const request = require('supertest')
const sinon = require('sinon')
const app = require('../../app')
const helpers = require('../../helpers/auth-helpers')
const should = chai.should()
const expect = chai.expect
const db = require('../../models')
const passportUseJWT = require('../../middleware/auth-jwt-strategy')

describe('# article requests', () => {
  context('# POST ', () => {
    describe('POST /api/articles', () => {
      before(async () => {
        // 清除測試資料庫資料
        await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, { raw: true })
        await db.User.destroy({ where: {}, truncate: true, force: true })
        await db.Article.destroy({ where: {}, truncate: true, force: true })
        await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, { raw: true })
        // 模擬登入資料
        const rootUser = await db.User.create({ name: 'root', email: 'root@', password: 'root', permission: 'login' })
        this.authenticate = sinon.stub(passportUseJWT, 'authenticate').callsFake((strategy, options, callback) => {
          callback(null, { ...rootUser }, null)
          return (req, res, next) => {}
        })
        this.getUser = sinon.stub(
          helpers, 'getUser'
        ).returns({ ...rootUser.toJSON() })
        // 在測試資料庫中，新增 mock 資料
        await db.User.create({ name: 'User1', email: 'User1', password: 'User1' })
      })

      // 新增文章 - POST /articles
      it(' - successfully', (done) => {
        request(app)
          .post('/api/articles')
          .send('userId=1&categoryId=1&title=伊藤開司&permission=login&content=給開司一罐啤酒')
          .set('Accept', 'application/json')
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err)
            // 檢查是否有回傳正確資料
            db.Article.findByPk(1).then(article => {
              article = article.toJSON()
              article.userId.should.equal(1)
              article.title.should.equal('伊藤開司')
              article.content.should.equal('給開司一罐啤酒')
              return done()
            })
          })
      })

      after(async () => {
        this.authenticate.restore()
        this.getUser.restore()
        await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, { raw: true })
        await db.User.destroy({ where: {}, truncate: true, force: true })
        await db.Article.destroy({ where: {}, truncate: true, force: true })
        await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, { raw: true })
      })
    })
  })

  context('# GET ', () => {
    describe('GET /api/articles', () => {
      before(async () => {
        // 清除測試資料庫資料
        await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, { raw: true })
        await db.User.destroy({ where: {}, truncate: true, force: true })
        await db.Article.destroy({ where: {}, truncate: true, force: true })
        await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, { raw: true })
        // 模擬登入資料
        const rootUser = await db.User.create({ name: 'root', email: 'root@', password: 'root', permission: 'login' })
        this.authenticate = sinon.stub(passportUseJWT, 'authenticate').callsFake((strategy, options, callback) => {
          callback(null, { ...rootUser }, null)
          return (req, res, next) => {}
        })
        this.getUser = sinon.stub(
          helpers, 'getUser'
        ).returns({ ...rootUser.toJSON() })
        // 在測試資料庫中，新增 mock 資料
        await db.User.create({ name: 'User1', email: 'User1', password: 'User1' })
        await db.Article.create({ userId: 1, categoryId: '1', title: '魷魚遊戲', permission: 'login', content: '這裡是地獄' })
        await db.Response.create({ userId: 1, articleId: 1, content: '外面才是地獄' })
      })

      // GET /articles - 所有文章
      it(' - successfully', (done) => {
        request(app)
          .get('/api/articles')
          .set('Accept', 'application/json')
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err)
            expect(res.body.articles).to.be.an('array')
            // 檢查是否回傳資料有 User1 的 Article1
            res.body.articles[0].content.should.equal('這裡是地獄')
            return done()
          })
      })

      // GET /articles/:id - 一筆文章
      it(' - successfully', (done) => {
        request(app)
          .get('/api/articles/1')
          .set('Accept', 'application/json')
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err)
            expect(res.body.article).to.be.an('object')
            // 檢查是否回傳資料有 id=1 的 Article
            res.body.article.content.should.equal('這裡是地獄')
            res.body.article.Responses[0].content.should.equal('外面才是地獄')
            return done()
          })
      })

      after(async () => {
        this.authenticate.restore()
        this.getUser.restore()
        await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, { raw: true })
        await db.User.destroy({ where: {}, truncate: true, force: true })
        await db.Article.destroy({ where: {}, truncate: true, force: true })
        await db.Response.destroy({ where: {}, truncate: true, force: true })
        await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, { raw: true })
      })
    })
  })
})

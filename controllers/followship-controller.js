const { Followship } = require('../models')
const authHelpers = require('../helpers/auth-helpers')
const { caughtErr } = require('../helpers/err-helpers')

const followshipController = {
  postIdol: async (req, res, next) => {
    try {
      const idolId = Number(req.params.idolId)
      const { id: fanId } = authHelpers.getUser(req)
      if (idolId === fanId) {
        throw caughtErr('無法追蹤自己', 400, 41)
      }

      const followship = await Followship.findOne({
        where: { idolId, fanId }
      })
      if (followship) {
        throw caughtErr('你已追蹤此偶像', 400, 21)
      }

      const newfollowship = await Followship.create(
        { idolId, fanId }
      )
      return res.json({
        success: true,
        followship: newfollowship
      })
    } catch (err) {
      next(err)
    }
  },
  deleteIdol: async (req, res, next) => {
    try {
      const idolId = Number(req.params.idolId)
      const { id: fanId } = authHelpers.getUser(req)
      const followship = await Followship.findOne({
        where: { idolId, fanId }
      })
      if (!followship) {
        throw caughtErr('因你尚未追蹤此偶像，故無法取消追蹤', 404, 11)
      }

      const deletedfollowship = await followship.destroy()
      return res.json({
        success: true,
        followship: deletedfollowship
      })
    } catch (err) {
      next(err)
    }
  }

}
module.exports = followshipController

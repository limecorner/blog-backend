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
        data: {
          followship: newfollowship
        }
      })
    } catch (err) {
      next(err)
    }
  }

}
module.exports = followshipController

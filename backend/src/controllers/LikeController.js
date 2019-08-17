const Dev = require('../model/Dev')

module.exports = {
  async store(req, res) {
    const { devsid } = req.params
    const { user } = req.headers
    const loggedDev = await Dev.findById(user)
    const targetDev = await Dev.findById(devsid)

    if (!targetDev) {
      return res.status(400).json({ error: 'dev not exists' })

    }
    if (targetDev.likes.includes(user)) {
      console.log('Deu Match')
    }
    loggedDev.likes.push(targetDev._id)

    await loggedDev.save()

    return res.json({ ok: true })
  }
}
const axios = require('axios')
const Dev = require('../model/Dev')
module.exports = {
  async store(req, res) {
    const { username } = req.body
    const userExists = await Dev.findOne({ user: username })
    if (userExists) return res.json(userExists)
    const response = await axios.get(`https://api.github.com/users/${req.body.username}`)
    const { avatar_url: avatar, bio, name } = response.data

    const dev = await Dev.create({
      name,
      bio,
      avatar,
      user: username,
    })
    return res.json(dev)
  },
  async index(req, res) {
    const { user } = req.headers
    const loggedDev = await Dev.findById(user)
    const users = await Dev.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedDev.likes } },
        { _id: { $nin: loggedDev.dislikes } }
      ]
    });

    return res.json(users)

  }
}
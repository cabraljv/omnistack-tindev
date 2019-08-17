const express = require('express')
const DevController = require('./controllers/DevController')
const LikeController = require('./controllers/LikeController')
const DislikeController = require('./controllers/DislikeController')

const routes = express.Router();
routes.get('/', async (req, res) => {
  return res.send('API OK')
})
routes.post('/devs', DevController.store)
routes.get('/devs', DevController.index)
routes.post('/devs/:devsid/like', LikeController.store)
routes.post('/devs/:devsid/dislike', DislikeController.store)
module.exports = routes;
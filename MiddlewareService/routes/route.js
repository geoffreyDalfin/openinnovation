const express = require('express');
const router = express.Router();
var gameCtrl = require('../controllers/gameController');

router.route('/createGame').post(gameCtrl.createGame);
router.route('/addPoint').post(gameCtrl.addPointToUser);

module.exports = router;
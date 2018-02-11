var express = require('express');
var router = express.Router();
var playersCtrl = require('../controllers/players')

router.get('/', playersCtrl.getAllPlayers);
router.get('/:id', playersCtrl.getOnePlayer);
router.post('/', playersCtrl.createPlayer);
router.put('/:id', playersCtrl.updatePlayer);
router.delete('/:id', playersCtrl.deletePlayer);

module.exports = router;

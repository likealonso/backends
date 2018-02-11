var express = require('express');
var router = express.Router();
var ballersCtrl = require('../controllers/players')
/* GET users listing. */

// GET /players
router.get('/', ballersCtrl.index);
//GET/players/new
router.get('/new', ballersCtrl.new);
// POST /players
router.post('/', ballersCtrl.create);
// DELETE /players/:id
router.delete('/:id', ballersCtrl.destroy);
// GET /players/:id/edit
router.get('/:id/edit', ballersCtrl.edit);
//PUT /players/:id
router.put('/:id', ballersCtrl.update);

router.get('/:id', ballersCtrl.show);

module.exports = router;

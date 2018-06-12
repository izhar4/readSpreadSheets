var express         = require('express');
var router          = express.Router();
var controller      = require('../controllers/controller')


router.get('/getData/:sheetId/:range', function(req, res){
	controller.getSheetData(req, res);
})

router.post('/saveData', function(req, res){
    controller.updateSheetData(req, res)
})

router.post('/updateData', function(req, res){
    controller.updateSheetData(req, res)
})

module.exports = router;
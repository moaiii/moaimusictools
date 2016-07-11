var express = require('express');
var router = express.Router();

// GET the BPM calc page
router.get('/', function(req, res, next) {
	res.render('guitarscales', {title: 'Guitar Scales'});
});

module.exports = router;
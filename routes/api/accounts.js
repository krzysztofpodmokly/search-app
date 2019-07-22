const express = require('express');
const router = express.Router();

// @route     GET api/accounts
// @desc      Register user
// @access    Public - no token needed
router.get('/', (req, res) => res.send('Accounts route'));

module.exports = router;

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Account = require('../../models/Account');
const ObjectId = require('mongodb').ObjectID;

// @route     POST api/accounts
// @desc      Create or update account
// @access    Private
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required')
        .not()
        .isEmpty(),
      check('titleNum', 'Account number is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    console.log('REQ.BODY => ', req.body);
    console.log('REQ.USER.ID => ', req.user.id);

    const { title, titleNum } = req.body;

    const accountFields = {};
    accountFields.user = req.user.id;
    if (title) accountFields.title = title;
    if (titleNum) accountFields.titleNum = titleNum;

    try {
      // let account = await Account.findOne({ user: req.user.id });

      let account = new Account(accountFields);
      await account.save();
      res.send(account);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route     GET api/accounts
// @desc      Get accounts based on user input | Matching title only
// @access    Public
router.get('/', async (req, res) => {
  try {
    console.log(req.query.term);
    const userQuery = req.query.term.toLowerCase();
    // const regExp = new RegExp(`.*${userQuery}.*`, `gi`);
    const accounts = await Account.find({
      title: { $regex: userQuery, $options: 'i' }
    });
    res.send(accounts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/accounts/:account_id
// @desc      Get account based on account id
// @access    Public
router.get('/:account_id', async (req, res) => {
  try {
    const id = req.params.account_id;
    const account = await Account.findOne({ _id: ObjectId(id) });
    res.send(account);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

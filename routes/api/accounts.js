const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Account = require('../../models/Account');
const ObjectId = require('mongodb').ObjectID;

// @route     POST api/accounts
// @desc      Create account with title, title number and unlimited amount of meta                    information stored in an array
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
        .isEmpty(),
      check('meta', 'Meta information is required')
        .isArray()
        .custom(arrayToValidate =>
          arrayToValidate.every(obj => {
            if (
              obj.content === '' &&
              obj.contentNum === '' &&
              obj.details === ''
            ) {
              return false;
            } else {
              return true;
            }
          })
        )
        .withMessage('Meta information is required')
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const { title, titleNum, meta } = req.body;

    const newMeta = meta.map(obj => {
      let newMetaObj = {};
      newMetaObj.content = obj.content;
      newMetaObj.contentNum = obj.contentNum;
      newMetaObj.details = obj.details;
      newMetaObj.tags = obj.tags.split(/[ ,]+/); // splitting words from input field
      return newMetaObj;
    });

    const accountFields = {};
    accountFields.user = req.user.id;
    if (title) accountFields.title = title;
    if (titleNum) accountFields.titleNum = titleNum;
    if (newMeta.length > 0) accountFields.meta = newMeta;

    try {
      let account = new Account(accountFields);
      await account.save();
      res.send(account);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route     PUT api/accounts/:accountId
// @desc      Edit account
// @access    Private
router.put(
  '/:accountId',
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

    const { title, titleNum } = req.body;

    const accountFields = {};
    accountFields.user = req.user.id;
    if (title) accountFields.title = title;
    if (titleNum) accountFields.titleNum = titleNum;

    try {
      const id = req.params.accountId;

      account = await Account.findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: accountFields },
        { new: true }
      );

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
    const userQuery = req.query.query.toLowerCase();
    const accounts = await Account.find({
      title: { $regex: userQuery, $options: 'i' }
    })
      .populate('user', ['name'])
      .sort({ titleNum: 1 }); // sort ascending
    res.send(accounts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/accounts/:accountId
// @desc      Get account based on Account Meta Information
// @access    Public
router.get('/:accountId', async (req, res) => {
  try {
    const id = req.params.accountId;
    const account = await Account.findOne({ 'meta._id': ObjectId(id) });
    if (!account) {
      return res.status(404).send({ msg: 'Account not found' });
    }

    res.send(account);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).send({ msg: 'Account not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route     DELETE api/accounts/:accountId
// @desc      Delete account
// @access    Private
router.delete('/:accountId', auth, async (req, res) => {
  try {
    const id = req.params.accountId;
    // await Account.findOneAndRemove({ _id: ObjectId(id) });
    const account = await Account.findById({ _id: id });

    if (!account) {
      return res.status(404).send({ msg: 'Account not found' });
    }

    await account.remove();
    res.send({ msg: 'Account successfully deleted!' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).send({ msg: 'Account not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route     PUT api/accounts/meta/
// @desc      Add account meta
// @access    Private
router.put(
  '/meta',
  [
    auth,
    [
      check('content', 'Account content is required')
        .not()
        .isEmpty(),
      check('contentNum', 'Account number is required')
        .not()
        .isEmpty(),
      check('details', 'Account details are required')
        .not()
        .isEmpty(),
      check('tags', 'Tags are required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    // const id = req.params.accountId;
    const { content, contentNum, details, tags } = req.body;

    const newMeta = {
      content,
      contentNum,
      details,
      tags
    };

    if (tags) {
      newMeta.tags = skills.split(',').map(skill => skill.trim());
    }

    try {
      // Fetch account to which we want to add META to
      const account = await Account.findOne({ user: req.user.id });

      account.meta.unshift(newMeta);
      await account.save();
      res.send(account);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route     DELETE api/accounts/meta/accountId/:subId
// @desc      Remove account meta item by index
// @access    Private
router.delete('/meta/:accountId/:subId', auth, async (req, res) => {
  try {
    const { subId, accountId } = req.params;
    const account = await Account.findOne({ _id: ObjectId(accountId) });

    // Pull out meta
    const meta = account.meta.find(item => item.id === subId);

    // Make sure that meta exists
    if (!meta) {
      return res.status(404).send({ msg: 'Meta information does not exist' });
    }

    // Finde index of meta id which matches the one which was clicked
    const removeIndex = account.meta.map(item => item.id).indexOf(subId);

    account.meta.splice(removeIndex, 1);

    await account.save();

    res.send(account.meta); // return all meta information
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

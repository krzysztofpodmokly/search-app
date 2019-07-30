const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true
  },
  titleNum: {
    type: Number,
    required: true
  },
  meta: [
    {
      content: {
        type: String,
        required: true
      },
      contentNum: {
        type: String,
        required: true
      },
      details: {
        type: String,
        required: true
      },
      tags: {
        type: [String]
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

const Account = mongoose.model('account', AccountSchema);

module.exports = Account;

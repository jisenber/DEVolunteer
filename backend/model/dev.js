'use strict'

let mongoose = require('mongoose')

//Dev user model
let devSchema = mongoose.Schema({

  username: {type: String, ref: 'users', unique: true},
  name: {type: String},

  city: {type: String},
  state: {type: String},
  phone: {type: String},
  email: {type: String},
  picture: {type: String},
  website: {type: String},
  // languages: [{type: String}],
  javascript: {type: Boolean},
  html: {type: Boolean},
  angular: {type: Boolean},
  react: {type: Boolean},
  python: {type: Boolean},
  otherlang: {type: Boolean},
  services: [{type: String}],
  available: {type: Boolean},
  reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'reviews'}],
});


module.exports = mongoose.model('devs', devSchema);

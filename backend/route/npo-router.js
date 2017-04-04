//create a post to create profile for an NPO

let Router = require('express').Router;
let bearerAuth = require('../lib/bearer-auth-midd.js');
let createError = require('http-errors');
let Npo = require('../model/npo');
let jsonParser = require('body-parser').json();

let router = module.exports = new Router();


router.get('/api/npoList', (req, res, next) => {
  console.log('in the NPO router get for finding NPOs');

  Npo.find()
  .then(allNpoObj => {
    res.send(allNpoObj);
  })
  .catch(next);
});
//req.user should be a individual user which the bearer auth will identify

router.post('/api/npo/', bearerAuth, jsonParser, (req, res, next) => {
  if(!req.user.isNPO) return next(createError(401, 'Please log in as a Non Profit Organization'));

  //req.body will be values from the form they fill out on angular front-end
  const npo = new Npo(req.body);
  // console.log('THIS IS THE NPO', npo);
  npo.save()
  .then(npo => res.json(npo))
  .catch(next);
});

router.get('/api/npo', bearerAuth, (req, res, next) => {
  if(!req.user.isNPO) return next(createError(401, 'please log in as an NPO'));

  Npo.findOne({username: req.user.username})
  .then( npo => {
    //if dev is null, return a 404 error. This is important for edit profile functionality
    if(!npo) return next(createError(404, 'Not found'));
    res.json(npo);
  })
  .catch(err => {
    console.error(err);
  });
});

router.delete('/api/npo', bearerAuth, (req, res) => {
  Npo.findByIdAndRemove(req.user.id)
  .then(()=> {
    res.sendStatus(204)
  })
  .catch(e => {
    console.log(e);
    res.json({}); //or err.message?
  });
});


router.put('/api/npo/:id', bearerAuth, jsonParser, (req, res, next) => {
  Npo.findById(req.params.id)
  .catch(err => {
    Promise.reject(createError(404, 'NPO does not exist'))

  })
  .then(npo => {
    return Npo.findOneAndUpdate(req.params.id, req.body, {new: true})
  })
  .then(npo => {
    res.json(npo)
  })
  .catch(next)
  // Npo.findByIdAndUpdate(req.params.id, req.body, {new: true})
  // .then(npo => {
  //
  //
  // })
  // .then(user => {
  //   user.save();
  //   delete req.body.password;
  //   console.log(user);
  //   res.json(user);
  //   // console.log(user);
  // })
  // .catch(e => {
  //   console.log(e);
  //   res.json({});
  // });
})

// submit form via email logic here:
// heroku addons:create postmark:10k
 // npm install postmark
// var postmark = require("postmark")(process.env.POSTMARK_API_TOKEN)
//
// postmark.send({
//     "From": "leonard@bigbangtheory.com",
//     "To": "sheldon@bigbangtheory.com",
//     "Subject": "Hello from Postmark",
//     "TextBody": "Hello!",
//     "Tag": "big-bang"
// }, function(error, success) {
//     if(error) {
//         console.error("Unable to send via postmark: " + error.message);
//        return;
//     }
//     console.info("Sent to postmark for delivery")
// });

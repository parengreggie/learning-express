var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');


router.get('/', function(req, res, next) {
  res.render('contact', {
    title: 'Contact'
  });
});

// send email
router.post('/send', function(req, res, next){
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'email@gmail.com',
      pass: 'emailpassword'
    }
  });

  var mailOptions = {
    from: 'email name"  ?" <@gmail.com>',
    to: 'sentTo@gmail.com',
    subject: 'Hello from PCRepair',
    text: 'You have a submission from.... Name: '+ req.body.name +' Email: '+req.body.email+'Message: '+req.body.message,
    html: '<p>You have a submission from.... </p><ul><li>Name: '+ req.body.name +'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li>'
  }

  transporter.sendMail(mailOptions, function(err, info){
    if(err) {
      return console.log(err);
    }
    console.log('Message Sent: '+ info.response);
    res.redirect('/');
  });
});

module.exports = router;
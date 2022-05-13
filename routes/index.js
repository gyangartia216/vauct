var express = require('express');
var router = express.Router();
const app = express();
var session=require('express-session');

/* GET home page. */
router.get('/', function(req, res, next) {
    var log = req.session.loggedin;
    console.log(log);
  res.render('index', { title: 'Express' ,loggedin:log});
});


app.get('/', function(req, res, next) {
    var loggedIn=req.session.loggedin;
    console.log(loggedIn);
    res.render('index', { title: 'Express' ,loggedin:req.session.loggedin});
  });
module.exports = router;

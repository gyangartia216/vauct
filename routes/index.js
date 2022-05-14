// var express = require('express');
// var router = express.Router();
// const bcrypt = require('bcrypt');
// var createError = require('http-errors');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// const mysql=require('mysql2');
// const parser=require('body-parser');
// const session = require('express-session');
// const MYSQLStore = require("express-mysql-session")(session);
// const cors = require("cors");
// const req = require('express/lib/request');
// const nodemailer = require('nodemailer')

// const saltRounds = 10

// // router.set('views', path.join(__dirname, 'views'));
// // router.set('view engine', 'ejs');
// router.use('/', express.static('static'));
// router.use(express.static('public'))
// router.use('views', express.static('static'));
// router.use(logger('dev'));
// router.use(express.json());
// router.use(express.urlencoded({ extended: false }));
// router.use(cookieParser());
// router.use(express.static(path.join(__dirname, 'public')));

// //database connection
// var connection=mysql.createConnection(
//     {
//         host:'localhost',
//         user:'root',
//         password:'gyan05',
//         database:'vauct'
//     });
 
//     connection.connect((err)=>
//     {
//         if(!err)
//             console.log('DB Connected...');
//         else
//             console.log('Error');
//     })

// /* GET home page. */
// // router.get('/', function(req, res, next) {
// //   res.render('index.ejs');
// // });
// // router.get('/home',(req,res)=> {
// //   res.render('index.ejs');
// // });

// router.get('/login', function(req, res, next) {
//   res.render('login24.ejs');
// });
// router.get('/register', function(req, res, next) {
//   res.render('register24.ejs');
// });

//   router.get("/about", (req, res) =>{
//       res.render("about.ejs");
//     })
  
//     router.get("/contact", (req, res) =>{
//       res.render("contact.ejs");
//     })
//     // router.get("/header", (req, res) =>{
//     //     res.render("header2.ejs",{usrname:req.session.user});
//     //   })

// //logging in function
// // router.get("/logedin", (req, res) =>{
// //     if(req.session.user )
// //     {
// //             res.send({ loggedIn: true, user:req.session.user});
// //     }else{
// //         res.send({loggedIn: false});
// //     }
// // })

// //Logout function
// router.get('/logout',function(req,res)
// {
//     console.log("Logout accessed");
//   req.session.destroy();
//   res.redirect('/');
// });

// router.use(parser.json());
// router.use(express.urlencoded());
// router.use(express.static('public'));
// router.use(express.static(__dirname+'/css'));
// router.use(parser.urlencoded( { extended: true }));
// router.use(cookieParser())

// router.use(cors({
// 	origin: ["http://localhost:5001"],
// 	methods: ["GET", "POST"],
// 	credentials: true
// }));


// router.use(session({
// 	key: "userID",
// 	secret: "suscribe",
// 	resave: false,
// 	saveUninitialized: false,
// 	cookie: {
// 		expires: 60*60*24,
// 	},
// }));


// // router.use(function(err, req, res, next) {
// //   // set locals, only providing error in development
// //   res.locals.message = err.message;
// //   res.locals.error = req.router.get('env') === 'development' ? err : {};

// //   // render the error page
// //   res.status(err.status || 500);
// //   res.render('error');
// // });

// //sign up or register
// router.post('/signup',(req,res)=>
//     {
//         const name = req.body.name;
//         const email = req.body.email;
//         const password = req.body.password;

//         bcrypt.hash(password, saltRounds, (err, hash)=>{
//             if(err){
//                 console.log(err)
//             }
//             connection.query(
//                 "INSERT INTO register (name, email, password) VALUES (?,?,?)", [name, email, hash], 
//                 (err, result) =>
//                 {
//                     if(err) throw err;
//                     console.log("Inserted rows...");
//                     res.redirect("/login");
//                 });
//             })
//     });

// //login or sign in
// router.post('/signin', (req, res) => 
// {
//     const email = req.body.email;
//     const password = req.body.password;

//     connection.query (
//         "SELECT * FROM register WHERE email = ?", email ,
//         (err, result)=>{
//             if(err){
//                 res.send({err: err});
//             }
//             //if(result.length > 0){
//             //  console.log(result);
//                 bcrypt.compare(password, result[0].password, (error, response)=>{
//                     if(response){
//                         req.session.user = result[0].name;
//                         console.log("Hiii "+ req.session.user);
//                         console.log(result);

//                         console.log("Logged in successfully!!");
//                         req.session.loggedin=true;
//                     //     let user={
//                     //         loggedin:true,
//                     //         name: result[0].name
//                     //     }
//                     //     res.cookie("userData", user);
//                     //   console.log(req.cookies);
//                       // req.session.e = e;
//                       req.session.email = email;
//                       req.session.save();

//                         // Redirect to home page
//                          res.redirect('/#login=true');		
//                          req.session.user = result[0].name;
                         
//                          //res.send(result);
                         
//                     }
//                     else{
//                         console.log("wrong username/password combination!");
//                         res.redirect('/login');
//                         //window.alert("invalid password/username");
//                         //res.send({message: "wrong username/password combination!"});
//                     }
//                     });
//                 // }else
//                 //     {
//                 //         console.log("user doesn't exist");
//                 //         res.send({message: "user doesn't exist"});
//                 //     }
//         }
//     );
// })

// // var session;
// // router.get('/',(req,res) => {
// //     session=req.session;
// //     if(session.userid){
// //         res.send("Welcome User <a href=\'/logout'>click to logout</a>");
// //     }else
// //     res.sendFile('/index.ejs',{root:__dirname})
// // });


// router.get('/', function(req, res, next) {
//     var loggedIn=req.session.loggedin;
//     console.log(loggedIn);
//     res.render('index', { title: 'Express' ,loggedin:req.session.loggedin});
//   });

// // let mailTranspoter = nodemailer.createTransport({
// //     service: "gmail",
// //     auth:{
// //         user: "project.work.5686@gmail.com",
// //         pass: "gyan2147216",
// //     },
// // })

// // let details = {
// //     from: "project.work.5686@gmail.com",
// //     to: "aakash.singh@mca.christuniversity.in",
// //     subject: "forget password",
// //     text: "password sending",
// // }

// // mailTransporter.sendMail(detail, (err)=>{
// //     if(err){
// //         console.log("error in mail sending");
// //     }else{
// //         console.log("email sent")
// //     }
// // })

// module.exports = router;

var express = require('express');
var router = express.Router();
const app = express();
var session=require('express-session');

/* GET home page. */

router.get('/', function(req, res, next) 
{
    // var loggedIn=req.session.loggedin;
    // console.log(loggedIn);
    res.render('index', { title: 'Express'});
  });
module.exports = router;
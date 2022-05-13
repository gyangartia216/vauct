var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql=require('mysql2');
const parser=require('body-parser');
const session = require('express-session');
const MYSQLStore = require("express-mysql-session")(session);
const cors = require("cors");
const bcrypt = require('bcrypt');
const req = require('express/lib/request');
var app = express();

var indexRouter = require('./routes/index');
// var indexRouter = require('./app.js');
var usersRouter = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use('/', express.static('static'));
app.use(express.static('public'))
app.set('view engine', 'ejs');
app.use('views', express.static('static'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


app.listen('5001', ()=> {
  console.log("Server started at 5001");
})


app.use(parser.json());
app.use(express.urlencoded());
app.use(express.static('public'));
app.use(express.static(__dirname+'/css'));
app.use(parser.urlencoded( { extended: true }));
app.use(cookieParser())

//database connection
var connection=mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'gyan05',
        database:'vauct'
    });
 
    connection.connect((err)=>
    {
        if(!err)
            console.log('DB Connected...');
        else
            console.log('Error');
    })

// ******************************//


app.use(parser.json());
app.use(express.urlencoded());
//app.use(express.static('public'));
app.use(express.static(__dirname+'/css'));

// app.use(cors({
// 	origin: ["http://localhost:5001"],
// 	methods: ["GET", "POST"],
// 	credentials: true
// }));

const saltRounds = 10

 app.use(parser.urlencoded( { extended: true }));
app.use(cookieParser())

app.use(session({
	key: "userID",
	secret: "suscribe",
	resave: false,
	saveUninitialized: false,
	cookie: {
		expires: 60*60*24,
	},
})
);

  

     app.get('/register',(req, res)=>
     {
         //console.log(req.url);
         res.render('register24.ejs');
     });

     app.get('/login', (req, res)=>
     {
         res.render('login24.ejs');
     });

       app.get("/about", (req, res) =>{
      res.render("about.ejs");
    });
  
    app.get("/contact", (req, res) =>{
      res.render("contact.ejs");
    });

    //  app.get('/home',(req,res)=> {
    //     res.sendFile(__dirname +'index.ejs');
    //     //res.sendFile("/index.html");
    // });




    app.post('signup',(req,res)=>
    {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        bcrypt.hash(password, saltRounds, (err, hash)=>{
            if(err){
                console.log(err)
            }
            connection.query(
                "INSERT INTO register (name, email, password) VALUES (?,?,?)", [name, email, hash], 
                (err, result) =>
                {
                    if(err) throw err;
                    console.log("Inserted rows...");
                    res.redirect("/login");
                });
            })
    });

// app.get("/login", (req, res) =>{
//     if(req.session.user )
//     {
//             res.send({ loggedIn: true, user:req.session.user});
//     }else{
//         res.send({loggedIn: false});
//     }
// })

//Logout function
app.get('/logout',function(req,res)
{
    console.log("Logout accessed");
  req.session.destroy();
  res.redirect('/');
});


app.post('/signin', (req, res) => 
{
    //const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    connection.query (
        "SELECT * FROM register WHERE email = ?", email ,
        (err, result)=>{
            if(err){
                res.send({err: err});
            }
            if(result.length > 0){
                bcrypt.compare(password, result[0].password, (error, response)=>{
                    if(response){
                        req.session.user = result[0].name;
                       // localStorage.setItem(req.session.user, result[0].name);
                        sessionStorage.setItem(req.session.user, result[0].name);
                        sessionStorage.setItem(req.session.loggedin, true);
                        essionStorage.setItem(req.session.email, email);
                        console.log("Hiii "+ req.session.user);
                        console.log(result);
                        onsole.log(req.session.loggedin);
                        console.log("Logged in successfully!!");
                        //req.session.loggedin=true;
                    //     let user={
                    //         loggedin:true,
                    //         name: result[0].name
                    //     }
                    //     res.cookie("userData", user);
                    //   console.log(req.cookies);
                      // req.session.e = e;
                      req.session.save();

                        // Redirect to home page
                         
                        //  req.session.user = result[0].name;
                         req.session.email = email;
                         //res.redirect('/#login=true');		

                         
                    }
                    else{
                        console.log("wrong username/password combination!");
                        //res.send({message: "wrong username/password combination!"});
                    }
                    });
                }else
                    {
                        console.log("user doesn't exist");
                        res.send({message: "user doesn't exist"});
                    }
        }
    );
})


// app.get('/', function(req, res, next) {
//     res.render('index', { title: 'Express' ,loggedin:req.session.loggedin});
//   });

module.exports = app;

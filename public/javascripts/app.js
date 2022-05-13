const mysql=require('mysql2');
const express=require('express');
var app=express();
const path = require('path');
const parser=require('body-parser');
app.use(parser.json());
app.use(express.urlencoded());
//app.use(express.static('public'));
app.use(express.static(__dirname+'/css'));
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
     app.listen(5700,()=>console.log('Server Startred...'));
     app.get('/register',(req,res)=>
     {
         //console.log(req.url);
         res.sendFile(__dirname +'/register24.html');
     });

     app.get('/login',(req,res)=>
     {
         res.sendFile(__dirname +'/login24.html');
         
     });

    app.post('/submit',(req,res)=>
    {
       // console.log("hii");
        console.log(req.body);
        var sql="insert into register SET ?";
        var data=req.body;
        var  query=connection.query(sql,data,(err,result)=>
        {
            if(err) throw err;
            res.send("Inserted rows....");
            res.redirect("/login24.html");
        });
    })

    app.get('/home',(req,res)=> {
        res.sendFile("/vauct/Vauct-main/index.html");
    });
    
    // app.post('/submit1',(req,res)=>
    // {
    //     console.log("hey");
    //     console.log(req.body);
    //     //var sql="";
    //     var data=req.body;
    //     var  query=connection.query(sql,data,(err,result)=>
    //     {
    //         if(err) throw err;
    //         res.send("Inserted rows....");
    //     });
    // })

 //login
app.post('/submit1', (req, res) => 
{
    console.log("Entered login module");
    var username = req.body.username;
    var password = req.body.password;
    console.log(username);
    console.log(password);
  
    var query = connection.query('Select * from register where email = ? and password = ?', [username, password], function (err, results, fields)
     {
      if (err) throw error;
      if (results.length > 0) {
        // var user=results[0];
        // req.session.usr_id=user.userId;
        // req.session.loggedin=true;
        // req.session.save();
        // Authenticate the user
        console.log("Logged in successfully!!");
        // req.session.loggedin = true;
        // req.session.e = e;
        // req.session.save();
        // Redirect to home page
        res.redirect('home');
      }
       else
       {
        console.log('Incorrect Username and/or Password!');
        res.redirect('/');
      }
    });
})
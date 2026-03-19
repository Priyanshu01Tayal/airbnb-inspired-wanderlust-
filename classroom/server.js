const express = require('express');
const app = express();
const session=require("express-session");
const flash=require("connect-flash");
const path=require("path");
app.use(session({secret:"thiissecret",resave:false,saveUninitialized:true}))
app.use(flash());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.get("/req",(req,res)=>{
    let {name="khalid"}=req.query;
    req.session.name=name;
    req.flash("success","Name has been set successfully");
    console.log(req.session);
  
    res.redirect("/hello")
})

app.get("/hello",(req,res)=>{
    console.log(req.session);
    console.log(req.flash("success"));
res.locals.success=req.flash("success");
    res.render("page", { name: req.session.name });
});

  

// app.get("/reqcount",(req,res)=>{
//     if(req.session.count)
//     {
//         req.session.count+=1;
//     }
//     else
//     {
//         req.session.count=1;
//     }
//     res.send(`Request count: ${req.session.count}`);
// });

app.get("/test",(req,res)=>{
    res.send("sucess")
})

app.listen(3001,()=>{
    console.log("server has been started")
})
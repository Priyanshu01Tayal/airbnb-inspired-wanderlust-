// const express = require("express");
// const router = express.Router();
// const User = require("../models/user.js");
// const wrapAsync = require("../utils/wrapAsync.js");
// const passport = require("passport");
// const {saveRedirectUrl}=require("../middleware.js");
    
// router.get("/signup", (req, res) => {
//     res.render("users/signup");
// });

// router.post("/signup", wrapAsync(async (req, res, next) => {
//     try {
//         let { username, email, password } = req.body;

//         const newUser = new User({ email, username });
//         const registeredUser = await User.register(newUser, password);
// req.login(registeredUser,(err)=>{
//     if(err)
//     {
//         return next(err);
//     }
    
//         req.flash("success", "Welcome to Wanderlust");
//         res.redirect(req.session.redirectUrl); 
// });

//     } catch (err) {
//         req.flash("error", err.message);
//         res.redirect("/signup");
//     }
// }));



// router.get("/login", (req, res) => {
//     res.render("users/login");
// });


// router.post("/login",saveRedirectUrl, passport.authenticate("local", {
//     failureRedirect: "/login",
//     failureFlash: true 
// }),async (req, res) => {
// req.flash("success", "Welcome back!");
// res.redirect(res.locals.redirectUrl);
// }
// );
//  router.get("/logout",(req,res,next)=>{
//     req.logout((err)=>{
//         if(err)
//         {
//             next(err);
//         }
//         req.flash("success","you have loge out");
//         res.redirect("/listings");

//     })
//  })

// module.exports = router;



const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController=require("../controllers/user.js")

// ================= SIGNUP =================
router.route("/signup")
.get(userController.renderSignUpForm)
.post(wrapAsync(userController.signup))

// ================= LOGIN =================
router.route("/login")
.get( userController.renderLoginForm)
.post(saveRedirectUrl, // ✅ ab ye properly function hai
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }),
    userController.login
);

// ================= LOGIN =================


// ================= LOGOUT =================
router.get("/logout", userController.logout);

module.exports = router;
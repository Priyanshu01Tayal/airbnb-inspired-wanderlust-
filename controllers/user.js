const user=require("../models/user")
module.exports.renderSignUpForm=(req, res) => {
    res.render("users/signup");
}


module.exports.signup=async (req, res, next) => {
    try {
        let { username, email, password } = req.body;

        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) return next(err);

            req.flash("success", "Welcome to Wanderlust");
            res.redirect(req.session.redirectUrl || "/listings"); // ✅ FIX
        });

    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
}


module.exports.renderLoginForm=(req, res) => {
    res.render("users/login");
}


module.exports.login=(req, res) => {
        req.flash("success", "Welcome back!");
        res.redirect(res.locals.redirectUrl || "/listings"); // ✅ FIX
    }



module.exports.logout=(req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);

        req.flash("success", "You have logged out"); // ✅ FIXED text
        res.redirect("/listings");
    });
}    
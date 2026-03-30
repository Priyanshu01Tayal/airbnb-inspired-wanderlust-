// const Listing=require("./models/listing")
const ExpressError=require("./utils/ExpressError.js");
const Listing=require("./models/listing.js")
const Review=require("./models/review.js")
const {listingSchema, reviewSchema } = require("./schema.js");
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl; // ✅ FIXED spelling
        req.flash("error", "You must be logged in");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};



module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id))
    {
        req.flash("error","you do not have a permission ")
          return res.redirect("/listings")
    }
    next();
}

module.exports.validateListing = (req, res, next) => {
      const { error } = listingSchema.validate(req.body);
  
      if (error) {
          throw new ExpressError(400, error.message);
      }
  
      next();
  };
  

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);

    if (error) {
        throw new ExpressError(400, error.message);
    }

    next();
};

module.exports.isReviewAuthor=async(req,res,next)=>{
    let {reviewId}=req.params;
    let review=await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id));
    {r
        req.flash("error","you do not have a permission ")
          return res.redirect("/listings")
    }
    next();
}


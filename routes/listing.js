const express=require("express");
const router=express.Router();

const wrapAsync=require("../utils/wrapAsync.js");
const {ListingSchema, listingSchema,reviewSchema}=require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing=require("../models/listing.js")
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js")

const listingController=require("../controllers/listing.js")


// indexx route
router.get("/",wrapAsync(listingController.index));

// new route
router.get("/new",isLoggedIn,listingController.renderNewForm)

// show route
router.get("/:id",wrapAsync(listingController.showListing));

//create

router.post("/",isLoggedIn,validateListing,wrapAsync(listingController.createListing))



// editt

router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm))



// update 
router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing))
//delete
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.destroyListing))


module.exports=router;
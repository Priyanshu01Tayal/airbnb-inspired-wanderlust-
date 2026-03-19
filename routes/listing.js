const express=require("express");
const router=express.Router();

const wrapAsync=require("../utils/wrapAsync.js");
const {ListingSchema, listingSchema,reviewSchema}=require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing=require("../models/listing.js")
  const validateListing = (req, res, next) => {
      const { error } = listingSchema.validate(req.body);
  
      if (error) {
          throw new ExpressError(400, error.message);
      }
  
      next();
  };
  
// indexx route
router.get("/",wrapAsync(async (req,res)=>{
   const allListings=await Listing.find({});
   res.render("listings/index",{allListings});
}));
// new route
router.get("/new",(req,res)=>{
    res.render("listings/new")
})
// show route
router.get("/:id",wrapAsync(async (req,res)=>{
 let {id}=req.params;
 const listing=await Listing.findById(id).populate("reviews");
 
 res.render("listings/show",{listing});
}));
//create

router.post("/",validateListing,wrapAsync(async(req,res)=>{

    const newListing= new Listing(req.body. listing);
await newListing.save();
res.redirect("/listings")
}))

router.get("/:id/edit",wrapAsync(async (req,res)=>{
    let {id}=req.params;
 const listing=await Listing.findById(id);
res.render("listings/edit",{listing});
}))
// update 
router.put("/:id",validateListing,wrapAsync(async (req,res)=>{
    let {id}=req.params;
 await Listing.findByIdAndUpdate(id,{...req.body.listing})

 res.redirect("/listings")
}))
//delete
router.delete("/:id",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id)

    res.redirect("/listings");

}))


module.exports=router;
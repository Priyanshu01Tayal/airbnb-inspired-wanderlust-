const express=require("express")
const app=express();
const mongoose=require("mongoose")

const Listing=require("./models/listing.js")

const path=require("path")
const methodOverride=require("method-override")
const ejsMate = require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
const session=require("express-session");
const flash=require("connect-flash");



const {ListingSchema, listingSchema,reviewSchema}=require("./schema.js");
const Review=require("./models/review.js")
const listings=require("./routes/listing.js")
const reviews=require("./routes/review.js")
const Mongo_url="mongodb://127.0.0.1:27017/wanderlust"
main().then(()=>{
    console.log("connectes")
})
.catch((err)=>{
    console.log(err)
})
async function main()
{
    await mongoose.connect(Mongo_url);
}
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
app.use(session({secret:"thisissecret",resave:false,saveUninitialized:true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24,
        maxAge: 1000 * 60 * 60 * 24
    }
}));
app.use(flash());
const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);

    if (error) {
        throw new ExpressError(400, error.message);
    }

    next();
};

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
      res.locals.error = req.flash("error"); 
    
    next();
});
app.use("/listings", listings);
app.use("/listings/:id/reviews",reviews);
// indexx route

// REVIEW



app.get("/",(req,res)=>{
    res.send("connection succesful")
})



// app.get("/testlisting",async (req,res)=>{
//     const sample=new Listing({
//         title:"my home",
//         description:"thana me h aghr",
//         price:900,
//         loaction:"goa",
//         country:"idnia"
//     });

//      await sample.save();
//     res.send("succesful test");
// })
app.use((req, res, next) => {
   next(new ExpressError(404, "Page Not Found"));
});

app.use((err,req,res,next)=>{
    let{statusCode=500,message="something went wrong"}=err;
    // res.status(statusCode).send(message)
    res.render("listings/error",{err});
})


app.listen(9001,()=>{
    console.log("ghdbd")

}) 
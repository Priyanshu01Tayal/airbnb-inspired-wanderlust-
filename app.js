const express=require("express")
const app=express();
const mongoose=require("mongoose")

const Listing=require("./models/listing.js")

const path=require("path")
const methodOverride=require("method-override")
const ejsMate = require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
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


app.get("/listings",wrapAsync(async (req,res)=>{
   const allListings=await Listing.find({});
   res.render("listings/index",{allListings});
}));
//show routee
app.get("/listings/new",(req,res)=>{
    res.render("listings/new")
})

app.get("/listings/:id",wrapAsync(async (req,res)=>{
let {id}=req.params;
 const listing=await Listing.findById(id);

 res.render("listings/show",{listing})
}));
//create

app.post("/listings",wrapAsync(async(req,res)=>{
    let listing=req.body.listing;
    if(!listing)
    {
        throw new ExpressError(400,"invalid listing data")
    }
    const newListing= new Listing(listing);
await newListing.save();
res.redirect("/listings")
}))

app.get("/listings/:id/edit",wrapAsync(async (req,res)=>{
    let {id}=req.params;
 const listing=await Listing.findById(id);
res.render("listings/edit",{listing});
}))

app.put("/listings/:id",wrapAsync(async (req,res)=>{
    let {id}=req.params;
 await Listing.findByIdAndUpdate(id,{...req.body.listing})

 res.redirect("/listings")
}))

app.delete("/listings/:id",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id)

    res.redirect("/listings");

}))
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
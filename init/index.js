// const mongoose=require("mongoose")
// const initdata=require("./data.js");
// const Listing=require("../models/listing.js")


// const Mongo_url="mongodb://127.0.0.1:27017/wanderlust"
// main().then(()=>{
//     console.log("connectes")
// })
// .catch((err)=>{
//     console.log(err)
// })
// async function main()
// {
//     await mongoose.connect(Mongo_url);
// }




// const initDB=async()=>{
//     await Listing.deleteMany({});
//     initData.data=initData.data.map((obj)=>({...obj,owner:"69c13ef61537b82fad38b0a8"}))
// await Listing.insertMany(initdata.data);
// console.log("data was intialaized")

// };


// initDB();
const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

const Mongo_url = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(Mongo_url);
}

const initDB = async () => {
  await Listing.deleteMany({});

  initdata.data = initdata.data.map((obj) => ({
    ...obj,
    owner: "69c13ef61537b82fad38b0a8",
  }));

  await Listing.insertMany(initdata.data);
  console.log("data was initialized");
};

initDB();
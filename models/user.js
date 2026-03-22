const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// ✅ correct plugin
let passportLocalMongoose = require("passport-local-mongoose");

// fix for object issue
if (typeof passportLocalMongoose !== "function") {
  passportLocalMongoose = passportLocalMongoose.default;
}

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// Define user schema
const userSchema = new mongoose.Schema({
  // You can add custom fields for the user here if needed
  // e.g. profile details, email, etc.
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

// Apply passport-local-mongoose plugin to add username/password fields
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");
const { Schema } = mongoose; //ES6 destructuring //mongoose must knows all the proprties which will belowing to each collection in MongoDB

const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 },
});

mongoose.model("users", userSchema);

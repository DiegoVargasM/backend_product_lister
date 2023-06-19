const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//static signup method
//(no arrow function bc we need to use "this" keyword)
userSchema.statics.signup = async (email, password) => {
  const exists = await this.findOne({ email });
  if (exists) {
    //we dont have access to res here so we throw an error
    throw Error("Email already in use");
  }
  //before saving to db, we need to hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //save to db
  const user = await this.create({ email, password: hashedPassword });
  return user;
};

//static login method

module.exports = mongoose.model("User", userSchema);

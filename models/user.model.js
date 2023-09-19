const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");

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

// crear un metodo estatico para el cifrado de contraseñas
// ayuda a mantener la organizacion y encapsulacion al mantener
// la logica de contraseñas en el lugar correcto, promueve la reutilizacion
// de codigo y facilita las pruebas unitarias

//static signup method
userSchema.statics.signup = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error("Email and password are required");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (password.length < 6) {
    throw Error("Password must be at least 6 characters");
  }

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
userSchema.statics.login = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error("Email and password are required");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  //compare password
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);

//import model
const User = require("../models/user.model");
//import jwt
const jwt = require("jsonwebtoken");

//function to create jwt token
//we pass id because we want to use it in the payload
const createToken = (_id) => {
  //arguments: payload, secret, options
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//login user
const loginUser = async (req, res) => {
  res.json({ mssg: "login user" });
};

//sigup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    res.status(200).json({ email, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../../models/user.model");

async function getUser(req, res) {
  try {
    const user = await userModel.findOne({ name: req.user.name }, "-__v");
    if (!user) {
      return res.status(400).json({ message: "No user found" });
    }
    return res.json(user);
  } catch (error) {
    return res.json({ error: error });
  }
}

async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ message: "Please enter all the details" });
    }

    const userExist = await userModel.findOne(
      { email: req.body.email },
      "-__v"
    );

    if (userExist) {
      return res
        .status(500)
        .json({ message: "User already exist with the given emailId" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(req.body.password, salt);

    req.body.password = hashPassword;

    const user = new userModel(req.body);

    const register = await user.save();

    if (register) {
      res.status(200).json({ message: "User was registered successfully!" });
    }
  } catch (error) {
    return res.json({ error: error });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(500).send({ message: "Please enter all the details" });
    }

    const userExist = await userModel.findOne({ email: req.body.email });
    if (!userExist) {
      return res.status(500).send({ message: "User doesn't exist!" });
    }
    //Check password match
    const isPasswordMatched = await bcrypt.compare(
      password,
      userExist.password
    );
    if (!isPasswordMatched) {
      return res.status(401).send({ message: "Invalid Password!" });
    }
    const token = await jwt.sign(
      { id: userExist._id },
      process.env.SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );
    req.session.token = token;
    return res
      .status(200)
      .send({ success: true, message: "Logged Successfully" });
  } catch (error) {
    return res.json({ error: error });
  }
}

async function logoutUser(req, res) {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
}

module.exports = {
  getUser,
  registerUser,
  loginUser,
  logoutUser,
};

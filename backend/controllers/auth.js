const User = require("../models/userRegistration");
const bcrypt = require("bcryptjs");
const createSecretToken = require("./cookies");
const nodemailer = require("nodemailer");

// auth
async function verifyUser(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(user._id, user.role, user.name, user.phone);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    return res.status(200).json({ user, token });
    // res.json(token);
    // console.log(user);
  } catch (error) {
    return res.json(error);
  }
}

// verify mail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rahul.nitahai@gmail.com",
    pass: "zcgv jpqy lyed riou",
  },
});

async function sendMail(email, otp) {
  try {
    // const user = await User.findOne({ email });

    const mailOptions = {
      from: "rahul.nitahai@gmail.com",
      to: email,
      subject: "OTP for registration",
      text: `Your OTP for registration is ${otp}`,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ ok: 0, message: "Error sending OTP" });
      } else {
        console.log("Email sent");
      }
    });
  } catch (error) {
    console.log(error.message);
  }
}

// signup
async function signup(req, res) {
  try {
    const { email, password, username, phone, role } = req.body;
    //console.log("data:", req.body);

    // const existingUser = await User.findOne({ email });
    // if (existingUser) {
    //   return res.json({ message: "User already exists" });
    // }
    const OTP = Math.floor(1000 + Math.random() * 9000);
    const response = await sendMail(email, OTP);
    console.log("i am here");
    const { otp } = req.body;
    if (otp == OTP) {
      const user = await User.create({
        email,
        password,
        username,
        phone,
        role,
      });
      //console.log("role", user.role);
      const token = createSecretToken(
        user._id,
        user.role,
        user.username,
        user.phone
      );
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      });
      return res.status(201).json({ user, token });
    } else return res.status(201).json({ msg: "otp is incorrect" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

// login
async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(user._id, user.role, user.name, user.phone);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    return res.status(200).json({ user, token });
    // res.json(token);
    //console.log(user);
  } catch (error) {
    return res.json(error);
  }
}

module.exports = {
  signup,
  login,
  verifyUser,
};

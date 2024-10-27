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
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendMail(email, otp) {
  try {
    // const user = await User.findOne({ email });

    const mailOptions = {
      from: process.env.EMAIL,
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

// verify mail

async function verifyMail(req, res) {
  try {
    const { email, password, username, phone, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (!email) {
      return res.json({ message: "email is required" });
    }
    const OTP = Math.floor(1000 + Math.random() * 9000);
    await sendMail(email, OTP);
    if (existingUser) {
      const user = await User.updateOne({ email }, { emailOTP: OTP });
    } else {
      const user = await User.create({
        email: email,
        password: password ? password : "",
        username: username ? username : "",
        phone: phone ? phone : "",
        role: role ? role : "user",
        emailOTP: OTP,
      });
      user.save();
    }

    res.json({ msg: "OTP sent to the email successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// verify OTP
async function verifyOTP(req, res) {
  try {
    const { email, otp } = req.body;
    //console.log("data:", req.body);
    if (!email || !otp) {
      return res.json({ message: "email and OTP is required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser.isVerified) {
      return res.json({ message: "User already exists" });
    }

    if (otp == existingUser.emailOTP) {
      const user = await User.updateOne(
        { email },
        {
          isVerified: true,
        }
      );
      return res.status(201).json({ msg: "otp verified successfully" });
    } else return res.status(201).json({ msg: "otp is incorrect" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
// signup
async function signup(req, res) {
  try {
    const { email, password, username, phone, role } = req.body;
    //console.log("data:", req.body);
    const existingUser = await User.findOne({ email });
    if (!email || !password || !username || !phone || !role) {
      return res.json({ message: "all mendatory details are required" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.updateOne(
      { email },
      {
        email,
        password: hashedPassword,
        username,
        phone,
        role,
      }
    );
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
  verifyMail,
  verifyOTP,
};

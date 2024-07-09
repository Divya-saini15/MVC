const User = require("../models/User");
const nodemailer = require("nodemailer");
const emailConfig = require("../config/emailConfig");

// Nodemailer setup
const transporter = nodemailer.createTransport(emailConfig);

//GET
exports.getDash = async (req, res) => {
  try {
    // const chats = await Chat.find();
    res.render("dashboard.ejs");
  } catch (err) {
    console.error(err);
  }
};

// GET /users/list
exports.getUserList = async (req, res) => {
  try {
    const users = await User.find();
    res.render("userList", { users });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

//Get/users/search
// exports.searchUser = async (req, res) => {
//   //TODO
//   try {
//     const searchText = req.params.search;
//     const regex = new RegExp(searchText, "i");

//     const users = await User.find({ username: { $regex: regex } });

//     res.render("userList", { users });
//   } catch (err) {
//     console.log(err);
//   }
// };

exports.searchUser = async (req, res) => {
  try {
    const searchText = req.query.search;
    const regex = new RegExp(searchText, "i"); // 'i' flag for case-insensitive search

    const users = await User.find({ name: { $regex: regex } });
    res.render("userList", { users });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// GET /users/add
exports.renderAddUserForm = (req, res) => {
  res.render("addUser");
};

// POST /users/add
exports.addUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const newUser = new User({ name, email, phone });
    await newUser.save();

    // Send email notification
    const mailOptions = {
      from: emailConfig.from,
      to: email,
      subject: "New User Added",
      text: `A new user has been added:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });

    res.redirect("/users/list");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// GET /users/edit/:id
exports.renderEditUserForm = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render("editUser", { user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// POST /users/edit/:id
exports.updateUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, phone },
      { new: true }
    );

    // Send email notification
    const mailOptions = {
      from: emailConfig.from,
      to: email,
      subject: "User Information Updated",
      text: `Your user information has been updated:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });

    res.redirect("/users/list");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// GET /users/delete/:id
exports.deleteUser = async (req, res) => {
  try {
    
    const user = await User.findByIdAndDelete(req.params.id);

    // Send email notification
    const mailOptions = {
      from: emailConfig.from,
      to: user.email,
      subject: "User Deleted",
      text: `Your user account has been deleted:\n\nName: ${user.name}\nEmail: ${user.email}\nPhone: ${user.phone}`,                                                                                                                                                                                                                                                                                                                                    
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });

    res.redirect("/users/list");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

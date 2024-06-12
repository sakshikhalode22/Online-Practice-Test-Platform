const { Users } = require("../Model/Schema");
const validator = require("../Utilities/validator");
const helper = require("../Utilities/helpers");

exports.addUser = async (req, res) => {
  try {
    const user = await Users.findOne(
      { email: req.body.email },
      { _id: 0, __v: 0 }
    );
    if (user) {
      res.status(400).json({
        status: "error",
        results: "Email already exists",
      });
    } else if (
      validator.ValidateName(req.body.name) &&
      validator.ValidateEmail(req.body.email) &&
      validator.ValidatePassword(req.body.password)
    ) {
      const Id = await helper.generateUserId();
      const user = await Users.create({
        id: Id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      res.status(201).json({
        status: "success",
        data: {
          user,
        },
      });
    } else if (!validator.ValidateName(req.body.name)) {
      res.status(400).json({
        status: "error",
        results: "Enter valid name and name length should be greater than 3",
      });
    } else if (!validator.ValidateEmail(req.body.email)) {
      res.status(400).json({
        status: "error",
        results: "Enter valid email",
      });
    } else if (!validator.ValidatePassword(req.body.password)) {
      res.status(400).json({
        status: "error",
        results: "Enter valid password and length should be 8-12",
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const user = await Users.find({}, { _id: 0, __v: 0 });
    if (user.length > 0) {
      res.status(200).json({
        status: "success",
        results: user.length,
        data: {
          user,
        },
      });
    } else {
      res.status(400).json({
        status: "success",
        data: {
          message: "No users available in the repo",
        },
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

// login
exports.login = async (req, res) => {
  try {
    const user = await Users.findOne(
      { email: req.body.email, password: req.body.password },
      { _id: 0, __v: 0 }
    );
    if (user) {
      res.status(200).json({
        status: "success",
        data: {
          user,
        },
      });
    } else {
      res.status(400).json({
        status: "error",
        results: "Invalid credentials",
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

// update userdetails name, address, phoneNo,grade,school
exports.updateUser = async (req, res) => {
  try {
    const user = await Users.findOneAndUpdate(
      { email: req.params.email },
      {
        name: req.body.name,
        address: req.body.address,
        phoneNo: req.body.phoneNo,
        grade: req.body.grade,
        school: req.body.school,
      },
      { new: true }
    );
    if (user) {
      res.status(200).json({
        status: "success",
        data: {
          user,
        },
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

// delete all users
exports.deleteAllUsers = async (req, res) => {
  try {
    const user = await Users.deleteMany();
    if (user) {
      res.status(200).json({
        status: "success",
        message: "All users deleted",
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

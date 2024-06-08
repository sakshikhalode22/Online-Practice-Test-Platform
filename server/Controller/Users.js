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
      validator.ValidatePassword(req.body.password) &&
      validator.ValidatePhone(req.body.phoneNo) &&
      validator.ValidateAddress(req.body.address) &&
      validator.ValidateGrade(req.body.grade)
    ) {
      const Id = await helper.generateUserId();
      const user = await Users.create({
        id: Id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phoneNo: req.body.phoneNo,
        address: req.body.address,
        grade: req.body.grade,
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
    } else if (!validator.ValidatePhone(req.body.phoneNo)) {
      res.status(400).json({
        status: "error",
        results: "Enter valid phone",
      });
    } else if (!validator.ValidateAddress(req.body.address)) {
      res.status(400).json({
        status: "error",
        results: "Enter valid address",
      });
    } else if (!validator.ValidateGrade(req.body.grade)) {
      res.status(400).json({
        status: "error",
        results: "Enter valid grade",
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
    // console.log(user)
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


exports.getUserData=async(req, res)=>{
  console.log("reqqq",req.user)
  if(req.user){
    res.status(200).json({message: "user authenticated"})
  }else{
    res.status(401).json({message: "user not authenticated"})
  }
};
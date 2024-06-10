const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/practice-test-platform", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));

const UserSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phoneNo: {
      type: Number,
    },
    school:{
      type: String,
    },
    grade: {
      type: Number,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);
const Users = mongoose.model("Users", UserSchema);

const Qustions = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    que: {
      type: String,
    },
    options: {
      type: Array,
    },
    ans: {
      type: String,
    },
    level:{
      type: String,
    },
    grade: {
      type: String,
    },
    subject: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

const Questions = mongoose.model("Questions", Qustions);

const Exams = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    examName: {
      type: String,
    },
    examDate: {
      type: Date,
    },
    userId: {
      type: Number,
    },
    subject: {
      type: String,
    },
    score:{
      type: Number,
    },
    result:{
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

const Exam = mongoose.model("Exams", Exams);

module.exports = { Users, Questions, Exam };

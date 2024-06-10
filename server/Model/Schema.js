const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/practice-test-platform', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));


const UserSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
      required: true,
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
    grade: {
      type: String,
    },
    school: {
      type: String,
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

const QuestionSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    question: {
      type: String,
    },
    options: {
      type: Array,
    },
    answer: {
      type: String,
    },
    level: {
      type: String,
    },
    tag:{
      type: String,
    },
    grade:{
      type:String,
    }
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

const ExamsSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    userid:{
      type: Number,
    },
    examname: {
      type: String,
    },
    date: {
      type: Date,
    },
    tag: {
      type: String,
    },
    score: {
      type: Number,
    },
    result:{
      type: String,
    }
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);


const Users = mongoose.model("Users", UserSchema);

module.exports = Users;

const Questions = mongoose.model("Questions", QuestionSchema);

module.exports = Questions;

const Exams = mongoose.model("Exams", ExamsSchema);

module.exports = Exams;

const Exams = require("../Model/Schema");
const generateExamId =require("../Utilities/helpers");
const generateExamName=require("../Utilities/helpers");

exports.getAllExams = async (req, res) => {
  try {
    const exams = await Exams.find({}, { _id: 0, __v: 0 });
    if (exams.length > 0) {
      res.status(200).json({
        status: "success",
        results: exams.length,
        data: {
          exams,
        },
      });
    } else {
      res.status(400).json({
        status: "success",
        data: {
          message: "No exams available in the repo",
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

// get exam by user id
exports.getExamByUserId = async (req, res) => {
  try {
    const exams = await Exams.find({ userid: req.params.userid }, { _id: 0, __v: 0 });
    if (exams.length > 0) {
      res.status(200).json({
        status: "success",
        results: exams.length,
        data: {
          exams,
        },
      });
    } else {
      res.status(400).json({
        status: "success",
        data: {
          message: "No exams available in the repo",
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

// create exam 
exports.createExam = async (req, res) => {
  try {
    const examId = await generateExamId();
    const examName = await generateExamName(req.body.date);
    req.body.id = examId;
    req.body.examname = examName;
    const exam = await Exams.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        exam,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};


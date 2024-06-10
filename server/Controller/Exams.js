const { Exam } = require("../Model/Schema");
const helper = require("../Utilities/helpers");

exports.addExam = async (req, res) => {
  try {
    const Id = await helper.generateExamId();
    const examName = await helper.generateExamName();
    const exam = await Exam.create({
      id: Id,
      examName: examName,
      examDate: new Date(),
      userId: req.body.userId,
      subject: req.body.subject,
      score: req.body.score,
      result: req.body.result,
    });
    res.status(201).json({
      status: "success",
      data: {
        exam,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find({}, { _id: 0, __v: 0 });
    res.status(200).json({
      status: "success",
      data: {
        exams,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

// getExam by userid
exports.getExamByUserId = async (req, res) => {
  try {
    const exams = await Exam.find(
      { userId: req.params.userId },
      { _id: 0, __v: 0 }
    );
    if (exams.length > 0) {
      res.status(200).json({
        status: "success",
        data: {
          exams,
        },
      });
    } else {
      res.status(400).json({
        status: "success",
        data: {
          message: "No exams available for this user",
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

// deleteall exams
exports.deleteAllExams = async (req, res) => {
  try {
    const user = await Exam.deleteMany();
    if (user) {
      res.status(200).json({
        status: "success",
        message: "All exams deleted",
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

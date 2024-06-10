const fs = require("fs");
const {Questions} = require('../Model/Schema');

async function insertAllQuestion() {
  await Questions.deleteMany({});
  fs.readFile("./Questions.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const questions = JSON.parse(data);
    const grades = ["grade7", "grade8", "grade9", "grade10"];
    const subjects = ["algebra", "geometry"];
    grades.forEach((grade) => {
      subjects.forEach((subject, i) => {
        getData(grade, subject, questions[grade][i][subject]);
      });
    });
  });
  return true;
}

function getData(grade, subject, array) {
  array?.forEach((element) => {
    element.grade = grade;
    element.subject = subject;
  });
  Questions.insertMany(array);
}

// get all questions
exports.getAllQuestions = async (req, res) => {
    try {
      let val = insertAllQuestion();
      if(val){
        const questions = await Questions.find({}, { _id: 0, __v: 0 });
        res.status(200).json({
            status: "success",
            data: {
                questions,
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

// getquestions by grade
exports.getQuestionsByGrade = async (req, res) => {
    try {
        const questions = await Questions.find({ grade: req.params.grade }, { _id: 0, __v: 0 });
        if (questions.length > 0) {
            res.status(200).json({
                status: "success",
                data: {
                    questions,
                },
            });
        } else {
            res.status(400).json({
                status: "success",
                data: {
                    message: "No questions available for this grade",
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

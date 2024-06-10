const {Users, Exam} = require("../Model/Schema");

exports.generateUserId = async () => {
  const user = await Users.find({});
  const Id = 1 + user.length;
  return Id;
};

exports.generateExamId = async () =>{
  const exam = await Exam.find({});
  const Id = 1 + exam.length;
  return Id;
}

exports.generateExamName = async () => {
  const date= new Date();
  const examName = `Exam-${date.toDateString()}`;
  return examName;
};
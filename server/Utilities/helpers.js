const Users = require("../Model/Schema");
const Exams = require("../Model/Schema");

exports.generateUserId = async () => {
  const user = await Users.find({});
  const Id = 1 + user.length;
  return Id;
};

exports.generateExamId = async () =>{
  const exams = await Exams.find({});
  const Id = 1 + exams.length;
  return Id;
}

exports.generateExamName = async (date) =>{
  const dateArray = date.split(" ");
  const examName = dateArray[0] + dateArray[1] + dateArray[2];
  return examName;
}
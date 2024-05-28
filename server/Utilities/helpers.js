const { Users } = require("../Model/Schema");

exports.generateUserId = async () => {
  const user = await Users.find({});
  const Id = 1 + user.length;
  return Id;
};

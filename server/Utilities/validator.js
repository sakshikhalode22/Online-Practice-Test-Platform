exports.ValidateName = function (name) {
  if (name.length !== 0 && name.length >= 3) {
    return true;
  }
  return false;
};

exports.ValidateEmail = function (email) {
  if (
    email.length !== 0 &&
    !email.match("/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/")
  ) {
    return true;
  }
  return false;
};

exports.ValidatePassword = function (password) {
  if (password.length !== 0 && (password.length > 8 || password.length < 12)) {
    return true;
  }
  return false;
};

exports.ValidatePhone = function (phone) {
  const regex = /^[6-9]\d{9}$/;
  if (phone !== null && regex.test(phone)) {
    return true;
  }
  return false;
};

exports.ValidateAddress = function (address) {
  if (address.length !== 0) {
    return true;
  }
  return false;
};

exports.ValidateGrade = function (grade) {
  if (grade !== 0 && grade >= 7 && grade <= 10) {
    return true;
  }
  return false;
};

const studentInfo = require("../models/studentModel");

const createStudent = async (data) => {
  const student = await studentInfo.create(data);
  return student;
};

const getAllStuddents = async () => {
  return await studentInfo.find();
};

const findStudentByEmail = async (email) => {
  const oneStudent = await studentInfo.findOne({ email });
  return oneStudent;
};

module.exports = { createStudent, getAllStuddents, findStudentByEmail };

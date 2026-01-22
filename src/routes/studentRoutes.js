const express=require('express');
const studentRouter=express.Router();
const asyncHandler=require('../utils/asyncHandler');
const studentController=require('../controllers/studentController');
const validate=require('../middlewares/validateMiddleware');
const createStudentSchema=require('../validations/studentValidation');

studentRouter.post('/',validate(createStudentSchema),asyncHandler(studentController.register));
studentRouter.get('/',asyncHandler(studentController.allStudents));
module.exports=studentRouter;

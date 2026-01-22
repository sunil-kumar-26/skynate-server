const studentService=require('../services/studentService');

exports.register=async(req,res)=>{
const{name,email,password}=req.body;
const emailExist=await studentService.findStudentByEmail(email);
if(emailExist){
    return res.status(409).json({message:'Email already registered'});
}
const student=await studentService.createStudent({name,email,password});
res.status(201).json({message:'New student registerd successfully',data:student});z
}

exports.allStudents=async(req,res)=>{
const studentList=await studentService.getAllStuddents();
res.status(200).json({message:'List of all students',data:studentList});
}
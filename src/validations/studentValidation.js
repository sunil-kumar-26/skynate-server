const joi=require('joi');

const createStudentSchema=joi.object({
    name:joi.string().min(3).required(),
    email:joi.string().email().required(),
    password:joi.string().min(8).required(),
})

module.exports=createStudentSchema;
module.exports = function validate(validateStudentSchema) {
  return (req, res, next) => {
    if (!validateStudentSchema) return next();
    const { error } = validateStudentSchema.validate(req.body);
    if (error) {
      res.status(error.status || 400).json({
        message: error.message || "please enter valid student schema",
      });
    }
    next();
  };
};

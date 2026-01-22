module.exports = function validate(authSchema) {
  return (req, res, next) => {
    const { error } = authSchema.validate(req.body);
    if (error) {
      res
        .status(error.status || 400)
        .json({
          message: error.message || "Hii,Please enter valid credentials",
        });
    }
    next();
  };
};

const Quiz = require("./models/quiz");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be signed in!");
    return res.redirect("/users/login");
  }
  next();
};

module.exports.isQuizOwner = async (req, res, next) => {
  const { id } = req.params;
  const quiz = await Quiz.findById(id);
  if (!quiz || !quiz.owner.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that.");
    return res.redirect(`/examiners/${id}`);
  }
  next();
};

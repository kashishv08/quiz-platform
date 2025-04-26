const User = require("../models/user");

module.exports.renderSignup = (req, res) => {
  res.render("users/signup");
};

module.exports.signup = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username }); // <--- includes email
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to Quiz Platform!");
      res.redirect("/quizzes");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/users/signup");
  }
};

module.exports.renderLogin = (req, res) => {
  res.render("users/login");
};

module.exports.login = (req, res) => {
  req.flash("success", "Welcome back!");
  res.redirect("/quizzes");
};

module.exports.logout = (req, res) => {
  req.logout(() => {
    req.flash("success", "Goodbye!");
    res.redirect("/quizzes");
  });
};

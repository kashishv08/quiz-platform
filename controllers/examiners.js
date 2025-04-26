const Quiz = require("../models/quiz");
const mongoose = require("mongoose");

module.exports.renderNewQuizForm = (req, res) => {
  res.render("quizzes/new");
};

module.exports.viewQuiz = async (req, res) => {
  const { id } = req.params;
  const quiz = await Quiz.findById(id).populate("owner");
  if (!quiz) {
    req.flash("error", "Quiz not found!");
    return res.redirect("/quizzes");
  }

  res.render("quizzes/show", { quiz, currentUser: req.user });
};

module.exports.createQuiz = async (req, res) => {
  const { title, description, category } = req.body.quiz;
  const quiz = new Quiz({
    title,
    description,
    category,
    owner: req.user._id,
  });

  if (req.file) {
    quiz.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  await quiz.save();

  req.flash("success", "Quiz created! Add questions now.");
  res.redirect(`/examiners/${quiz._id}/add-question`);
};

module.exports.renderAddQuestionForm = async (req, res) => {
  const { id } = req.params;
  const quiz = await Quiz.findById(id);
  if (!quiz) {
    req.flash("error", "Quiz not found!");
    return res.redirect("/quizzes");
  }

  res.render("quizzes/add-question", { quiz, success: req.flash("success") });
};

module.exports.addQuestionToQuiz = async (req, res) => {
  const { id } = req.params;
  const { questionText, options, correctAnswerIndex } = req.body;

  const quiz = await Quiz.findById(id);
  if (!quiz) {
    req.flash("error", "Quiz not found!");
    return res.redirect("/quizzes");
  }

  const trimmedOptions = options
    .split(",")
    .map((opt) => opt.trim())
    .filter((opt) => opt.length > 0);

  const parsedIndex = parseInt(correctAnswerIndex) - 1;

  if (
    !questionText ||
    trimmedOptions.length === 0 ||
    isNaN(parsedIndex) ||
    parsedIndex < 0 ||
    parsedIndex >= trimmedOptions.length
  ) {
    req.flash("error", "Invalid input. Please fill out all fields correctly.");
    return res.redirect(`/examiners/${id}/add-question`);
  }

  quiz.questions.push({
    questionText,
    options: trimmedOptions,
    correctAnswerIndex: parsedIndex,
  });

  await quiz.save();
  req.flash("success", "Question added successfully!");
  res.redirect(`/examiners/${id}/add-question`);
};

module.exports.renderEditQuizForm = async (req, res) => {
  const { id } = req.params;
  const quiz = await Quiz.findById(id);
  if (!quiz) {
    req.flash("error", "Quiz not found!");
    return res.redirect("/quizzes");
  }

  res.render("quizzes/edit", { quiz });
};

module.exports.updateQuiz = async (req, res) => {
  const { id } = req.params;
  const { title, description, category } = req.body.quiz;

  const quiz = await Quiz.findById(id);
  if (!quiz) {
    req.flash("error", "Quiz not found!");
    return res.redirect("/quizzes");
  }

  quiz.title = title;
  quiz.description = description;
  quiz.category = category;

  // Only update image if a new file is uploaded
  if (req.file) {
    quiz.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  await quiz.save();
  req.flash("success", "Quiz updated successfully!");
  res.redirect(`/examiners/${id}`);
};

module.exports.deleteQuiz = async (req, res) => {
  const { id } = req.params;
  const quiz = await Quiz.findById(id);
  if (!quiz) {
    req.flash("error", "Quiz not found!");
    return res.redirect("/quizzes");
  }

  await Quiz.findByIdAndDelete(id);
  req.flash("success", "Quiz deleted successfully!");
  res.redirect("/quizzes");
};

module.exports.finishQuiz = async (req, res) => {
  const { id } = req.params;
  const quiz = await Quiz.findById(id);
  if (!quiz) {
    req.flash("error", "Quiz not found!");
    return res.redirect("/quizzes");
  }

  if (quiz.questions.length < 5) {
    req.flash(
      "error",
      "You must add at least 5 questions before finishing the quiz."
    );
    return res.redirect(`/examiners/${id}/add-question`);
  }

  req.flash("success", "Quiz finished successfully!");
  res.redirect(`/examiners/${id}`);
};

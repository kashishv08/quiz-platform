const Quiz = require("../models/quiz");
const mongoose = require("mongoose");

module.exports.listQuizzes = async (req, res) => {
  const quizzes = await Quiz.find({}).populate("owner");
  res.render("quizzes/index", { quizzes, currentUser: req.user });
};

module.exports.attemptQuiz = async (req, res) => {
  const { id } = req.params;
  const quiz = await Quiz.findById(req.params.id);
  if (!quiz) {
    req.flash("error", "Quiz not found!");
    return res.redirect("/quizzes");
  }
  res.render("quizzes/attempt", { quiz });
};

module.exports.showQuiz = async (req, res) => {
  const { id } = req.params;
  const quiz = await Quiz.findById(req.params.id);
  if (!quiz) {
    req.flash("error", "Quiz not found!");
    return res.redirect("/quizzes");
  }
  res.render("quizzes/show", { quiz });
};

module.exports.submitQuiz = async (req, res) => {
  const { id } = req.params;
  const quiz = await Quiz.findById(req.params.id);
  if (!quiz) {
    req.flash("error", "Quiz not found!");
    return res.redirect("/quizzes");
  }

  const answers = req.body.answers;
  let score = 0;

  // Loop through the questions and calculate the score
  quiz.questions.forEach((question, index) => {
    if (answers[index] == question.correctAnswerIndex) {
      score++;
    }
  });

  // Update the score in the quiz document
  const existingScore = quiz.scores.find(
    (scoreEntry) => scoreEntry.user.toString() === req.user._id.toString()
  );

  if (existingScore) {
    existingScore.score = score; // Update score if user already exists
  } else {
    quiz.scores.push({ user: req.user._id, score }); // Add new score entry for the user
  }

  await quiz.save();

  // Redirect to the quiz results page (or leaderboard)
  res.redirect(`/quizzes/${quiz._id}/results`);
};

module.exports.showLeaderboard = async (req, res) => {
  const quiz = await Quiz.findById(req.params.id).populate("scores.user");
  if (!quiz) {
    req.flash("error", "Quiz not found!");
    return res.redirect("/quizzes");
  }

  // Sort scores in descending order
  const sortedScores = quiz.scores.sort((a, b) => b.score - a.score);

  res.render("quizzes/leaderboard", { quiz, sortedScores });
};

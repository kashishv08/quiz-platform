const express = require("express");
const router = express.Router();
const quizCtrl = require("../controllers/quizzes");
const { isLoggedIn } = require("../middleware");

router.get("/", isLoggedIn, quizCtrl.listQuizzes);
router.get("/:id/attempt", isLoggedIn, quizCtrl.attemptQuiz);
router.get("/:id", isLoggedIn, quizCtrl.showQuiz); // Add this line
router.post("/:id/submit", isLoggedIn, quizCtrl.submitQuiz);
router.get("/:id/results", isLoggedIn, quizCtrl.showLeaderboard);

module.exports = router;

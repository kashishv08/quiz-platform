const mongoose = require("mongoose");

// Define the quiz schema
const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  questions: [
    {
      questionText: {
        type: String,
        required: true,
      },
      options: [
        {
          type: String,
          required: true,
        },
      ],
      correctAnswerIndex: {
        type: Number,
        required: true,
      },
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  scores: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      score: Number,
    },
  ],
  image: {
    url: String,
    filename: String,
  },
});

// Create the Quiz model from the schema
const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;

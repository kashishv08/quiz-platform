// schema.js
const Joi = require("joi");

// Define the quiz schema validation
const quizSchema = Joi.object({
  title: Joi.string().required(),
  category: Joi.string().required(),
  description: Joi.string().required(),
  questions: Joi.array().items(
    Joi.object({
      questionText: Joi.string().required(),
      options: Joi.array().items(Joi.string()).required(),
      correctAnswerIndex: Joi.number().required(),
    })
  ),
});

module.exports = { quizSchema };

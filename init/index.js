const mongoose = require("mongoose");
const initData = require("./data.js");
const Quiz = require("../models/quiz.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/quizDB";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  try {
    // Delete any existing quizzes
    await Quiz.deleteMany({});

    // Modify the quizzes data (add owner field if needed)
    initData.data = initData.data.map((obj) => ({
      ...obj,
      owner: "68089be315da832e1b3905b0",
    }));

    // Insert the quizzes data into the database
    await Quiz.insertMany(initData.data);
    console.log("Quiz data was initialized");
  } catch (err) {
    console.error("Error initializing the database:", err);
  }
};

initDB();

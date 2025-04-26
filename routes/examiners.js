const express = require("express");
const router = express.Router();
const examinerCtrl = require("../controllers/examiners");
const { isLoggedIn, isQuizOwner } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage: storage });

router.get("/new", isLoggedIn, examinerCtrl.renderNewQuizForm);
router.post("/", isLoggedIn, upload.single("image"), examinerCtrl.createQuiz);
router.get(
  "/:id/add-question",
  isLoggedIn,
  isQuizOwner,
  examinerCtrl.renderAddQuestionForm
);
router.post(
  "/:id/add-question",
  isLoggedIn,
  isQuizOwner,
  examinerCtrl.addQuestionToQuiz
);
router.get(
  "/:id/edit",
  isLoggedIn,
  isQuizOwner,
  examinerCtrl.renderEditQuizForm
);
router.post("/:id/finish", isLoggedIn, isQuizOwner, examinerCtrl.finishQuiz);

router.put(
  "/:id",
  isLoggedIn,
  isQuizOwner,
  upload.single("image"),
  examinerCtrl.updateQuiz
);
router.delete("/:id", isLoggedIn, isQuizOwner, examinerCtrl.deleteQuiz);
router.get("/:id", isLoggedIn, examinerCtrl.viewQuiz);

module.exports = router;

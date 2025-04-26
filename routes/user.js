const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const passport = require("passport");

router.get("/signup", userCtrl.renderSignup);
router.post("/signup", userCtrl.signup);

router.get("/login", userCtrl.renderLogin);
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/users/login",
    failureFlash: true,
  }),
  userCtrl.login
);

router.get("/logout", userCtrl.logout);

module.exports = router;

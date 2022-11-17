const express = require("express");
const { verifyToken } = require("../token/verifyToken");
const {
  saveFeedback,
  getUsersFeedbacks,
  updateFeedback,
  deleteFeedback,
} = require("../post/feedback/feedback.controller");

const router = express.Router();

router.post("/create-feedback", verifyToken, saveFeedback);
router.get("/get-feedbacks", getUsersFeedbacks);
router.put("/update-feedback", verifyToken, updateFeedback);
router.put("/delete-feedback", verifyToken, deleteFeedback);

module.exports = router;

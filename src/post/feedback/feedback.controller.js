const {
  deleteFeedbackFromUserData,
  updateUser,
} = require("../user/user.service");
const {
  createFeedback,
  deleteFeedbackById,
  getFeedbacks,
  updateFeedbackById,
} = require("./feedback.service");

const saveFeedback = async (req, res) => {
  try {
    const data = req.body;
    const feedbackData = await createFeedback(data);
    await updateUser(data.user, { feedback: feedbackData._id });

    return res.status(200).json(feedbackData);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Feedback not uploaded!", status: "error" });
  }
};

const getUsersFeedbacks = async (req, res) => {
  try {
    const feedbacks = await getFeedbacks();
    return res.status(200).json(feedbacks);
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Feedback not found!", status: "error" });
  }
};

const updateFeedback = async (req, res) => {
  try {
    const data = req.body;
    const feedbackData = await updateFeedbackById(data._id, data.details);
    return res.status(200).json(feedbackData);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Feedback not updated!", status: "error" });
  }
};

const deleteFeedback = async (req, res) => {
  try {
    const data = req.body;
    await deleteFeedbackById(data.feedbackId);
    await deleteFeedbackFromUserData(data.userId);

    return res
      .status(200)
      .json({ message: "Feedback deleted successfully.", status: "success" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Feedback not deleted!", status: "error" });
  }
};

module.exports = {
  saveFeedback,
  updateFeedback,
  deleteFeedback,
  getUsersFeedbacks,
};

const mongoose = require("mongoose");
const { app } = require("../../config/config");
const { postFeedback } = require("./feedback.model");

const createFeedback = async (details) => {
  return await postFeedback.create(details);
};

const getFeedbacks = async () => {
  return await postFeedback.find({}).populate({
    path: "user",
    module: app.user_collection,
    select: "name photoURL _id email",
  });
};

const updateFeedbackById = async (id, details) => {
  const _id = mongoose.Types.ObjectId(id);
  return await postFeedback.findByIdAndUpdate(_id, details, { new: true });
};

const deleteFeedbackById = async (id) => {
  const _id = mongoose.Types.ObjectId(id);
  return await postFeedback.findByIdAndDelete(_id);
};

module.exports = {
  createFeedback,
  getFeedbacks,
  updateFeedbackById,
  deleteFeedbackById,
};

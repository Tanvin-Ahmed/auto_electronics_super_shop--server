const mongoose = require("mongoose");
const { app } = require("../../config/config");

const Schema = mongoose.Schema;

const feedbackSchema = new Schema(
  {
    rating: {
      type: Number,
      required: true,
    },
    opinion: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: app.user_collection,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports.postFeedback = mongoose.model(
  app.feedback_collection,
  feedbackSchema
);

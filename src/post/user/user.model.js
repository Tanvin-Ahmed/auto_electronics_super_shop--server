const mongoose = require("mongoose");
const { app } = require("../../config/config");

const UserPost = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    feedback: {
      type: mongoose.Schema.Types.ObjectId,
      ref: app.feedback_collection,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model(app.user_collection, UserPost);

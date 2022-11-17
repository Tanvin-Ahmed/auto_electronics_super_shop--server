const { app } = require("../../config/config");
const UserModel = require("./user.model");
const mongoose = require("mongoose");

module.exports.addUser = async (user) => {
  return await UserModel.create(user);
};

//* login */
module.exports.getUser = async (email) => {
  return await UserModel.findOne({ email }).populate({
    path: "feedback",
    model: app.feedback_collection,
    select: "-user",
  });
};

module.exports.getUserById = async (id) => {
  return await UserModel.findById(id).select("-password").populate({
    path: "feedback",
    model: app.feedback_collection,
    select: "-user",
  });
};

module.exports.updateUser = async (id, user) => {
  return await UserModel.findByIdAndUpdate(id, user, { new: true })
    .select("-password")
    .populate({
      path: "feedback",
      model: app.feedback_collection,
      select: "-user",
    });
};

module.exports.deleteFeedbackFromUserData = async (userId) => {
  const id = mongoose.Types.ObjectId(userId);
  return await UserModel.findByIdAndUpdate(id, {
    $unset: {
      feedback: 1,
    },
  });
};

module.exports.deleteUser = async (id) => {
  return await UserModel.findByIdAndDelete(id);
};

//************ For Admin ************//
module.exports.getAllUsers = async (page, limit) => {
  const count = await UserModel.countDocuments({});
  const users = await UserModel.find({})
    .limit(limit)
    .skip((page - 1) * limit)
    .select("-password");
  return { users, page, pages: Math.ceil(count / limit) };
};

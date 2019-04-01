const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    text: {
      requried: true,
      type: String,
      unique: 1,
      maxlength: 100
    },
    likes: {
      requried: true,
      type: Number,
      maxlength: 255
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },
    comments: {
      type: Array,
      default: []
    },
    images: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);
const Chat = mongoose.model("Chat", ChatSchema);

module.exports = { Chat };

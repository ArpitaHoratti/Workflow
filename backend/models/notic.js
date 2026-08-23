const mongoose = require("mongoose");

const noticSchema = new mongoose.Schema(
  {
    semister: {
      type: String,
      required: [true,"Please fill this section"],
      trim: true,
    },

    title: {
      type: String,
      required: [true,"Please fill this section"],
      trim: true,
    },

    date: {
      type: Date,
      required: [true,"Please fill this section"],
    },

    venue: {
      type: String,
      required: [true,"Please fill this section"],
      trim: true,
    },

    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "approved",
        "rejected",
        "completed",
      ],
      default: "pending",
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    seminarCoordinatorSign:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },

    academicCoordinatorSign:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    
    principalSign:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    owner:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notic", noticSchema);
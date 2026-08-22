// models/Event.js

const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },

    organizedFor: [
      {
        semester: {
          type: String,
          required: true,
        },

        divisions: [
          {
            type: String,
            trim: true,
          },
        ],
      },
    ],

    objective: {
      type: String,
      required: true,
      trim: true,
    },

    resourcePerson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ResourcePerson",
    },

    facultyCoordinators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    responsibilities: [
      {
        responsibility: {
          type: String,
          required: true,
        },

        person: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],

    studentsPresent: {
      type: Number,
      default: 0,
      min: 0,
    },

    status: {
      type: String,
      enum: ["Draft", "Pending", "Approved", "Published", "Rejected"],
      default: "Draft",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);
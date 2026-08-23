const mongoose = require("mongoose");

const agendaSchema = new mongoose.Schema(
  {
    topicName: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    items: [
      {
        time: {
          type:time,
          required: true,
          trim: true,
        },
        specification: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Agenda", agendaSchema);
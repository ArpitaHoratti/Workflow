const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {

    organizer: {
      type: String,
      required: true,
      trim: true,
    },

    eventName: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: Date,
      required: true,
    },

    participants: {
      type: Number,
      required: true,
      min: 0,
    },

    resourcePerson: {
      type:String,
      required:true
    },

    objective: {
      type: String,
      required: true,
      trim: true,
      max:50
    },

    outcome: {
      type: String,
      required: true,
      trim:true,
      max:50
    },

    description: {
      type: String,
      max:100
    },
    
    photo:{
        type:String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Report", reportSchema);

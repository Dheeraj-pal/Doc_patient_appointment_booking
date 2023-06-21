const mongoose = require("mongoose");

const meetSchema = mongoose.Schema(
  {
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    startTime: Date,
    endTime: Date,
  },
  {
    versionKey: false,
  }
);

const meetModel = mongoose.model("meeting", meetSchema);

module.exports = {
  meetModel,
};

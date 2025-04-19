const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    bookingDate: { type: Date, required: true },
    bookingType: {
      type: String,
      enum: ["Full Day", "Half Day", "Custom"],
      required: true,
    },
    bookingSlot: {
      type: String,
      enum: ["First Half", "Second Half"],
      default: null,
    },
    fromTime: { type: String, default: null },
    toTime: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);

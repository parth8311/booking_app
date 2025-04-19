const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  const {
    customerName,
    customerEmail,
    bookingDate,
    bookingType,
    bookingSlot,
    fromTime,
    toTime,
  } = req.body;

  try {
    const existingBookings = await Booking.find({ bookingDate });

    // Check conflicts
    const conflict = existingBookings.some((b) => {
      if (b.bookingType === "Full Day" || bookingType === "Full Day")
        return true;
      if (
        bookingType === "Half Day" &&
        b.bookingType === "Half Day" &&
        b.bookingSlot === bookingSlot
      )
        return true;
      if (bookingType === "Half Day" && b.bookingType === "Custom") {
        if (bookingSlot === "First Half" && b.fromTime < "12:00") return true;
        if (bookingSlot === "Second Half" && b.toTime > "12:00") return true;
      }
      if (bookingType === "Custom" && b.bookingType === "Half Day") {
        if (
          (fromTime < "12:00" && b.bookingSlot === "First Half") ||
          (fromTime >= "12:00" && b.bookingSlot === "Second Half")
        )
          return true;
      }
      if (bookingType === "Custom" && b.bookingType === "Custom") {
        return !(toTime <= b.fromTime || fromTime >= b.toTime);
      }
      return false;
    });

    if (conflict)
      return res.status(400).json({ msg: "Time slot is already booked" });

    const booking = new Booking({
      customerName,
      customerEmail,
      bookingDate,
      bookingType,
      bookingSlot,
      fromTime,
      toTime,
    });

    await booking.save();
    res.status(201).json({ msg: "Booking successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Booking...." });
  }
};

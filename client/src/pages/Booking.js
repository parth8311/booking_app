import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Header from "../components/Header";

const BookingForm = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    customerName: user?.firstName + " " + user?.lastName,
    customerEmail: user?.email,
    bookingDate: "",
    bookingType: "Full Day",
    bookingSlot: "",
    fromTime: "",
    toTime: "",
  });

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      bookingDate: formData.bookingDate,
      bookingType: formData.bookingType,
    };

    if (formData.bookingType === "Half Day") {
      payload.bookingSlot = formData.bookingSlot;
    }

    if (formData.bookingType === "Custom") {
      payload.fromTime = formData.fromTime;
      payload.toTime = formData.toTime;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/bookings",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage({ type: "success", text: res.data.msg });
    } catch (err) {
      const error = err.response?.data?.msg || "Booking failed";
      setMessage({ type: "danger", text: error });
    }
  };

  return (
    <>
      <Header />
      <div className="d-flex justify-content-center align-items-start mt-4">
        <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "600px" }}>
          <h3 className="text-center mb-4">Booking Form</h3>

          {message && (
            <div className={`alert alert-${message.type}`}>{message.text}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Customer Name</label>
              <input
                className="form-control"
                type="text"
                value={formData.customerName}
                disabled
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Customer Email</label>
              <input
                className="form-control"
                type="email"
                value={formData.customerEmail}
                disabled
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Booking Date</label>
              <input
                className="form-control"
                type="date"
                name="bookingDate"
                value={formData.bookingDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Booking Type</label>
              <select
                className="form-control"
                name="bookingType"
                value={formData.bookingType}
                onChange={handleChange}
                required
              >
                <option>Full Day</option>
                <option>Half Day</option>
                <option>Custom</option>
              </select>
            </div>

            {formData.bookingType === "Half Day" && (
              <div className="mb-3">
                <label className="form-label">Booking Slot</label>
                <select
                  className="form-control"
                  name="bookingSlot"
                  value={formData.bookingSlot}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Slot</option>
                  <option value="First Half">First Half</option>
                  <option value="Second Half">Second Half</option>
                </select>
              </div>
            )}

            {formData.bookingType === "Custom" && (
              <>
                <div className="mb-3">
                  <label className="form-label">From Time</label>
                  <input
                    className="form-control"
                    type="time"
                    name="fromTime"
                    value={formData.fromTime}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">To Time</label>
                  <input
                    className="form-control"
                    type="time"
                    name="toTime"
                    value={formData.toTime}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingForm;

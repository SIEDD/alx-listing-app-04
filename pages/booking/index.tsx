import axios from "axios";
import { useState } from "react";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    billingAddress: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form before submission
  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phoneNumber) {
      setError("All fields are required.");
      return false;
    }
    if (!/^\d{16}$/.test(formData.cardNumber)) {
      setError("Invalid card number.");
      return false;
    }
    if (!/^\d{3,4}$/.test(formData.cvv)) {
      setError("Invalid CVV.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await axios.post("/api/bookings", formData);
      setSuccess("Booking confirmed!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        cardNumber: "",
        expirationDate: "",
        cvv: "",
        billingAddress: "",
      });
    } catch (error) {
      setError("Failed to submit booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Confirm Your Booking</h2>

      {/* First Name */}
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-2"
        required
      />

      {/* Last Name */}
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-2"
        required
      />

      {/* Email */}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-2"
        required
      />

      {/* Phone Number */}
      <input
        type="tel"
        name="phoneNumber"
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-2"
        required
      />

      {/* Card Number */}
      <input
        type="text"
        name="cardNumber"
        placeholder="Card Number"
        value={formData.cardNumber}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-2"
        maxLength={16}
        required
      />

      {/* Expiration Date */}
      <input
        type="month"
        name="expirationDate"
        value={formData.expirationDate}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-2"
        required
      />

      {/* CVV */}
      <input
        type="text"
        name="cvv"
        placeholder="CVV"
        value={formData.cvv}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-2"
        maxLength={4}
        required
      />

      {/* Billing Address */}
      <input
        type="text"
        name="billingAddress"
        placeholder="Billing Address"
        value={formData.billingAddress}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-2"
        required
      />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg w-full mt-4"
      >
        {loading ? "Processing..." : "Confirm & Pay"}
      </button>

      {/* Success Message */}
      {success && <p className="text-green-500 mt-2">{success}</p>}

      {/* Error Message */}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}

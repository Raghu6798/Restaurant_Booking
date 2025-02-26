import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, Users, MessageSquare } from "lucide-react"
import { format } from "date-fns"
import ChatWidget from '../components/ChatWidget';
import axios from "axios"

function UserBooking() {
  const [step, setStep] = useState(1)
  const [booking, setBooking] = useState({
    date: "",
    time: "",
    guests: 2,
    specialRequests: "",
    timestamp: new Date().toISOString(), // Add timestamp field
  });
  
  const [errors, setErrors] = useState({
    date: "",
    time: "",
    guests: "",
  })
  const [loading, setLoading] = useState(false)
  const [responseMessage, setResponseMessage] = useState("")

  const validateStep = (currentStep: number) => {
    let isValid = true
    const newErrors = { ...errors }

    if (currentStep === 1) {
      if (!booking.date) {
        newErrors.date = "Please select a date"
        isValid = false
      } else {
        newErrors.date = ""
      }
      if (!booking.time) {
        newErrors.time = "Please select a time"
        isValid = false
      } else {
        newErrors.time = ""
      }
    } else if (currentStep === 2) {
      if (booking.guests < 1) {
        newErrors.guests = "Please select at least 1 guest"
        isValid = false
      } else {
        newErrors.guests = ""
      }
    }

    setErrors(newErrors)
    return isValid
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step !== 3) {
      handleNext();
      return;
    }
  
    setLoading(true);
    setResponseMessage("");
  
    try {
      const bookingData = {
        ...booking,
        timestamp: new Date().toISOString(), // Ensure timestamp is updated on submit
      };
  
      const response = await axios.post("http://127.0.0.1:8000/api/bookings/", bookingData);
      setResponseMessage("Booking confirmed successfully!");
      console.log("Booking submitted:", response.data);
  
      // Reset form after successful submission
      setBooking({
        date: "",
        time: "",
        guests: 2,
        specialRequests: "",
        timestamp: new Date().toISOString(), // Reset timestamp
      });
  
      setStep(1);
    } catch (error) {
      setResponseMessage("Booking failed. Please try again.");
      console.error("Error submitting booking:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Book Your Table</h2>

          <div className="flex justify-between mb-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`flex items-center ${
                  i < step ? "text-indigo-600" : i === step ? "text-gray-900" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    i <= step ? "bg-indigo-600 text-white" : "bg-gray-200"
                  }`}
                >
                  {i}
                </div>
                <span className="ml-2 text-sm font-medium">
                  {i === 1 ? "Date & Time" : i === 2 ? "Party Size" : "Confirm"}
                </span>
              </div>
            ))}
          </div>
          <ChatWidget /> 
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <Calendar className="inline-block w-5 h-5 mr-2" />
                    Select Date
                  </label>
                  <input
                    type="date"
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                      errors.date ? "border-red-500" : ""
                    }`}
                    value={booking.date}
                    onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                    min={format(new Date(), "yyyy-MM-dd")}
                  />
                  {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <Clock className="inline-block w-5 h-5 mr-2" />
                    Select Time
                  </label>
                  <select
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                      errors.time ? "border-red-500" : ""
                    }`}
                    value={booking.time}
                    onChange={(e) => setBooking({ ...booking, time: e.target.value })}
                  >
                    <option value="">Select a time</option>
                    {Array.from({ length: 8 }, (_, i) => i + 17).map((hour) => (
                      <option key={hour} value={`${hour}:00`}>
                        {hour}:00
                      </option>
                    ))}
                  </select>
                  {errors.time && <p className="mt-1 text-sm text-red-500">{errors.time}</p>}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <Users className="inline-block w-5 h-5 mr-2" />
                    Number of Guests
                  </label>
                  <select
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                      errors.guests ? "border-red-500" : ""
                    }`}
                    value={booking.guests}
                    onChange={(e) => setBooking({ ...booking, guests: Number(e.target.value) })}
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                  {errors.guests && <p className="mt-1 text-sm text-red-500">{errors.guests}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    <MessageSquare className="inline-block w-5 h-5 mr-2" />
                    Special Requests
                  </label>
                  <textarea
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    rows={4}
                    value={booking.specialRequests}
                    onChange={(e) => setBooking({ ...booking, specialRequests: e.target.value })}
                    placeholder="Any dietary requirements or special occasions?"
                  />
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Booking Summary</h3>
                  <dl className="space-y-3">
                    <div className="flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">Date</dt>
                      <dd className="text-sm text-gray-900">{booking.date}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">Time</dt>
                      <dd className="text-sm text-gray-900">{booking.time}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">Guests</dt>
                      <dd className="text-sm text-gray-900">{booking.guests}</dd>
                    </div>
                    {booking.specialRequests && (
                      <div className="pt-3 border-t">
                        <dt className="text-sm font-medium text-gray-500 mb-1">Special Requests</dt>
                        <dd className="text-sm text-gray-900">{booking.specialRequests}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              </motion.div>
            )}

            <div className="mt-8 flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Previous
                </button>
              )}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 ml-auto"
              >
                {loading ? "Processing..." : step === 3 ? "Confirm Booking" : "Next"}
              </button>
            </div>
          </form>

          {responseMessage && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-center text-sm mt-4 ${
                responseMessage.includes("successfully") ? "text-green-600" : "text-red-600"
              }`}
            >
              {responseMessage}
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default UserBooking
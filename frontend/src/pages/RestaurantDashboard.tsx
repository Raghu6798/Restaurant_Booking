import React, { useEffect, useState } from "react";
import axios from "axios";
import ChatWidget from '../components/ChatWidget';
import { motion } from "framer-motion";
import { Users, Clock, CalendarDays, Settings } from "lucide-react";

const API_BOOKINGS_URL = "http://127.0.0.1:8000/api/bookings/";
const API_DASHBOARD_URL = "http://127.0.0.1:8000/api/dashboard";

function RestaurantDashboard() {
  const [stats, setStats] = useState({
    total_bookings: 0,
    todays_guests: 0,
    available_tables: 10, 
  });
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    axios
      .get(API_DASHBOARD_URL)
      .then((response) => {
        setStats(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ Error fetching dashboard stats:", error);
        setError("Failed to load dashboard statistics");
        setLoading(false);
      });
  }, []);


  useEffect(() => {
    axios
      .get(API_BOOKINGS_URL)
      .then((response) => {
        setBookings(response.data); 
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ Error fetching bookings:", error);
        setError("Failed to load bookings");
        setLoading(false);
      });
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-xl">
        <div className="border-b border-gray-200">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">Restaurant Dashboard</h1>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </button>
            </div>
            <ChatWidget />  
            {/* ✅ Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Today's Guests */}
              <div className="bg-indigo-50 p-6 rounded-lg">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-indigo-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Today's Guests</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {loading ? "Loading..." : stats.todays_guests}
                    </p>
                  </div>
                </div>
              </div>

              {/* Available Tables */}
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Available Tables for Today : </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {loading ? "Loading..." : stats.available_tables}
                    </p>
                  </div>
                </div>
              </div>

              {/* Total Bookings */}
              <div className="bg-purple-50 p-6 rounded-lg">
                <div className="flex items-center">
                  <CalendarDays className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {loading ? "Loading..." : stats.total_bookings}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* ✅ Display Bookings List */}
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
          {loading ? (
            <p className="text-gray-500 mt-4">Loading bookings...</p>
          ) : bookings.length === 0 ? (
            <p className="text-gray-500 mt-4">No bookings available</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Guests</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Special Requests</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map((booking) => (
                    <tr key={booking._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.time}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.guests}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.specialRequests || "None"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ✅ Error Handling */}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </motion.div>
  );
}

export default RestaurantDashboard;

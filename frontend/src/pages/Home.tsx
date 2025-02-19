"use client"
import { motion } from "framer-motion"
import { ArrowRight, Clock, Calendar, Utensils } from "lucide-react"
import { Link } from "react-router-dom"

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl">AI-Powered Restaurant Reservations</h1>
        <p className="mt-6 text-xl text-gray-500 max-w-3xl mx-auto">
          Book your perfect dining experience with our intelligent reservation system. No more waiting, no more
          confusion - just seamless bookings.
        </p>
        <div className="mt-10">
          <Link
            to="/book"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
          >
            Book Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>

      <div className="mt-20">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <motion.div
            className="relative bg-white p-6 rounded-lg shadow-md hover-lift glass-effect"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute -top-4 left-4 bg-indigo-600 rounded-full p-3">
              <Utensils className="h-6 w-6 text-white" />
            </div>
            <h3 className="mt-8 text-lg font-medium text-gray-900">Smart Recommendations</h3>
            <p className="mt-2 text-gray-500">
              Our AI suggests the perfect table and dishes based on your preferences.
            </p>
          </motion.div>

          <motion.div
            className="relative bg-white p-6 rounded-lg shadow-md hover-lift glass-effect"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute -top-4 left-4 bg-indigo-600 rounded-full p-3">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <h3 className="mt-8 text-lg font-medium text-gray-900">Real-time Availability</h3>
            <p className="mt-2 text-gray-500">See available time slots instantly and book without waiting.</p>
          </motion.div>

          <motion.div
            className="relative bg-white p-6 rounded-lg shadow-md hover-lift glass-effect"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute -top-4 left-4 bg-indigo-600 rounded-full p-3">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <h3 className="mt-8 text-lg font-medium text-gray-900">Easy Management</h3>
            <p className="mt-2 text-gray-500">Manage your reservations effortlessly with our intuitive dashboard.</p>
          </motion.div>
        </div>
      </div>

      <div className="mt-20">
        <div className="relative rounded-xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
            alt="Restaurant interior"
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-3xl font-bold mb-4 text-shadow">Experience Excellence</h2>
              <p className="max-w-2xl mx-auto text-lg">
                Join the hundreds of restaurants using our AI-powered booking system
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Home


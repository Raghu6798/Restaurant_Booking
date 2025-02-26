"use client"

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import UserBooking from "./pages/UserBooking"
import RestaurantDashboard from "./pages/RestaurantDashboard"

const PageWrapper = ({ children }) => {
  const variants = {
    initial: { opacity: 0, x: -20 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 20 },
  }

  return (
    <motion.div initial="initial" animate="in" exit="out" variants={variants} transition={{ duration: 0.3 }}>
      {children}
    </motion.div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          }
        />
        <Route
          path="/book"
          element={
            <PageWrapper>
              <UserBooking />
            </PageWrapper>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PageWrapper>
              <RestaurantDashboard />
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  )
}

export default App


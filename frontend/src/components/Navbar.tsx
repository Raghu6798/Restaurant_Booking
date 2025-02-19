"use client"
import { Link, useLocation } from "react-router-dom"
import { Utensils, Calendar, LayoutDashboard} from "lucide-react"
import { IoFastFoodOutline } from "react-icons/io5";
import { motion } from "framer-motion"

function Navbar() {
  const location = useLocation()

  const navItems = [
    { to: "/book", icon: Calendar, label: "Book Table" },
    { to: "/dashboard", icon: LayoutDashboard, label: "Restaurant Dashboard" },
,
  ]

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-lg sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link to="/" className="flex items-center">
          <IoFastFoodOutline className="h-8 w-8" />
            <span className="ml-2 text-xl font-bold text-gray-900">ReserveAI</span>
          </Link>

          <div className="flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="relative inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.label}
                {location.pathname === item.to && (
                  <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar


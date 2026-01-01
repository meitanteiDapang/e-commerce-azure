import { Route, Routes } from 'react-router-dom'
import AdminLogin from './admin/AdminLogin'
import AdminPage from './admin/AdminPage'
import Booking from './booking/Booking'
import BookingSuccess from './booking/BookingSuccess'
import HomePage from './home/HomePage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/book" element={<Booking />} />
      <Route path="/booked" element={<BookingSuccess />} />
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  )
}

export default App

import { Route, Routes } from "react-router-dom";
import AdminLogin from "./admin/AdminLogin.jsx";
import AdminPage from "./admin/AdminPage.jsx";
import Booking from "./booking/Booking.jsx";
import BookingSuccess from "./booking/BookingSuccess.jsx";
import HomePage from "./home/HomePage.jsx";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/book" element={<Booking />} />
      <Route path="/booked" element={<BookingSuccess />} />
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;

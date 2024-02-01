import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import RegisterUser from './components/RegisterUser';
import LoginUser from "./components/LoginUser";
import AvailableCars from "./components/AvailableCars";
import MyBookings from "./components/MyBookings";
import ProtectedRoute from "./components/ProtectedRute";
import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<RegisterUser />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/bookcar" element={<ProtectedRoute child={<AvailableCars />} />} />
        <Route path="/mybookings" element={<ProtectedRoute child={<MyBookings />} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

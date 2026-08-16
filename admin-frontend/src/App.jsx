import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/AdminLayout";
import Login from "./pages/Login";
import Overview from "./pages/Overview";
import Bookings from "./pages/Bookings";
import Inquiries from "./pages/Inquiries";
import Packages from "./pages/Packages";
import Offers from "./pages/Offers";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Overview />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="inquiries" element={<Inquiries />} />
        <Route path="packages" element={<Packages />} />
        <Route path="offers" element={<Offers />} />
      </Route>
    </Routes>
  );
}

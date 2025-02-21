import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CustomerDetails from "./pages/CustomerDetails";
import ViewPage from "./pages/ViewPage";
import SignInPage from "./pages/login";

// ✅ ProtectedRoute Component (Checks Token)
const ProtectedRoute = ({ element }) => {
  const token = sessionStorage.getItem("token"); // Or use localStorage
  return token ? element : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* If token exists, go to home; otherwise, go to login */}
        <Route path="/login" element={<SignInPage />} />
        <Route path="/" element={<ProtectedRoute element={<CustomerDetails />} />} />
        <Route path="/view/:company_id" element={<ProtectedRoute element={<ViewPage />} />} />
      </Routes>
    </Router>
  );
};

export default App;

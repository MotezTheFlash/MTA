import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/dashboard/Dashboard";
import Developers from "./pages/dashboard/developers/Developers";
import Programs from "./pages/dashboard/programs/Programs";
import Projects from "./pages/dashboard/projects/Projects";
import Customers from "./pages/dashboard/customers/Customers";
import Sales from "./pages/dashboard/sales/Sales";
import Profile from "./pages/dashboard/profile/Profile";

const App = () => {
  return (
    <div>
      <Router>
        {/* <ToastContainer /> */}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          {/* <Route path="/" element={<Landing />} /> */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="/dashboard/developers" element={<Developers />} />
            <Route path="/dashboard/programs" element={<Programs />} />
            <Route path="/dashboard/projects" element={<Projects />} />
            <Route path="/dashboard/customers" element={<Customers />} />
            <Route path="/dashboard/sales" element={<Sales />} />
            <Route path="/dashboard/profile" element={<Profile />} />
            {/* 
          <Route path="/dashboard/appointments" element={<Landing />} />
          <Route path="/dashboard/payments" element={<Landing />} /> */}
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;

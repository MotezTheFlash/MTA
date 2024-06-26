import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/dashboard/Dashboard";
import Developers from "./pages/dashboard/developers/Developers";
import Programs from "./pages/dashboard/programs/Programs";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="/dashboard/developers" element={<Developers />} />
            <Route path="/dashboard/programs" element={<Programs />} />
            {/* <Route path="/dashboard/customers" element={<Landing />} />
          <Route path="/dashboard/projects" element={<Landing />} />
          <Route path="/dashboard/sales" element={<Landing />} />
          <Route path="/dashboard/appointments" element={<Landing />} />
          <Route path="/dashboard/payments" element={<Landing />} /> */}
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;

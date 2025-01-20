import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Review from "./Pages/Review";
import { useState } from "react";
import Home from "./Pages/Home";
import SymptomAnalyzer from "./Pages/SymptomAnalyzer";
import AuthModal from "./components/AuthModal";
import SignUp from "./components/SignUp";
import NutritionAnalyzer from "./Pages/NutritionAnalyzerPage";
import DoctorAuthModal from "./components/DoctorAuthModal";
import DocHomePage from "./components/DocHomePage";
import UserHome from "./Pages/UserHome";
import Otpverify from "./components/Otpverify";
import Connect from "./Pages/Connect";
function App() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleClose = () => {
    setIsModalOpen(false);
    window.history.back();
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/review" element={<Review />} />
        <Route path="/symptoms" element={<SymptomAnalyzer />} />
        <Route
          path="/signin"
          element={
            <AuthModal
              isOpen={isModalOpen}
              onClose={handleClose}
              onLoginSuccess={() => console.log("Login successful")} // Add this prop
              setIsOpen={(isOpen) => setIsModalOpen(isOpen)} // Add this prop
              setIsAuthModalOpen={(isOpen) => setIsModalOpen(isOpen)} // Add this prop
            />
          }
        />
        <Route path="/connect" element={<Connect />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/nutri" element={<NutritionAnalyzer />} />
        <Route path="/doctor-auth" element={<DoctorAuthModal />} />
        <Route path="/Dochome" element={<DocHomePage />} />
        <Route path="/userhome" element={<UserHome />} />
        <Route path="/otp" element={<Otpverify />} />
      </Routes>
    </Router>
  );
}

export default App;

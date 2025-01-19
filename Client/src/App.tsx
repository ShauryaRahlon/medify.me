import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Review from "./Pages/Review";
import Home from "./Pages/Home";
import SymptomAnalyzer from "./Pages/SymptomAnalyzer";
import AuthModal from './components/AuthModal';
import SignUp from './components/SignUp';
import NutritionAnalyzer from "./Pages/NutritionAnalyzerPage";
import DoctorAuthModal from './components/DoctorAuthModal';
import DocHomePage from './components/DocHomePage';
import UserHome from './Pages/UserHome';
import OtpVerification from "./components/Otpverify";
import MedicalHistory from "./components/MedicalHistory";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/review" element={<Review />} />
        <Route path="/symptoms" element={<SymptomAnalyzer/>}/>
        <Route path="/signin" element={<AuthModal isOpen={true} onClose={() => window.history.back()} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/nutri" element={<NutritionAnalyzer />} />
        <Route path="/doctor-auth" element={<DoctorAuthModal />} />
        <Route path="/Dochome" element={<DocHomePage />} />
        <Route path="/userhome" element={<UserHome />} />
<<<<<<< HEAD
        <Route path="/verifyOTP" element={<OtpVerification/>} />
        <Route path="/medical-history" element={<MedicalHistory/>} />
=======
        <Route path="/otpverify" element={<OtpVerification/>} />
>>>>>>> 9e87fb1b08fcdd27f5c297cc653b7c6c3598c0c4
      </Routes>
    </Router>
  );
}

export default App;

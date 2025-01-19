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
        <Route path="/otpverify" element={<OtpVerification/>} />
      </Routes>
    </Router>
  );
}

export default App;

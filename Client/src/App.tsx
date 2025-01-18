import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Review from "./Pages/Review";
import Home from "./Pages/Home";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/review" element={<Review />} />
      </Routes>
    </Router>
  );
}

export default App;

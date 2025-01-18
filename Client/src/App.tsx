import { useState } from "react";
import "./App.css";
// import { motion } from 'framer-motion';
// import { Activity, Microscope, ScanSearch, Brain, Menu, X } from 'lucide-react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Review from "./Pages/Review";
import Home from "./Pages/Home";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/review" element={<Review />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Review from "./Pages/Review";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/review" element={<Review />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

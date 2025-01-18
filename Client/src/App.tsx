import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Review from './Pages/Review'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<h1>Welcome to home Page</h1>}/>
          <Route path='/chat' element={<Review/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App

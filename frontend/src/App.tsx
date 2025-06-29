import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import Navbar from './components/Navbar'
import CheckinPage from './pages/checkin.page'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/checkin" element={<CheckinPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
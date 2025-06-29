import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-blue-700 text-white px-6 py-4">
      <ul className="flex gap-6">
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/students">Alunos</Link></li>
        <li><Link to="/checkin">Check-in</Link></li>
      </ul>
    </nav>
  )
}
import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 h-screen bg-gray-800 text-white p-4">
      <nav>
        <ul className="space-y-4">
          <li>
            <Link to="/upload" className="hover:underline">
              Upload Video
            </Link>
          </li>
          <li>
            <Link to="/results" className="hover:underline">
              Processing Results
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar

import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-100 p-4">
      <nav className="flex flex-col gap-4">
        <NavLink
          to="/students"
          className={({ isActive }) =>
            isActive ? 'text-blue-600 font-semibold' : 'text-gray-800'
          }
        >
          Studenci
        </NavLink>
        <NavLink
          to="/courses"
          className={({ isActive }) =>
            isActive ? 'text-blue-600 font-semibold' : 'text-gray-800'
          }
        >
          Kursy
        </NavLink>
      </nav>
    </aside>
  )
}

import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-green-600 text-white p-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-xl font-bold mb-2 md:mb-0">Smart Carbon Budget Planner</h1>
        <div className="flex space-x-2 md:space-x-4">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `px-3 py-1 rounded ${isActive ? 'bg-green-800' : 'hover:bg-green-700'}`
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/log" 
            className={({ isActive }) => 
              `px-3 py-1 rounded ${isActive ? 'bg-green-800' : 'hover:bg-green-700'}`
            }
          >
            Activity Log
          </NavLink>
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => 
              `px-3 py-1 rounded ${isActive ? 'bg-green-800' : 'hover:bg-green-700'}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink 
            to="/tips" 
            className={({ isActive }) => 
              `px-3 py-1 rounded ${isActive ? 'bg-green-800' : 'hover:bg-green-700'}`
            }
          >
            Tips
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

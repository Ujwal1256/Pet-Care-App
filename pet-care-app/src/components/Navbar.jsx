import React,{useState} from 'react';
import { FiMenu } from 'react-icons/fi';
import LogoutModal from './LogoutModal';
const Navbar = ({ onMenuClick }) => {
    const [isLogoutOpen, setIsLogoutOpen] = useState(false);

 

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow px-4 py-3 z-50 flex justify-between items-center h-16">
      <div className="flex items-center gap-3">
        {/* Hamburger for mobile only */}
        <button onClick={onMenuClick} className="md:hidden text-2xl">
          <FiMenu />
        </button>
        <h1 className="text-xl font-bold text-blue-600">PetCare</h1>
      </div>
      <div>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={() => setIsLogoutOpen(true)}
        >
          Logout
        </button>
        <LogoutModal
          isOpen={isLogoutOpen}
          onClose={() => setIsLogoutOpen(false)}
        />
      </div>
    </nav>
  );
};

export default Navbar;

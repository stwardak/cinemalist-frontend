import React, { useState } from 'react';

export function Header() {
  //  visibility of profile dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <header className="p-6 bg-black text-white border-b-white">
      <nav className="flex justify-between items-center">
        <a href="/" className="font-extrabold text-4xl">The Cinemalist.</a>
        <div></div>
        <a href="/about" className="">About</a>
        <a href="/" className="">Browse</a>
        <input type="text" placeholder="Search" className="border p-1" />
        <div className="flex items-center">
            <a href="/favorites" className="flex items-center mr-6">
              <img src="/src/assets/watch_list.svg" className="w-3 h-3 mr-2" alt="Favorites" />
             <span>Favorites</span>
            </a>
            <a href="/watchlist" className="flex items-center mr-6">
              <img src="/src/assets/watch_list.svg" className="w-3 h-3 mr-2" alt="Watchlist" />
             <span>Watchlist</span>
            </a>
            <a href="/seen-it" className="flex items-center mr-6">
              <img src="/src/assets/seen_list.svg" className="w-4 h-4 mr-2" alt="Seen it" />
             <span>Seen it</span>
            </a>
            <div className="relative">
          <img src="/src/assets/profile.svg" alt="Profile" className="inline-block w-8 h-8 rounded-full cursor-pointer" onClick={toggleDropdown} />
          <div className={`absolute right-0 mt-2 w-48 bg-black shadow-md ${isDropdownOpen ? '' : 'hidden'}`}>
            <a href="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Login</a>
            <a href="/signup" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Sign Up</a>
            <a href="/logout" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Logout</a>
          </div>
        </div>
            {/* need to add conditional logic */}
        </div>
        
      </nav>
    </header>
  );
}

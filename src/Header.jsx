import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const [userId, setUserId] = useState(null);
  const [userUsername, setUserUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedUserUsername = localStorage.getItem("user_username");
    console.log("User ID from localStorage:", storedUserId);
    console.log("Username from localStorage:", storedUserUsername);
    setUserId(storedUserId);
    setUserUsername(storedUserUsername);
  }, []);

  if (!userId || !userUsername) {
    return <div>Loading...</div>;
  }

  return (
    <header className="p-8 bg-black text-grey-200 border-b-2 border-grey">
      <nav className="flex justify-between items-center">
        <a href="/" className="font-extrabold text-4xl text-white">The Cinemalist.</a>
        <div></div>
        <a href="/about" className="hover:text-white">About</a>
        <a href="/" className="hover:text-white">Members</a>
        <input type="text" placeholder="Search" className="border p-1" />
        <div className="flex items-center">
          <a href={`/users/${userId}/favorites`} className="flex items-center mr-6 hover:text-white">
            <img src="/src/assets/faved.svg" className="w-8 h-8 mr-2" alt="Favorites" />
            <span>Favorites</span>
          </a>

          <a href={`/users/${userId}/seen-it`} className="flex items-center mr-6 hover:text-white">
            <img src="/src/assets/watched.svg" className="w-8 h-8 mr-2" alt="Seen it" />
            <span>Seen it</span>
          </a>

          <a href={`/users/${userId}/watchlist`} className="flex items-center mr-6 hover:text-white">
            <img src="/src/assets/saved.svg" className="w-8 h-8 mr-2" alt="Watchlist" />
            <span>Watchlist</span>
          </a>

          <a href={`/users/${userId}/reviews`} className="flex items-center mr-6 hover:text-white">
            <img src="/src/assets/reviewed.svg" className="w-8 h-8 mr-2" alt="My Reviews" />
            <span>My Reviews</span>
          </a>

          <div className="relative">
            <img src="/src/assets/profile.svg" alt="Profile" className="inline-block w-8 h-8 rounded-full cursor-pointer" onClick={toggleDropdown} />
            <div className={`absolute right-0 mt-2 w-48 bg-black border-b-1 border-grey ${isDropdownOpen ? '' : 'hidden'}`}>
              <a href="/login" className="block px-4 py-2 text-grey-200 hover:bg-grey-500 border-b-2 border-grey-200">Login</a>
              <a href="/signup" className="block px-4 py-2 text-grey-200 hover:bg-grey-500 border-b-2 border-grey-200">Sign Up</a>
              <a href="/logout" className="block px-4 py-2 text-grey-200 hover:bg-grey-500 border-b-2 border-grey-200">Logout</a>
              <a href={`/${userUsername}`} className="block px-4 py-2 text-grey-200 hover:bg-grey-500 border-b-2 border-grey-200">My Profile</a>
              <a href="/settings" className="block px-4 py-2 text-grey-200 hover:bg-grey-500">Settings</a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

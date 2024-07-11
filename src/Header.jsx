import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Logout } from './Logout';
import axios from 'axios';

export function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const [userId, setUserId] = useState(null);
  const [userUsername, setUserUsername] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedUserUsername = localStorage.getItem("user_username");
    const storedUserAvatar = localStorage.getItem("user_avatar");
    console.log("User ID from localStorage:", storedUserId);
    console.log("Username from localStorage:", storedUserUsername);
    console.log("Avatar from localStorage:", storedUserAvatar);
    setUserId(storedUserId);
    setUserUsername(storedUserUsername);
    setUserAvatar(storedUserAvatar);
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3000/search?q=${searchQuery}`);
      setSearchResults(response.data);
      navigate('/search-results', { state: { results: response.data } });
    } catch (error) {
      console.error("Search error:", error);
    }
  };


  return (
    <header className="p-4 bg-black text-grey-200 border-b-2 border-grey fixed w-full top-0 z-50 h-18">
      <nav className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* Left Section */}
        <div className="lg:col-span-3 mb-4 lg:mb-0 flex items-center justify-center lg:justify-start">
          <a href="/" className="font-extrabold text-4xl lg:text-4xl text-white">The Cinemalist.</a>
        </div>
        {/* Middle Section */}
        <div className="lg:col-span-5 xl:col-span-4 flex items-center justify-center lg:justify-end space-x-4">
          <a href="/about" className="hover:text-white">About</a>
          <a href="/" className="hover:text-white">Members</a>
          <form onSubmit={handleSearchSubmit} className="flex items-center">
            <input
              type="text"
              placeholder="&#x1F50D; Search..."
              className="border p-1"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button type="submit" className="border-2 border-white border-b-grey-300 border-r-grey-300 ml-2 px-2 text-white rounded hover:translate-x-0.5 hover:translate-y-0.5 hover:border-grey-100 hover:border-b-grey-300 hover:border-r-grey-300 hover:bg-grey-500">GO</button>
          </form>
        </div>
        {/* Right Section */}
        <div className="lg:col-span-4 xl:col-span-5 flex items-center justify-center lg:justify-end space-x-4">
          {userId && (
            <>
              <a href={`/users/${userId}/favorites`} className="flex items-center hover:text-white">
                <img src="/src/assets/faved.svg" className="w-8" alt="Favorites" />
                <span className="hidden xl:inline">Favorites</span>
              </a>

              <a href={`/users/${userId}/seen-it`} className="flex items-center hover:text-white">
                <img src="/src/assets/watched.svg" className="w-8" alt="Seen it" />
                <span className="hidden xl:inline">Seen it</span>
              </a>
              <a href={`/users/${userId}/watchlist`} className="flex items-center hover:text-white">
                <img src="/src/assets/saved.svg" className="w-8" alt="Watchlist" />
                <span className="hidden xl:inline">Watchlist</span>
              </a>
              <a href={`/users/${userId}/reviews`} className="flex items-center hover:text-white">
                <img src="/src/assets/reviewed.svg" className="w-8" alt="My Reviews" />
                <span className="hidden xl:inline">My Reviews</span>
              </a>
            </>
          )}
          <div 
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <div className="inline-block w-8 lg:w-12 h-8 lg:h-12 rounded-full cursor-pointer">
              <img 
                src={userAvatar ? `http://localhost:3000/avatars/${userAvatar}` : "/src/assets/profile.svg"} 
                alt="Profile" 
                className="inline-block w-8 lg:w-12 rounded-full cursor-pointer" 
                onClick={toggleDropdown} 
              />
              <div className={`absolute right-0 mt-0 w-48 bg-black border-b-1 border-grey ${isDropdownOpen ? '' : 'hidden'}`}>
              {!userId ? (
                <>
                  <a href="/login" className="block px-4 py-2 text-grey-200 hover:bg-grey-500 border-b-2 border-grey-200">Login</a>
                  <a href="/signup" className="block px-4 py-2 text-grey-200 hover:bg-grey-500 border-b-2 border-grey-200">Sign Up</a>
                </>
              ) : (
                <>
                  <div className="block px-4 py-2 text-grey-200 hover:bg-grey-500 border-b-2 border-grey-200"><Logout /></div>
                  <a href={`/${userUsername}`} className="block px-4 py-2 text-grey-200 hover:bg-grey-500 border-b-2 border-grey-200">My Profile</a>
                  <a href="/settings" className="block px-4 py-2 text-grey-200 hover:bg-grey-500">Settings</a>
                </>
              )}
            </div>

            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Members() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/users.json")
      .then(response => {
        console.log(response.data);
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the users!", error);
      });
  }, []);

  const handleUserClick = (username) => {
    navigate(`/${username}`);
  };

  const handlePlaceholderClick = () => {
    // Placeholder click handler
  };

  if (loading) {
    return <div className="min-h-screen bg-black text-white p-4 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6">Members</h1>
      <div className="w-full flex flex-col items-center pb-32">
        {users.map(user => (
          <div 
          key={user.id} 
          className="p-4 flex flex-col lg:flex-row items-center justify-between w-full lg:w-2/3 border-b-2 border-y-grey-300 space-y-4 lg:space-y-0"
        >
            <div className="flex items-center space-x-4">
              <img 
                src={`http://localhost:3000/avatars/${user.user_profile.avatar}`} 
                alt="Avatar" 
                className="rounded-full w-10 h-10 cursor-pointer hover:outline"
                onClick={() => handleUserClick(user.username)}
              />
              <h2 
                className="text-lg cursor-pointer hover:underline"
                onClick={() => handleUserClick(user.username)}
              >
                {user.username}
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <a href={`/users/${user.id}/favorites`} className="flex items-center space-x-1">
                <img src="/src/assets/faved.svg" className="w-6 h-6" alt="Favorites" />
                <span className="text-sm font-semibold">{user.favorites_count}</span>
              </a>
              <a href={`/users/${user.id}/seen-it`} className="flex items-center space-x-1">
                <img src="/src/assets/watched.svg" className="w-6 h-6" alt="Watched" />
                <span className="text-sm font-semibold">{user.watched_movies_count}</span>
              </a>
              <a href={`/users/${user.id}/watchlist`} className="flex items-center space-x-1">
                <img src="/src/assets/saved.svg" className="w-6 h-6" alt="Watchlist" />
                <span className="text-sm font-semibold">{user.saved_movies_count}</span>
              </a>
              <a href={`/users/${user.id}/reviews`} className="flex items-center space-x-1">
                <img src="/src/assets/reviewed.svg" className="w-6 h-6" alt="Reviews" />
                <span className="text-sm font-semibold">{user.reviews_count}</span>
              </a>
              <div className="border-y-2"></div>
              <div className="flex flex-col items-center">
                <span className="text-sm font-semibold">{user.followers_count}</span>
                <span className="text-xs text-grey-300 uppercase">Followers</span>
              </div>
              <div className="flex flex-col items-center border-l-2 px-4">
                <span className="text-sm font-semibold">{user.following_count}</span>
                <span className="text-xs text-grey-300 uppercase">Following</span>
              </div>
              <button onClick={handlePlaceholderClick} className="bg-blue w-6 h-6 rounded-full hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-grey-500">+</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

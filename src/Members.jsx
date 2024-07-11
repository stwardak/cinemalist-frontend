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

  if (loading) {
    return <div className="min-h-screen bg-black text-white p-4 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6">Members</h1>
      <div className="w-full flex flex-col items-center">
        {users.map(user => (
          <div 
            key={user.id} 
            className="p-4 cursor-pointer flex items-center space-x-4 border-b-2 border-y-grey-300 w-1/3 justify-center"
            onClick={() => handleUserClick(user.username)}
          >
            <img 
              src={`http://localhost:3000/avatars/${user.user_profile.avatar}`} 
              alt="Avatar" 
              className="rounded-full w-8 h-8"
            />
            <h2 className="text-md">{user.username}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

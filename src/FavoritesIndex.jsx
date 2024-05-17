import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export function FavoritesIndex() {
  const [favorites, setFavorites] = useState([]);
  const { userId } = useParams();  // Use userId from URL params
  const loggedInUserId = localStorage.getItem("userId");  // Logged-in user's ID
  const navigate = useNavigate();

  const getFavorites = () => {
    const idToUse = userId || loggedInUserId;  // Use URL userId if available, otherwise use logged-in userId
    console.log("getFavorites for user:", idToUse);
    axios.get(`http://localhost:3000/users/${idToUse}/favorites.json`).then(response => {
      console.log(response.data);
      setFavorites(response.data);
    });
  };

  useEffect(getFavorites, [userId]);


return (
  <div className="bg-black min-h-screen p-8 justify-center">
   <h1 className="text-center text-4xl text-white font-bold mb-8 justify-center">Favorites</h1>
     <div className="grid grid-cols-1 md:grid-cols-6 gap-8 justify-center">
       {favorites.map((favorite) => (
        <div key={favorite.id} className="bg-black rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 justify-center">
          <h3 className="text-white text-lg font-semibold p-4 truncate">{favorite.movie.title}</h3>
          <button onClick={() => navigate(`/movies/${favorite.movie.id}`)} className="focus:outline-none hover:opacity-60 justify-center">
            <img src={favorite.movie.image_url} alt={`View details for ${favorite.movie.title}`} className="w-full h-96 object-cover"/>
          </button>
        </div>
      ))}
    </div>
  </div>
);
}
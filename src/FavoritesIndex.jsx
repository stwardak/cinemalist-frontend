import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export function FavoritesIndex() {

  const [favorites, setFavorites] = useState ([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const getFavorites = () => {
    console.log("getFavorites");
    axios.get(`http://localhost:3000/users/${userId}/favorites.json`).then(response => {
      console.log(response.data);
      setFavorites(response.data);
    });
  };

  useEffect(getFavorites, []);

  return (
    <div>
      <h1>Favorites</h1>
      {favorites.map(favorite => (
        <div key={favorite.id}>
          <h3>{favorite.movie.title}</h3>
          <button onClick={() => navigate(`/movies/${favorite.movie.id}`)}>
            <img src={favorite.movie.image_url} alt={`View details for ${favorite.movie.title}`} className="w-64"/>
          </button>
        </div>
      ))}
    </div>
  )
}
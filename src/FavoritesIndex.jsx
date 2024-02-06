import { useEffect, useState } from "react"
import axios from "axios";

export function FavoritesIndex() {

  const [favorites, setFavorites] = useState ([]);

  const getFavorites = () => {
    console.log("getFavorites");
    axios.get("http://localhost:3000/favorites.json").then(response => {
      console.log(response.data);
      setFavorites(response.data);
    });
  };

  useEffect(getFavorites, []);

  return (
    <div>
      <h1>Favorites</h1>
      {favorites.map(favorite => (
        <div key = {favorite.id}>
        <h3>{favorite.movie.title}</h3>
      </div>
      ))}
    </div>
  )
}
import axios from "axios";
import { useState, useEffect } from "react";


export function MoviesShow(props) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);

  // check if already favorited
  useEffect(() => {
    axios.get("http://localhost:3000/favorites.json")
    .then(response => {
      const favorites = response.data;
      const favorite = favorites.find(fav => fav.movie.id === props.movie.id);

      if (favorite) {
        setIsFavorited(true);
        setFavoriteId(favorite.id);
      }
      else {
        setIsFavorited(false);
        setFavoriteId(null);
      }
    })
    .catch(error => console.error("Error fetching favorites", error));
  }, [props.movie.id]);

  const handleFavorite = () => {
    if (isFavorited) {
      // remove from favorites
      console.log("Removing from favorites", props.movie.id);
      axios.delete(`http://localhost:3000/favorites/${favoriteId}.json`)
        .then(() => {
          setIsFavorited(false);
          setFavoriteId(null);
        })
        .catch(error => console.error("Error removing from favorites", error));
    } 
    
    else {
      // add to favorites
      console.log("Adding to favorites", props.movie.id);
      axios.post("http://localhost:3000/favorites.json", { movie_id: props.movie.id })
        .then(() => {
          setIsFavorited(true);
        })
        .catch(error => console.error("Error adding to favorites", error));
    }
  };






  return (
    <div>
      <h1>{props.movie.title}</h1>
      <h3>{props.movie.rating}</h3>
      <h3>{props.movie.year}</h3>
      {/* <h3>{props.movie.director}</h3> */}
      {/* need to select from director table */}
      <p>{props.movie.description}</p>
      {/* <img src = {props.movie.image_url}/> */}
      {/* image too large */}
      {/* add genre tags */}

    {/* add to faves */}
      {/* <button onClick={addToFavorites}>
      </button> */}
      <button onClick={handleFavorite}>
        {isFavorited ? "★ Remove from Favorites" : "☆ Add to Favorites"} 
      </button>
    </div>

  );
}
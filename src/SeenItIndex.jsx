import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export function SeenItIndex() {

  const [watchedMovies, setWatchedMovies] = useState ([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const getWatchedMovies = () => {
    console.log("getWatchedMovies");
    axios.get(`http://localhost:3000/users/${userId}/seen-it.json`).then(response => {
      console.log(response.data);
      setWatchedMovies(response.data);
    });
  };

  useEffect(getWatchedMovies, []);

  return (
    <div>
      <h1>Seen It</h1>
      {watchedMovies.map(watchedMovie => (
        <div key={watchedMovie.id}>
          <h3>{watchedMovie.movie.title}</h3>
          <button onClick={() => navigate(`/movies/${watchedMovie.movie.id}`)}>
            <img src={watchedMovie.movie.image_url} alt={`View details for ${watchedMovie.movie.title}`} className="w-64"/>
          </button>
        </div>
      ))}
    </div>
  )
}
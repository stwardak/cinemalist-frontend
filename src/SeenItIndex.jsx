import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export function SeenItIndex() {
  const [watchedMovies, setWatchedMovies] = useState([]);
  const { userId } = useParams();  // Use userId from URL params
  const loggedInUserId = localStorage.getItem("userId");  // Logged-in user's ID
  const navigate = useNavigate();

  const getWatchedMovies = () => {
    const idToUse = userId || loggedInUserId;  // Use URL userId if available, otherwise use logged-in userId
    console.log("getWatchedMovies for user:", idToUse);
    axios.get(`http://localhost:3000/users/${idToUse}/seen-it.json`).then(response => {
      console.log(response.data);
      setWatchedMovies(response.data);
    });
  };

  useEffect(getWatchedMovies, [userId]);

  return (
    <div className="bg-black min-h-screen p-8 justify-center">
     <h1 className="text-center text-4xl text-white font-bold mb-8 justify-center">Seen It</h1>
       <div className="grid grid-cols-1 md:grid-cols-6 gap-8 justify-center">
         {watchedMovies.map((watchedMovie) => (
          <div key={watchedMovie.id} className="bg-black rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 justify-center">
            <h3 className="text-white text-lg font-semibold p-4 truncate">{watchedMovie.movie.title}</h3>
            <button onClick={() => navigate(`/movies/${watchedMovie.movie.id}`)} className="focus:outline-none hover:opacity-60 justify-center">
              <img src={watchedMovie.movie.image_url} alt={`View details for ${watchedMovie.movie.title}`} className="w-full h-96 object-cover"/>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
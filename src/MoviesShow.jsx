import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function MoviesShow() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);
  const [isWatched, setIsWatched] = useState(false);
  const [watchedId, setWatchedId] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [savedId, setSavedId] = useState(null);
  const currentUserId = localStorage.getItem("userId");

  // fetch favorite status
  const fetchFavoriteStatus = () => {
    axios.get(`http://localhost:3000/users/${currentUserId}/favorites.json`)
  .then(response => {
    console.log("Favorites response:", response.data); // debugging line
    const favorite = response.data.find(fav => fav.movie.id === parseInt(id));
    if (favorite) {
      setIsFavorited(true);
      setFavoriteId(favorite.id);  
    }
  })
  .catch(error => console.error("Error checking favorite status", error));
  };

    // fetch watched status
    const fetchWatchedStatus = () => {
      axios.get(`http://localhost:3000/users/${currentUserId}/seen-it.json`)
    .then(response => {
      console.log("Seen It response:", response.data); // debugging line
      const watchedMovie = response.data.find(watchedMovie => watchedMovie.movie.id === parseInt(id));
      if (watchedMovie) {
        setIsWatched(true);
        setWatchedId(watchedMovie.id); 
      }
    })
    .catch(error => console.error("Error checking watched status", error));
    };

      // fetch saved status
      const fetchSavedStatus = () => {
        axios.get(`http://localhost:3000/users/${currentUserId}/watchlist.json`)
      .then(response => {
        console.log("Watchlist response:", response.data); // debugging line
        const savedMovie = response.data.find(savedMovie => savedMovie.movie.id === parseInt(id));
        if (savedMovie) {
          setIsSaved(true);
          setSavedId(savedMovie.id); 
        }
      })
      .catch(error => console.error("Error checking saved status", error));
      };

  // Fetch movie details and favorite, watched, saved status
  useEffect(() => {
    axios.get(`http://localhost:3000/movies/${id}.json`)
      .then(response => setMovie(response.data))
      .catch(error => console.error("Error fetching movie details", error));

    fetchFavoriteStatus();
    fetchWatchedStatus();
    fetchSavedStatus();

  }, [id]);

  // Handle adding or removing from favorites
  const handleFavorite = () => {
    if (isFavorited) {
      axios.delete(`http://localhost:3000/favorites/${favoriteId}.json`, { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }})
        .then(() => {
          setIsFavorited(false);
          setFavoriteId(null);
          fetchFavoriteStatus();
        })
        .catch(error => console.error("Error removing from favorites", error));
    } else {
      axios.post(`http://localhost:3000/users/${currentUserId}/favorites.json`, { movie_id: id }, { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }})
        .then(response => {
          setIsFavorited(true);
          setFavoriteId(response.data.id);
          fetchFavoriteStatus();
        })
        .catch(error => console.error("Error adding to favorites", error));
    }
  };

  // Handle watched movies
  const handleWatchedMovies = () => {
    if (isWatched) {
      axios.delete(`http://localhost:3000/seen-it/${watchedId}.json`, { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }})
        .then(() => {
          setIsWatched(false);
          setWatchedId(null);
          fetchWatchedStatus();
        })
        .catch(error => console.error("Error removing from watched movies", error));
    } else {
      axios.post(`http://localhost:3000/users/${currentUserId}/seen-it.json`, { movie_id: id }, { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }})
        .then(response => {
          setIsWatched(true);
          setWatchedId(response.data.id);
          fetchWatchedStatus();
        })
        .catch(error => console.error("Error adding to watched movies", error));
    }
  };

  // Handle saved movies
  const handleSavedMovies = () => {
    if (isSaved) {
      axios.delete(`http://localhost:3000/watchlist/${savedId}.json`, { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }})
        .then(() => {
          setIsSaved(false);
          setSavedId(null);
          fetchSavedStatus();
        })
        .catch(error => console.error("Error removing from saved movies", error));
    } else {
      axios.post(`http://localhost:3000/users/${currentUserId}/watchlist.json`, { movie_id: id }, { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }})
        .then(response => {
          setIsSaved(true);
          setSavedId(response.data.id);
          fetchSavedStatus(); 
        })
        .catch(error => console.error("Error adding to saved movies", error));
    }
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      

      {/* left column */}
      <div className= "p-2 m-2">
        <img src={movie.image_url} alt={`${movie.title}`} className= "w-64" />
        <br/>
        <p>★ {movie.favorites} </p>
        <p>✓ {movie.watched_movies} </p>
        <p>☰ {movie.saved_movies} </p>
        <p>✎ {movie.reviews_count} </p>
      </div>

      {/* center column */}
      <div className= "p-2 m-2">
        <h1 className="border-b-2 border-black">{movie.title}</h1>
        <br/>
        <p>{movie.year}</p>
        <br/>
        <p>Directed by: {movie.director.name}</p>
        <br/>
        <button className="bg-yellow p-2 m-2" onClick={handleFavorite}>
          {isFavorited ? "★ Remove from Favorites" : "☆ Add to Favorites"}
        </button>
        <button className="bg-yellow p-2 m-2" onClick={handleWatchedMovies}>
         {isWatched ? "✓ Seen it" : "✕ Haven't Seen It"}
        </button> 
        <button className="bg-yellow p-2 m-2" onClick={handleSavedMovies}>
          {isSaved ? "☰ On My List" : "☰ Add to Watchist"}
        </button>
        <br/>
        <p>{movie.description}</p>
        <br/>
        <div>
          {movie.genres.map((genre) => (
            <button className="bg-yellow p-2 m-2">
             <div key={genre.id}>
              <p>{{genre}.genre}</p>
             </div>
            </button>
          ))}
        </div> 
        <br/>
        <div>
          <h3 className="p-2 m-2">Reviews</h3>
        
          <button className="bg-yellow p-2 m-2">Leave a Review</button>
          {movie.reviews.map((review) => (
          <div key={review.id} className="p-2 m-2">
            <p>{review.rating}</p>
            <p>Rating: {review.rating}</p>
            <p>{review.content}</p>
          </div>
          ))}
        </div>
        
      </div>


      <br/>
    </div>
  );
}
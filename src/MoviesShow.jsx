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
  const [isReviewed, setIsReviewed] = useState(false);
  const [ReviewedId, setReviewedId] = useState(null);
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
    <div className="container mx-auto px-4 sm:px-6 lg:px-10 xl:px-40">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2">

        {/* left column */}
        <div className="md:col-span-3 order-1 md:order-1 text-grey-300 text-lg pt-12 pl-8 pr-8 ">
          <img src={movie.image_url} alt={`${movie.title}`} className= "w-max mb-4" />
          <div className="flex items-center justify-center">
            <a href="/favorites" className="flex items-center mr-6 hover:text-white">
              <img src="/src/assets/faved.svg" className="w-12 h-12 mr-2" alt="Favorites" />
              <span>{movie.favorites}</span>
            </a>
            <a href="/seen-it" className="flex items-center mr-6 hover:text-white">
              <img src="/src/assets/watched.svg" className="w-12 h-12 mr-2" alt="Seen it" />
              <span>{movie.watched_movies}</span>
            </a>
            <a href="/watchlist" className="flex items-center mr-6 hover:text-white">
              <img src="/src/assets/saved.svg" className="w-12 h-12 mr-2" alt="Watchlist" />
              <span>{movie.saved_movies}</span>
            </a>
            <a href="/MyReviews" className="flex items-center mr-6 hover:text-white">
              <img src="/src/assets/reviewed.svg" className="w-12 h-12 mr-2" alt="My Reviews" />
              <span>{movie.reviews_count}</span>
            </a>
          </div>
        </div>


        {/* center column */}
        <div className="md:col-span-7 order-2 md:order-2 pt-12 pl-16 pr-16 ">
          <p className="text-white font-serif font-extrabold text-5xl border-b-2 border-grey-200 mb-8 pb-8">
            {movie.title}
          </p>
          <div className=" flex justify-between items-center text-grey-200 font-thin text-xl pb-4 mb-4">
            <a className="text-white text-xl underline hover:text-blue">
              {movie.year}
            </a>
            <p>
              Directed by   
              <a className="text-white text-xl underline hover:text-blue ml-2">
                {movie.director.name}
              </a>
            </p>
          </div>
          <p className="font-serif font-medium text-xl mt-4 text-grey-200 ">
            {movie.description}
          </p>
          <div className="border-b-2 border-grey-200 mb-4 pb-8">
            {movie.genres.map((genre) => (
              <button className="bg-grey-500 text-grey-300 rounded-md hover:bg-orange hover:text-white w-28 p-2 m-2 mt-8 ml-0 mr-4">
                <div key={genre.id}>
                  <p>{{genre}.genre}</p>
                </div>
              </button>
            ))}
          </div> 
        </div>

        {/* right column */}

        <div className="md:col-span-2 order-2 md:order-3 pt-12">
          <div className="grid grid-cols-3 md:grid-cols-1 gap-1 order-3">
            <button className="bg-grey-500 text-grey-300 rounded-md hover:bg-yellow hover:text-white p-4 m-2 flex flex-col items-center justify-center w-50
            " onClick={handleFavorite}>
              {isFavorited ? (
                <img src="/src/assets/faved.svg" alt="Favorited" className="w-12 h-12" />
              ) : (
                <img src="/src/assets/fave.svg" alt="Fave" className="w-12 h-12" />
              )}
              <span className="text-center text-sm">{isFavorited ? "Favorited" : "Add to Favorites"}</span>
            </button>

            <button className="bg-grey-500 text-grey-300 rounded-md hover:bg-turquoise hover:text-white p-4 m-2 flex flex-col items-center justify-center w-50
            " onClick={handleWatchedMovies}>
              {isWatched ? (
                <img src="/src/assets/watched.svg" alt="Watched" className="w-12 h-12" />
              ) : (
                <img  src="/src/assets/watch.svg" alt="Watch" className="w-12 h-12" />
              )}
              <span className="text-center text-sm">{isWatched ? "Seen It" : "Haven't Seen It"}</span>
            </button>

            <button className="bg-grey-500 text-grey-300 rounded-md hover:bg-pink hover:text-white p-4 m-2 flex flex-col items-center justify-center w-50
            " onClick={handleSavedMovies}>
              {isSaved ? (
                <img src="/src/assets/saved.svg" alt="Saved" className="w-12 h-12" />
              ) : (
                <img src="/src/assets/save.svg" alt="Save" className="w-12 h-12" />
              )}
              <span className="text-center text-sm">{isSaved ? "On Your Watchlist" : "Add to Watchlist"}</span>
            </button>

            <button className="bg-grey-500 text-grey-300 rounded-md hover:bg-red hover:text-white p-4 m-2 flex flex-col items-center justify-center w-50
            ">
              {isReviewed ? (
                <img src="/src/assets/reviewed.svg" alt="Reviewed" className="w-12 h-12" />
              ) : (
                <img src="/src/assets/review.svg" alt="Review" className="w-12 h-12" />
              )}
              <span className="text-center text-sm">{isReviewed ? "Update Your Review" : "Leave a Review"}</span>
            </button>
          </div>
        </div>
      
      </div>
      

      {/* reviews */}
      <div className ="grid grid-cols-1 md:grid-cols-12 gap-2 pl-16 text-grey mb-32">
        <div className="col-span-3 order-1">
        </div>
        <div className="col-span-9 order-2 mt-24">
          <div className="flex justify-between items-center w-full">
            <p className="text-xl text-grey-200">REVIEWS</p>
            <button className="bg-red text-sm text-white rounded-md hover:bg-grey-500 hover:text-grey-300 p-2 flex items-center justify-center w-30">
              <span>Leave a Review</span>
            </button>
          </div>
          {movie.reviews.map((review) => (
          <div key={review.id} className="grid grid-cols-4 pt-8 mt-4 border-b-2 pb-8 mb-4 border-t-2  border-grey-500 ">
            <div className="col-span-1">

              <a href={`/${review.user}`}>
                <img src={`http://localhost:3000/avatars/${review.avatar}`} alt="Avatar" className="rounded-full w-16 h-16"/>
              </a>
              <p className="text-sm pt-2">review by <br/><a href={`/${review.user}`} className="text-white font-bold"> {review.user}</a></p>
            </div>
            

            <div className="col-span-3">
              <div className="flex items-center">
                <p className="mr-2 text-grey-200">Rating:</p>
                <p className="text-red text-xl">{'★'.repeat(review.rating)}</p>
              </div>
              <p className="text-sm"><i>{new Date(review.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</i></p>
              <br/>
              <p className="text-grey-100 text-lg font-semibold font-sans">{review.title}</p><br/><br/>
              <p className="text-grey-300 text-md font-normal font-serif">{review.content}</p>
            </div>
          </div>
        ))}

        </div>


        </div>

    </div>



        

  );
}
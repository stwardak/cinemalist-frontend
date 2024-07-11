import { Signup } from "./Signup";
import { Login } from "./Login";
import { Logout } from "./Logout";
import { MoviesIndex } from "./MoviesIndex";
import { useEffect, useState } from "react";
import axios from "axios";
import { MoviesShow } from "./MoviesShow";
import { FavoritesIndex } from "./FavoritesIndex";
import { Routes, Route } from "react-router-dom";
import About from "./About";
import { SeenItIndex } from "./SeenItIndex";
import { ProfileShow } from "./ProfileShow";
import { WatchlistIndex } from "./WatchlistIndex";
import { ReviewsShow } from "./ReviewsShow";
import { SearchResults } from "./SearchResults";
import { Members } from "./Members";  


export function Content() {
  const [movies, setMovies] = useState([]);

  const handleIndexMovies = () => {
    axios.get("http://localhost:3000/movies.json")
      .then((response) => {
        setMovies(response.data);
      })
      .catch(error => console.error("Error fetching movies", error));
  };

  useEffect(handleIndexMovies, []);

  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<MoviesIndex movies={movies} />} />
        <Route path="/members" element={<Members />} />
        <Route path="/:user_username" element={<ProfileShow />} />
        <Route path="/movies/:id" element={<MoviesShow />} />
        <Route path="/users/:userId/favorites" element={<FavoritesIndex />} />
        <Route path="/users/:userId/seen-it" element={<SeenItIndex />} />
        <Route path="/users/:userId/watchlist" element={<WatchlistIndex />} />
        <Route path="/users/:userId/reviews" element={<ReviewsShow />} />
        <Route path="/about" element={<About />} />
        <Route path="/search-results" element={<SearchResults />} />
      </Routes>
    </div>
  );
}
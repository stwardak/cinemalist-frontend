import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export function WatchlistIndex() {
  const [savedMovies, setSavedMovies] = useState([]);
  const { userId } = useParams();  // Use userId from URL params
  const loggedInUserId = localStorage.getItem("userId");  // Logged-in user's ID
  const navigate = useNavigate();

  const getSavedMovies = () => {
    const idToUse = userId || loggedInUserId;  // Use URL userId if available, otherwise use logged-in userId
    console.log("getSavedMovies for user:", idToUse);
    axios.get(`http://localhost:3000/users/${idToUse}/watchlist.json`).then(response => {
      console.log(response.data);
      setSavedMovies(response.data);
    });
  };

  useEffect(getSavedMovies, [userId]);

  return (
    <div className="bg-black min-h-screen p-8 justify-center">
     <h1 className="text-center text-4xl text-white font-bold mb-8 justify-center">Watchlist</h1>
       <div className="grid grid-cols-1 md:grid-cols-6 gap-8 justify-center">
         {savedMovies.map((savedMovie) => (
          <div key={savedMovie.id} className="bg-black rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 justify-center">
            <h3 className="text-white text-lg font-semibold p-4 truncate">{savedMovie.movie.title}</h3>
            <button onClick={() => navigate(`/movies/${savedMovie.movie.id}`)} className="focus:outline-none hover:opacity-60 justify-center">
              <img src={savedMovie.movie.image_url} alt={`View details for ${savedMovie.movie.title}`} className="w-full h-96 object-cover"/>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
// import { useEffect, useState } from "react"
// import axios from "axios";
// import { useNavigate } from 'react-router-dom';

// export function WatchlistIndex() {

//   const [savedMovies, setSavedMovies] = useState ([]);
//   const userId = localStorage.getItem("userId");
//   const navigate = useNavigate();

//   const getSavedMovies = () => {
//     console.log("getSavedMovies");
//     axios.get(`http://localhost:3000/users/${userId}/watchlist.json`).then(response => {
//       console.log(response.data);
//       setSavedMovies(response.data);
//     });
//   };

//   useEffect(getSavedMovies, []);


//   return (
//     <div className="bg-black min-h-screen p-8 justify-center">
//       <h1 className="text-center text-4xl text-white font-bold mb-8 justify-center">Watchlist</h1>
//       <div className="grid grid-cols-1 md:grid-cols-6 gap-8 justify-center">
//         {savedMovies.map((savedMovie) => (
//           <div key={savedMovie.id} className="bg-black rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 justify-center">
//             <h3 className="text-white text-lg font-semibold p-4 truncate">{savedMovie.movie.title}</h3>
//             <button onClick={() => navigate(`/movies/${savedMovie.movie.id}`)} className="focus:outline-none hover:opacity-60 justify-center">
//               <img src={savedMovie.movie.image_url} alt={`View details for ${savedMovie.movie.title}`} className="w-full h-96 object-cover"/>
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

//   return (
//     <div>
//       <h1>Watchlist</h1>
//       {savedMovies.map(savedMovie => (
//         <div key={savedMovie.id}>
//           <h3>{savedMovie.movie.title}</h3>
//           <button onClick={() => navigate(`/movies/${savedMovie.movie.id}`)}>
//             <img src={savedMovie.movie.image_url} alt={`View details for ${savedMovie.movie.title}`} className="w-64"/>
//           </button>
//         </div>
//       ))}
//     </div>
//   )
// }
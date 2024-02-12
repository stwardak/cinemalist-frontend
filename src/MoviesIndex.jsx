import { useNavigate } from 'react-router-dom';

export function MoviesIndex(props) {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Movies</h1>
      {props.movies.map((movie) => (
        <button key={movie.id} onClick={() => navigate(`/movies/${movie.id}`)}>
          <img src={movie.image_url} alt={`View details for ${movie.title}`} className= "w-64" />
        </button>
      ))}
    </div>
  );
}

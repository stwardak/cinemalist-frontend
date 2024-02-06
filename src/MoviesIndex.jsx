export function MoviesIndex(props) {
  return (
    <div>
      <h1>Movies</h1>
      {props.movies.map((movie) => (
        <div key = {movie.id}>
          <button onClick={() => props.onShowMovie(movie)}> 
            <img src = {movie.image_url}/>
            {/* click image to show details */}
          </button>
        </div>
      ))}
    </div>
  );
}
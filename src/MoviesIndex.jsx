export function MoviesIndex(props) {
  return (
    <div>
      <h1>Movies</h1>
      {props.movies.map((movie) => (
        <div key = {movie.id}>
          <img src = {movie.image_url}/>
        </div>
      ))}
    </div>
  );
}
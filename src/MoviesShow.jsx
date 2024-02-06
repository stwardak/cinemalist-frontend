export function MoviesShow(props) {
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
    </div>

  );
}
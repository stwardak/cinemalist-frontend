import { useNavigate } from 'react-router-dom';

export function MoviesIndex(props) {
  const navigate = useNavigate();
  return (
    <div>
      <div className="bg-black text-white  content-center mx-24 px-24 my-8 py-8">
        <p className="text-7xl font-bold text-center my-8">Discover Movies You Love.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 justify-items-center px-4 md:px-8">
            {props.movies.map((movie) => (
              <button key={movie.id} onClick={() => navigate(`/movies/${movie.id}`)} className="focus:outline-none">
                <img src={movie.image_url} alt={`View details for ${movie.title}`} className="w-64 h-auto shadow-lg hover:opacity-60 transition-opacity duration-300" />
              </button>
            ))}
          </div>
      </div>
    </div>


  );
}

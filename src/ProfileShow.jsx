import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function ProfileShow() {
  const { user_username } = useParams();
  const userId = localStorage.getItem("userId");  // For current logged-in user actions
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/profiles/${user_username}.json`)
      .then(response => {
        setProfile(response.data);
      })
      .catch(error => console.error("Error fetching profile data", error));
  }, [user_username]);

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="bg-black p-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid-cols-12">
          {/* Profile header */}
          <div className="col-span-4 text-center my-6">
            <p className="text-white text-4xl font-bold mb-4">{profile.user_username}</p>
            <img src={`http://localhost:3000/avatars/${profile.avatar}`} alt="Avatar" className="rounded-full w-24 h-24 mx-auto" />
          </div>

          {/* Profile stats section */}
          <div className="col-span-4 flex justify-center items-center text-white space-x-8 py-4">
            <div className="flex flex-col items-center justify-center border-r border-grey-300 pr-8">
              <span className="text-xl font-semibold font-serif">2,834</span>
              <span className="text-sm text-grey-300 uppercase">Movies</span>
            </div>
            <div className="flex flex-col items-center justify-center border-r border-grey-300 pr-8">
              <span className="text-xl font-semibold font-serif">25</span>
              <span className="text-sm text-grey-300 uppercase">This Year</span>
            </div>
            <div className="flex flex-col items-center justify-center border-r border-grey-300 pr-8">
              <span className="text-xl font-semibold font-serif">26</span>
              <span className="text-sm text-grey-300 uppercase">Following</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-xl font-semibold font-serif">15</span>
              <span className="text-sm text-grey-300 uppercase">Followers</span>
            </div>
          </div>
        </div>

        {/* lists section */}
        <div className="flex justify-center space-x-4 mt-4">
          <a href={`/users/${userId}/favorites`} className="text-grey-300 hover:text-white">
            <img src="/src/assets/faved.svg" className="w-12 h-12 mx-auto" alt="Favorites" />
            <span className="block text-center">{profile.favorites_count} Favorites</span>
          </a>
          <a href={`/users/${userId}/seen-it`} className="text-grey-300 hover:text-white">
            <img src="/src/assets/watched.svg" className="w-12 h-12 mx-auto" alt="Seen it" />
            <span className="block text-center">{profile.watched_movies_count} Watched</span>
          </a>
          <a href={`/users/${userId}/watchlist`} className="text-grey-300 hover:text-white">
            <img src="/src/assets/saved.svg" className="w-12 h-12 mx-auto" alt="Watchlist" />
            <span className="block text-center">{profile.saved_movies_count} Watchlist</span>
          </a>
          <a href={`/users/${userId}/reviews`} className="text-grey-300 hover:text-white">
            <img src="/src/assets/reviewed.svg" className="w-12 h-12 mx-auto" alt="My Reviews" />
            <span className="block text-center">{profile.reviews_count} Reviews</span>
          </a>
        </div>
      </div>

      {/* favorites Section */}
      <div className="px-64 mt-8">
        <h3 className="text-xl font-semibold text-white mb-4">Favorites</h3>
        {profile.favorites.length > 0 ? (
          <Slider {...carouselSettings}>
            {profile.favorites.map((favorite) => (
              <div key={favorite.id} className="p-4">
                <button onClick={() => navigate(`/movies/${favorite.movie_id}`)}>
                  <img src={favorite.image_url} alt={`View details for ${favorite.title}`} className="w-full hover:opacity-60" />
                </button>
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-white">No favorites to display</p>
        )}
      </div>

      <div className="border-b-2 border-white"></div>

      {/* reviews */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2 pl-16 text-grey-300 mb-32">
        <div className="md:col-span-3"></div>
        <div className="md:col-span-6 mt-24">
          <div className="flex justify-between items-center w-full mb-4">
            <h3 className="text-xl font-semibold text-grey-100">{user_username}'s Reviews</h3>
          </div>
          {profile.reviews.map((review) => (
            <div key={review.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-8 mt-4 border-b-2 pb-8 mb-4">
              <div className="md:col-span-1 text-center">
                <button onClick={() => navigate(`/movies/${review.movie_id}`)} className="hover:opacity-60 focus:outline-none">
                  <img src={review.image_url} alt={`View details for ${review.movie_title}`} className="w-64 mx-auto mb-2" />
                </button>
              </div>
              <div className="md:col-span-3">
                <p className="font-serif font-bold text-2xl text-white">{review.movie_title}</p>
                <p className="text-grey-100">{review.movie_year}</p>
                <div className="flex items-center my-2">
                  <p className="mr-2 text-grey-200">Rating:</p>
                  <p className="text-red text-xl">{'★'.repeat(review.rating)}</p>
                </div>
                <p className="text-sm text-grey-300"><i>{new Date(review.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</i></p><br /><br />
                <p className="text-lg font-semibold text-grey-100">{review.title}</p>
                <p className="text-md text-grey-300 mt-2 font-serif">{review.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
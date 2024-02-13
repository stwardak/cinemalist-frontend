import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';




export function ProfileShow() {
  const {user_username} = useParams();
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/profiles/${user_username}.json`)
    .then(response => {
      setProfile(response.data);
    })
    .catch(error => console.error("Error fetching profile data", error));
  }, [user_username]);

  if (!profile) return <div>Loading...</div>;

  return(
    <div>
      <p>Profile</p>
      <p>{profile.user_username}</p>
      <img src={`http://localhost:3000/avatars/${profile.avatar}`} alt="Avatar" className="rounded-full"/>
      <div>
      <p>★ {profile.favorites_count} </p>
      <p>✓ {profile.watched_movies_count} </p>
      <p>☰ {profile.saved_movies_count} </p>
      <p>✎ {profile.reviews_count} </p>
      </div>

      <div>
        {/* placeholders for followers (will link to followers show and following show) */}
        <button className="bg-yellow p-2 m-2">123 Followers</button> | <button className="bg-yellow p-2 m-2">344 Following</button> | <button className="bg-yellow p-2 m-2"> Follow</button>
      </div>

      <div>
        <h3>Favorites</h3>
        {profile.favorites.map((favorite) => 
          (
          <div key={favorite.id}>
            <button onClick={() => navigate(`/movies/${favorite.movie_id}`)}>
              <img src={favorite.image_url} alt={`View details for ${favorite.title}`} className="w-64"/>
            </button>
          </div>
          )
          )}
      </div>
      <div className="border-b-2 border-white"></div>

      {/* reviews */}
      <div>
          <h3 className="p-2 m-2">{user_username}'s reviews</h3>
          
          {profile.reviews.map((review) => (
          <div key={review.id} className="p-2 m-2">
            <button onClick={() => navigate(`/movies/${review.movie_id}`)}>
              <img src={review.image_url} alt={`View details for ${review.movie_title}`} className="w-64"/>
            </button>
            <p className= "font-serif font-bold text-2xl">{review.movie_title}</p>
            <p>{review.movie_year}</p>
          
            <p>Rating: {review.rating} Stars</p>
            <p>{review.title}</p>
            <p>{new Date(review.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p>{review.content}</p>
            <div className="border-b-2 border-black"></div>
          </div>
          ))
          }

        </div>
    </div>
  );
}

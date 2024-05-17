import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export function ReviewsShow() {
  const [reviews, setReviews] = useState([]);
  const { userId } = useParams();
  const loggedInUserId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const getReviews = () => {
    const idToUse = userId || loggedInUserId;
    console.log("getReviews for user:", idToUse);
    axios.get(`http://localhost:3000/users/${idToUse}/reviews.json`).then(response => {
      console.log("Response data:", response.data);
      setReviews(response.data);
    });
  };

  useEffect(getReviews, [userId]);

  return (
    <div>
      <h1>Reviews</h1>
      {reviews.map(review => (
        <div key={review.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-8 mt-4 border-b-2 pb-8 mb-4">
          <div className="md:col-span-1 text-center">
            <button onClick={() => navigate(`/movies/${review.movie_id}`)} className="hover:opacity-60 focus:outline-none">
              <img src={review.image_url || "default_image_path.jpg"} alt={`View details for ${review.movie_title}`} className="w-64 mx-auto mb-2" />
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
  );
}

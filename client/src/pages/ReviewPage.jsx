// displays both artwork and artist reviews. uses branching to determine type and display correct fields

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLocation, useParams, useNavigate } from "react-router";
import { getArtworkReviewById, editArtworkReviewById, deleteArtworkReviewById } from "../services/ArtworkReviewService";
import { getArtistReviewById, editArtistReviewById, deleteArtistReviewById } from "../services/ArtistReviewService";

import backIcon from "../styles/icons/arrow-left-circle.svg"
import backFillIcon from "../styles/icons/arrow-left-circle-fill.svg"
import pencilIcon from "../styles/icons/pencil.svg"
import pencilFillIcon from "../styles/icons/pencil-fill.svg"
import bookmarkIcon from "../styles/icons/bookmark-plus.svg"
import bookmarkFillIcon from "../styles/icons/bookmark-plus-fill.svg"
import AddToCollectionModal from "../components/AddToCollectionModal";

export default function ReviewPage() {
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddToCollection, setShowAddToCollection] = useState(false);
  const [addedMsg, setAddedMsg] = useState('');
  
  const { id } = useParams();
  const location = useLocation();
  const { token } = useAuth();
  const navigate = useNavigate();
  
  const reviewType = location.pathname.startsWith("/artwork-reviews") ? "artwork" : "artist";

  // pick the right service functions based on type, once per render
  const api = reviewType === "artwork"
    ? { get: getArtworkReviewById, edit: editArtworkReviewById, remove: deleteArtworkReviewById }
    : { get: getArtistReviewById, edit: editArtistReviewById, remove: deleteArtistReviewById };

  useEffect(() => {
    setLoading(true);
    setError('');

    api.get(id, token)
      .then((data) => setReview(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, token, reviewType]);

  async function handleDelete() {
    if (!window.confirm("Delete this review? This can't be undone.")) return;

    try {
      await api.remove(id, token);
      navigate(-1);
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <p>Loading review...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!review) return null;

  // the one real difference: artwork has title/artist, artist review has just name
  const heading = reviewType === "artwork" ? review.title : review.name;

  return (
    <div className="review-page">
      <div className="review-page-topbar">
        <button className="icon-button" onClick={() => navigate(-1)}>
          {/* add both icons */}
          <img src={backIcon} alt="Back" />
        </button>
        <div className="d-flex gap-2">
          <button className="icon-button" onClick={() => setShowAddToCollection(true)}>
            <img src={bookmarkIcon} alt="Add to collection" />
          </button>
          <button className="icon-button" onClick={() => {/* open edit modal */ }}>
            {/* add both icons */}
            <img src={pencilIcon} alt="Edit" />
          </button>
          {/* <button className="icon-button" onClick={handleDelete}>
            <img src={trashIcon} alt="Delete" />
          </button> */}
        </div>
      </div>

      <img className="review-image" src={review.item_img} alt={`${heading} image`} />

      <h1>{heading}</h1>
      {reviewType === "artwork" && review.artist && <p className="review-artist">{review.artist}</p>}
      {reviewType === "artwork" && review.date_completed && <p className="review-date">{review.date_completed}</p>}

      <p className="review-description">{review.description}</p>
      <p className="review-reason"><strong>Why I liked it:</strong> {review.reason_for_liking}</p>
      <p className="review-location"><strong>Where I saw it:</strong> {review.location_viewed}</p>

      {addedMsg && <p className="success-message">{addedMsg}</p>}

      {showAddToCollection && (
        <AddToCollectionModal
          reviewId={id}
          reviewType={reviewType}
          onClose={() => setShowAddToCollection(false)}
          onAdded={() => {
            setAddedMsg("Added to collection!");
            setShowAddToCollection(false);
            setTimeout(() => setAddedMsg(''), 3000);
          }}
        />
      )}
    </div>
  );
}
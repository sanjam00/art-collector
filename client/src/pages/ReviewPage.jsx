// displays both artwork and artist reviews. uses branching to determine type and display correct fields

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLocation, useParams, useNavigate } from "react-router";
import { getArtworkReviewById, editArtworkReviewById, deleteArtworkReviewById } from "../services/ArtworkReviewService";
import { getArtistReviewById, editArtistReviewById, deleteArtistReviewById } from "../services/ArtistReviewService";
import EditArtistReviewModal from "../components/EditArtistReviewModal";
import EditArtworkReviewModal from "../components/EditArtworkReviewModal";
import AddToCollectionModal from "../components/AddToCollectionModal";
import "../styles/ReviewPage.css"

import coverArtPlaceholder from "../styles/icons/cover-art-placeholder.svg"
import backIcon from "../styles/icons/arrow-left-circle.svg"
import backFillIcon from "../styles/icons/arrow-left-circle-fill.svg"
import pencilIcon from "../styles/icons/pencil.svg"
import pencilFillIcon from "../styles/icons/pencil-fill.svg"
import bookmarkIcon from "../styles/icons/bookmark-plus.svg"
import bookmarkFillIcon from "../styles/icons/bookmark-plus-fill.svg"
import locationIcon from "../styles/icons/geo-alt.svg"
import trashIcon from "../styles/icons/trash3.svg"
import trashFillIcon from "../styles/icons/trash3-fill.svg"

export default function ReviewPage() {
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddToCollection, setShowAddToCollection] = useState(false);
  const [addedMsg, setAddedMsg] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  
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
        <button className="icon-hover" type="button" onClick={() => navigate(-1)}>
          <img className="icon-default" src={backIcon} alt="Back" />
          <img className="icon-hover-state" src={backFillIcon} alt="Back" />
        </button>
        <div className="d-flex gap-4">
          <button className="icon-hover" type="button" onClick={() => setShowAddToCollection(true)}>
            <img className="icon-default" src={bookmarkIcon} alt="Add to collection" />
            <img className="icon-hover-state" src={bookmarkFillIcon} alt="Add to collection" />
          </button>
          <button className="icon-hover" type="button" onClick={() => setShowEditModal(true)}>
            <img className="icon-default" src={pencilIcon} alt="Edit" />
            <img className="icon-hover-state" src={pencilFillIcon} alt="Edit" />
          </button>
          <button className="icon-hover" onClick={handleDelete}>
            <img className="icon-default" src={trashIcon} alt="Delete" />
            <img className="icon-hover-state" src={trashFillIcon} alt="Delete" />
          </button>
        </div>
      </div>

      <div className="review-image-wrapper">
        <img 
          className="review-image" 
          src={review.item_img || coverArtPlaceholder} 
          alt={`${heading} cover`} 
        />
      </div>

      <div className="review-row review-row-title">
        <h1 className="review-heading">{heading}</h1>
        {reviewType === "artwork" && review.date_completed && (
          <span className="review-date">{review.date_completed}</span>
        )}
      </div>

      <div className="review-row review-row-meta">
        {reviewType === "artwork" && review.artist && (
          <span className="review-artist">{review.artist}</span>
        )}
        {review.location_viewed && (
          <span className="review-location">
            <img className="pin-icon" src={locationIcon} alt="location" />
            {review.location_viewed}
          </span>
        )}
      </div>

      {/* conditional rendering to avoid blank block of color */}
      {review.description && (
        <p className="review-description">{review.description}</p>
      )}
      {review.reason_for_liking && (
        <p className="review-reason"><strong>Why I liked it:</strong> {review.reason_for_liking}</p>
      )}
      {/* <p className="review-location"><strong>Where I saw it:</strong> {review.location_viewed}</p> */}

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

      {showEditModal && reviewType === "artwork" && (
        <EditArtworkReviewModal
          review={review}
          onClose={() => setShowEditModal(false)}
          onSaved={(updated) => {
            setReview(updated);
            setShowEditModal(false);
          }}
        />
      )}

      {showEditModal && reviewType === "artist" && (
        <EditArtistReviewModal
          review={review}
          onClose={() => setShowEditModal(false)}
          onSaved={(updated) => {
            setReview(updated);
            setShowEditModal(false);
          }}
        />
      )}
    </div>
  );
}
// combine artwork reviews and artist reviews into one grid, meshed together instead of separate

import { useNavigate } from "react-router";
import { useState } from "react";
import "../styles/ReviewGrid.css"

import coverArtPlaceholder from "../styles/icons/cover-art-placeholder.svg"
import bookmarkDashIcon from "../styles/icons/bookmark-dash.svg"
import bookmarkDashFillIcon from "../styles/icons/bookmark-dash-fill.svg"
import { useAuth } from "../context/AuthContext";
import { unlinkArtworkReviewFromCollection } from "../services/ArtworkCollectionLinkService";
import { unlinkArtistReviewFromCollection } from "../services/ArtistCollectionLinkService";

export default function ReviewGrid({ artworkReviews = [], artistReviews = [], collectionId, onRemoved }) {
  const [removingId, setRemovingId] = useState(null)
  const [error, setError] = useState('');
  
  const { token } = useAuth();
  const navigate = useNavigate();

  const combined = [
    ...artworkReviews.map((r) => ({ ...r, reviewType: 'artwork' })),
    ...artistReviews.map((r) => ({ ...r, reviewType: 'artist' })),
  ];

  if (combined.length === 0) {
    return <p>No reviews in this collection yet.</p>;
  }

  function handleReviewClick(review){
    const path = review.reviewType == 'artwork'
      ? `/artwork-reviews/${review.id}`
      : `/artist-reviews/${review.id}`;
    navigate(path)
  }

  async function handleRemove(e, review) {
    e.stopPropagation();
    setRemovingId(review.id);
    setError('');

    if (!window.confirm("Remove this review?")) return;

    try {
      const unlink = review.reviewType === "artwork"
        ? unlinkArtworkReviewFromCollection
        : unlinkArtistReviewFromCollection;
      await unlink(collectionId, review.id, token);
      onRemoved(review.id, review.reviewType);
    } catch (err) {
      setError(err.message);
    } finally {
      setRemovingId(null);
    }
  }

  return (
    <div className="review-grid">
      {error && <p className="error-message">{error}</p>}

      {combined.map((review) => (
        <div key={`${review.reviewType}-${review.id}`} className="review-item">
          <div className="card" onClick={() => handleReviewClick(review)}>
            <button
              className="icon-hover remove-review-btn"
              type="button"
              onClick={(e) => handleRemove(e, review)}
              disabled={removingId === review.id}
            >
              <img className="icon-default" src={bookmarkDashIcon} alt="Remove from collection" />
              <img className="icon-hover-state" src={bookmarkDashFillIcon} alt="Remove from collection" />
            </button>

            <img
              className="card-img-top"
              src={review.item_img || coverArtPlaceholder}
              alt={`${review.reviewType === 'artwork' ? review.title : review.name} image`}
            />
            <div className="card-body">
              <p className="review-title">
                {review.reviewType === 'artwork' ? review.title : review.name}
              </p>
              {review.reviewType === 'artwork' && review.artist && (
                <p className="review-subtitle">{review.artist}</p>
              )}
              <span className={`review-type-badge ${review.reviewType}`}>
                {review.reviewType === 'artwork' ? 'Artwork' : 'Artist'}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
// combine artwork reviews and artist reviews into one grid, meshed together instead of separate

import { useNavigate } from "react-router";

import coverArtPlaceholder from "../styles/icons/cover-art-placeholder.svg"

export default function ReviewGrid({ artworkReviews = [], artistReviews = [] }) {
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

  return (
    <div className="review-grid">
      {combined.map((review) => (
        <div key={`${review.reviewType}-${review.id}`} className="review-item">
          <div className="card" onClick={() => handleReviewClick(review)}>
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
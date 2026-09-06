
export default function ReviewGrid({ artworkReviews = [], artistReviews = [] }) {
  const combined = [
    ...artworkReviews.map((r) => ({ ...r, reviewType: 'artwork' })),
    ...artistReviews.map((r) => ({ ...r, reviewType: 'artist' })),
  ];

  if (combined.length === 0) {
    return <p>No reviews in this collection yet.</p>;
  }

  return (
    <div className="review-grid">
      {combined.map((review) => (
        <div key={`${review.reviewType}-${review.id}`} className="review-item">
          <div className="card">
            <img
              className="card-img-top"
              src={review.item_img}
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
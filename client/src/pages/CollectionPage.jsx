import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getCollectionById } from "../services/CollectionService";
import { useNavigate, useParams } from "react-router";

import "../styles/CollectionPage.css"
import ReviewGrid from "../components/ReviewGrid";
import EditCollectionModal from "../components/EditCollectionModal";

import coverArtPlaceholder from "../styles/icons/cover-art-placeholder.svg"
import lockIcon from "../styles/icons/lock.svg"
import globeIcon from "../styles/icons/globe2.svg"
import backIcon from "../styles/icons/arrow-left-circle.svg"
import backFillIcon from "../styles/icons/arrow-left-circle-fill.svg"
import pencilIcon from "../styles/icons/pencil.svg"
import pencilFillIcon from "../styles/icons/pencil-fill.svg"

export default function CollectionPage(){
  const [collectionData, setCollectionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);

  const { collection_id } = useParams(); // grabs id from /collections/collecion_id
  const {token} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true)
    setError('');

    getCollectionById(collection_id, token)
    .then((data) => {
      setCollectionData(data)
      console.log(data)
    })
    .catch(err => setError(err.message))
    .finally(() => setLoading(false))
  }, [collection_id, token])

  function handleReviewRemoved(reviewId, reviewType) {
    setCollectionData((prev) => ({
      ...prev,
      artwork_reviews: reviewType === "artwork"
        ? prev.artwork_reviews.filter((r) => r.id !== reviewId)
        : prev.artwork_reviews,
      artist_reviews: reviewType === "artist"
        ? prev.artist_reviews.filter((r) => r.id !== reviewId)
        : prev.artist_reviews,
    }));
  }

  if (loading) return <p>Loading collection...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!collectionData) return null;

  return (
    <div className="collection-page">
      <div className="collection-page-topbar">
        <button className="icon-hover" type="button" onClick={() => navigate(-1)}>
          <img className="bi bi-arrow-left-circle icon-default" src={backIcon} alt="Back" />
          <img className="bi bi-arrow-left-circle icon-hover-state" src={backFillIcon} alt="Back" />
        </button>
        <button className="icon-hover" type="button" onClick={() => setShowEditModal(true)}>
          <img className="icon-default" src={pencilIcon} alt="Edit collection" />
          <img className="icon-hover-state" src={pencilFillIcon} alt="Edit collection" />
        </button>
      </div>

      <div className="collection-header">
        <div className="collection-header-top">
          {/* need to render the first image from a review if available */}
          <img 
            className="collection-header-img" 
            src={collectionData.collection_img || coverArtPlaceholder} 
            alt={`${collectionData.title} cover`}
          />

          <div className="collection-header-text">
            <h1 className="collection-title">{collectionData.title}</h1>
            <p className="collection-description">{collectionData.description}</p>
          </div>
        </div>
        
        <div className="collection-meta">
          <p className="collection-owner">Created by: {collectionData.username}</p>
          {/* conditionally render a lock = private || globe = public */}
          <div className="collection-visibility" >
            <img 
              className={collectionData.is_public ? "bi bi-globe2" : "bi bi-lock"} 
              src={collectionData.is_public ? globeIcon : lockIcon} 
              alt={collectionData.is_public ? "Public" : "Private"}
            />
            <span>{collectionData.is_public ? "Public" : "Private"}</span>
          </div>
        </div>

      </div>

      <div className="divider-bar" />

      <ReviewGrid
        artworkReviews={collectionData.artwork_reviews}
        artistReviews={collectionData.artist_reviews}
        collectionId={collection_id}
        onRemoved={handleReviewRemoved}
      />

      {showEditModal && (
        <EditCollectionModal
          collection={collectionData}
          onClose={() => setShowEditModal(false)}
          onSaved={(updated) => {
            setCollectionData(updated);
            setShowEditModal(false);
          }}
          onDeleted={() => navigate('/my-collections')}
        />
      )}      
    </div>
  )
}
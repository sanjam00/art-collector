import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getCollectionById } from "../services/CollectionService";
import { useParams } from "react-router";

import coverArtPlaceholder from "../styles/icons/cover-art-placeholder.svg"
import lockIcon from "../styles/icons/lock.svg"
import globeIcon from "../styles/icons/globe2.svg"

export default function CollectionPage(){
  const [collectionData, setCollectionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { collection_id } = useParams(); // grabs id from /collections/collecion_id
  const {token} = useAuth();

  useEffect(() => {
    setLoading(true)
    setError('');

    getCollectionById(collection_id, token)
    .then((data) => {
      setCollectionData(data)
      console.log(data)
    })
    .catch(err => setError(err))
    .finally(() => setLoading(false))
  }, [collection_id, token])

  if (loading) return <p>Loading collection...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!collectionData) return null;

  return (
    <div>
      <div className="collection-header">
        {/* need to render the first image from a review if available */}
        <img src={collectionData.collection_img || coverArtPlaceholder} />
        <h1>{collectionData.title}</h1>
        <p>{collectionData.description}</p>
        <p>{collectionData.username}</p>
        {/* conditionally render a lock = private || globe = public */}
        <img 
          className={collectionData.is_public ? "bi bi-globe2" : "bi bi-lock"} 
          src={collectionData.is_public ? globeIcon : lockIcon} 
        />

      </div>

      <div className="collection-items">
        {/* map through reviews, style similarly to homefeed collections */}
      </div>
    </div>
  )
}
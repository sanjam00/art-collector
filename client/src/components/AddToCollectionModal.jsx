// add an existing review to an existing collection

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMyCollections } from "../services/CollectionService";
import { linkArtworkReviewToCollection } from "../services/ArtworkCollectionLinkService";
import { linkArtistReviewToCollection } from "../services/ArtistCollectionLinkService";
import BottomSheet from "./BottomSheet";
import ListGroup from "react-bootstrap/ListGroup";

export default function AddToCollectionModal({ reviewId, reviewType, onClose, onAdded }) {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addingId, setAddingId] = useState(null); // tracks which collection is mid-request
  
  const { token } = useAuth();
  
  useEffect(() => {
    getMyCollections(token, { per_page: 50 }) // small app, fine to fetch a big page rather than paginate this picker
      .then((data) => setCollections(data.collections))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  async function handleAdd(collectionId) {
    setAddingId(collectionId);
    setError('');

    try {
      const linkFn = reviewType === "artwork" ? linkArtworkReviewToCollection : linkArtistReviewToCollection;
      await linkFn(collectionId, reviewId, token);
      onAdded(collectionId);
    } catch (err) {
      setError(err.message);
    } finally {
      setAddingId(null);
    }
  }

  return (
    <BottomSheet isOpen={true} onClose={onClose} title="Add to collection">
      {loading && <p>Loading your collections...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && collections.length === 0 && (
        <p>You don't have any collections yet.</p>
      )}

      <ListGroup variant="flush">
        {collections.map((c) => (
          <ListGroup.Item
            key={c.id}
            action
            onClick={() => handleAdd(c.id)}
            disabled={addingId === c.id}
          >
            {c.title} {addingId === c.id && "..."}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </BottomSheet>
  );
}
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getCollectionFeed } from "../services/CollectionService";

export default function HomeFeed(){
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    getCollectionFeed(token)
    .then((data) => setCollections(data.collections))
    .catch((err) => setError(err.message))
    .finally(() => setLoading(false));
  }, [token])

  return (
    <div className="homeFeed">
      {loading && <p>Loading collections...</p>}
      {error && <p>{error}</p>}
      <ul>
        {collections.map((c) => (
          <div className="collecCard">
            <li key={c.id}>{c.title}</li>
          </div>
        ))}
      </ul>
    </div>
  )
}
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getCollectionById } from "../services/CollectionService";
import { useParams } from "react-router";

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
      <h1>{collectionData.title}</h1>
    </div>
  )
}
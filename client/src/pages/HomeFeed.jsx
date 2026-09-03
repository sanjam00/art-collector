import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getCollectionFeed } from "../services/CollectionService";
import { useNavigate } from "react-router";
import "../styles/HomeFeed.css"

export default function HomeFeed(){
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getCollectionFeed(token)
    .then((data) => {
      setCollections(data.collections) 
      console.log(data)
    })
    .catch((err) => setError(err.message))
    .finally(() => setLoading(false));
  }, [token])

  function handleNavigate(collecData){
    navigate(`/collections/${collecData.id}`)
  }

  // add bootstap classes
  return (
    <div className="home-feed">
      {loading && <p>Loading collections...</p>}
      {error && <p>{error}</p>}

      <div className="collection-grid">
        {collections.map((c) => (
        <div className="collection-item" onClick={() => handleNavigate(c)}>
          <div className="card">
            <img className="card-img-top" src={c.collection_img} alt={c.title + "Image"} />
            <p key={c.id} className="card-body">{c.title}</p>
          </div>
        </div>
      ))}
      </div>
    </div>
  )
}
// when user clicks on profile icon, directs them here. (model 1)

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMyCollections } from "../services/CollectionService";
import { useNavigate } from "react-router";

import ProfileHeader from "../components/ProfileHeader";
import CollectionSearchSort from "../components/CollectionSearchSort";
import CollectionGrid from "../components/CollectionGrid";
import EditProfileModal from "../components/EditProfileModal";

export default function MyCollectionsPage() {
  const [collections, setCollections] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [page, setPage] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showEditProfile, setShowEditProfile] = useState(false); // can add this depending on desired flow

  const { user, setUser, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError('');

    getMyCollections(token, {search, sort, page})
    .then((data) => {
      setCollections(data.collections);
      setTotalPages(data.total_pages)
      console.log(data)
    })
    .catch((err) => setError(err.message))
    .finally(() => setLoading(false));
  }, [token, search, sort, page])

  function handleSearchChange(value) {
    setSearch(value);
    setPage(1); // reset to page 1 whenever the search changes
  }

  function handleSortChange(value) {
    setSort(value);
    setPage(1);
  }

  function handleCollectionClick(collection) {
    navigate(`/collections/${collection.id}`);
  }

  // add bootstrap classes
  return (
    <div>
      <ProfileHeader user={user} onEditClick={() => setShowEditProfile(true)} />

      <CollectionSearchSort
        search={search}
        sort={sort}
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
      />

      { error && <p className="error-message">{error}</p> }

      <CollectionGrid
        collections={collections}
        loading={loading}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        onCollectionClick={handleCollectionClick}
      />

      {
        showEditProfile && (
          <EditProfileModal
            user={user}
            onClose={() => setShowEditProfile(false)}
            onSaved={(updatedUser) => {
              setUser(updatedUser);
              setShowEditProfile(false);
            }}
          />
        )
      }
    </div >
  );

}
// when user clicks on profile icon, directs them here. (model 1)

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMyCollections } from "../services/CollectionService";
import { useNavigate, useSearchParams } from "react-router";
import Tabs from "react-bootstrap/Tabs"
import Tab from "react-bootstrap/Tab"

import ProfileHeader from "../components/ProfileHeader";
import CollectionSearchSort from "../components/CollectionSearchSort";
import CollectionGrid from "../components/CollectionGrid";
import EditProfileModal from "../components/EditProfileModal";
import { getArtistReview } from "../services/ArtistReviewService";
import { getArtworkReview } from "../services/ArtworkReviewService";

import "../styles/MyCollectionsPage.css"
import ReviewGrid from "../components/ReviewGrid";

export default function MyCollectionsPage() {
  const [collections, setCollections] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [page, setPage] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showEditProfile, setShowEditProfile] = useState(false);

  const [artworkReviews, setArtworkReviews] = useState([]);
  const [artistReviews, setArtistReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewsError, setReviewsError] = useState('');

  // directs user to last active tab when back button is clicked
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'collections';

  const { user, setUser, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // if the activeTab is not collections, this function ends
    if (activeTab !== 'collections') return;

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
  }, [token, search, sort, page, activeTab])

  useEffect(() => {
    if (activeTab === 'collections') return;

    setReviewsLoading(true);
    setReviewsError('');
    
    const fetchFn = activeTab === 'artworks' ? getArtworkReview : getArtistReview;

    fetchFn(token)
    .then((data) => {
      console.log(data)
      if (activeTab === 'artworks') setArtworkReviews(data.reviews)
      else setArtistReviews(data.reviews)
    })
    .catch((err) => setReviewsError(err.message))
    .finally (() => setReviewsLoading(false))
  }, [token, activeTab])

  function handleTabSelect(key) {
    setSearchParams({ tab: key }, { replace: true });
  }

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
    <div className="my-collections-page">
      <ProfileHeader user={user} onEditClick={() => setShowEditProfile(true)} />

      <div className="divider-bar" />

      { error && <p className="error-message">{error}</p> }

      <Tabs
        className="my-collections-tabs mb-3"
        activeKey={activeTab}
        onSelect={handleTabSelect}
      >
        <Tab eventKey="collections" title="Collections" >
          <CollectionSearchSort
            search={search}
            sort={sort}
            onSearchChange={handleSearchChange}
            onSortChange={handleSortChange}
            />

          <CollectionGrid
            collections={collections}
            loading={loading}
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            onCollectionClick={handleCollectionClick}
            />
        </Tab>

        <Tab eventKey="artworks" title="Artwork Reviews">
          {reviewsError && <p className="error-message">{reviewsError}</p>}
          {reviewsLoading ? (
            <p>Loading reviews...</p>
          ) : (
            <ReviewGrid artworkReviews={artworkReviews} artistReviews={[]} />
          )}
        </Tab>

        <Tab eventKey="artist" title="Artist Reviews">
          {reviewsError && <p className="error-message">{reviewsError}</p>}
          {reviewsLoading ? (
            <p>Loading reviews...</p>
          ) : (
            <ReviewGrid artworkReviews={[]} artistReviews={artistReviews} />
          )}
        </Tab>
      </Tabs>

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
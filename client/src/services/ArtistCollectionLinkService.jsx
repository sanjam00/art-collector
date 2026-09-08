// links artist reviews to a collection

// services/ArtistCollectionLinkService.js
import { apiFetch } from "../api/api";

export function linkArtistReviewToCollection(collectionId, artistReviewId, token) {
  return apiFetch(`/collections/${collectionId}/artist-reviews/${artistReviewId}`, token, {
    method: 'POST',
  });
}

export function unlinkArtistReviewFromCollection(collectionId, artistReviewId, token) {
  return apiFetch(`/collections/${collectionId}/artist-reviews/${artistReviewId}`, token, {
    method: 'DELETE',
  });
}
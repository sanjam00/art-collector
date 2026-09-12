// links artwork reviews to a collection

// services/ArtworkCollectionLinkService.js
import { apiFetch } from "../api/api";

export function linkArtworkReviewToCollection(collectionId, artworkReviewId, token) {
  return apiFetch(`/collections/${collectionId}/artwork-reviews/${artworkReviewId}`, token, {
    method: 'POST',
  });
}

export function unlinkArtworkReviewFromCollection(collectionId, artworkReviewId, token) {
  return apiFetch(`/collections/${collectionId}/artwork-reviews/${artworkReviewId}`, token, {
    method: 'DELETE',
  });
}
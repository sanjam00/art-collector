// one function per route

import { apiFetch } from "../api/api";


// ArtworkReviewIndex

// needs params due to sort/filter
export function getArtworkReview (params = {}, token) {
  const query = new URLSearchParams(params).toString();
  return apiFetch(`/artwork-reviews?${query}`, token);
}

export function createArtworkReview( token, {title, artist, date_completed, description, item_img, reason_for_liking, location_viewed} ) {
  return apiFetch(`/artwork-reviews`, token, {
    method: 'POST',
    body: JSON.stringify({ 
      title, artist, date_completed, description, item_img, reason_for_liking, location_viewed
    }),
  })
}

// ArtworkReviewById
export function getArtworkReviewById ( id, token ) {
  return apiFetch(`/artwork-reviews/${id}`, token)
}

export function editArtworkReviewById( id, token, updates ) {
  return apiFetch(`/artwork-reviews/${id}`, token, {
    method: 'PATCH',
    body: JSON.stringify( updates )
  })
}

export function deleteArtworkReviewById(id, token) {
  return apiFetch(`/artwork-reviews/${id}`, token, {
    method: 'DELETE',
  })
}
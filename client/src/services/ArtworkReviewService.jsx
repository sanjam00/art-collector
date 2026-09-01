// one function per route

import { apiFetch } from "../api/api";


// ArtworkReviewIndex

// needs params due to sort/filter
export function getArtworkReview (params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiFetch(`/artwork-reviews?${query}`);
}

export function createArtworkReview( token, title, artist, date_completed, description, item_img, reason_for_liking, location_viewed ) {
  return apiFetch(`/artwork-reviews`, token, {
    method: 'POST',
    body: JSON.stringify({ 
      title, artist, date_completed, description, item_img, reason_for_liking, location_viewed
    }),
  })
}

// ArtworkReviewById
export function getArtworkReviewById ( id ) {
  return apiFetch(`/artwork-reviews/${id}`)
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
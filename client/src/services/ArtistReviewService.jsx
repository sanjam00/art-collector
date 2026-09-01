// one function per route

import { apiFetch } from "../api/api";


// ArtistReviewIndex

// needs params due to sort/filter
export function getArtistReview (params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiFetch(`/artist-reviews?${query}`);
}

export function createArtistReview( token, name, description, item_img, reason_for_liking, location_viewed ) {
  return apiFetch(`/artist-reviews`, token, {
    method: 'POST',
    body: JSON.stringify({ 
      name, description, item_img, reason_for_liking, location_viewed
    }),
  })
}

// ArtistReviewById
export function getArtistReviewById ( id ) {
  return apiFetch(`/artist-reviews/${id}`)
}

export function editArtistReviewById(id, token, updates ) {
  return apiFetch(`/artist-reviews/${id}`, token, {
    method: 'PATCH',
    body: JSON.stringify( updates )
  })
}

export function deleteArtistReviewById ( id, token ) {
  return apiFetch(`/artist-reviews/${id}`, token, {
    method: 'DELETE',
  })
}
// one function per route

import { apiFetch } from "../api/api";


// ArtistReviewIndex

// needs params due to sort/filter
export function getArtistReview (params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiFetch(`/artist-reviews?${query}`);
}

export function createArtistReview(name, description, item_img, reason_for_liking, location_viewed ) {
  return apiFetch(`/artist-reviews`, {
    method: 'POST',
    body: JSON.stringify({ 
      name: name,
      description: description,
      item_img: item_img,
      reason_for_liking: reason_for_liking,
      location_viewed: location_viewed,
    }),
  })
}

// ArtistReviewById
export function getArtistReviewById ( id ) {
  return apiFetch(`/artist-reviews/${id}`)
}

export function editArtistReviewById ( id, updates ) {
  return apiFetch(`/artist-reviews/${id}`, {
    method: 'PATCH',
    body: JSON.stringify( updates )
  })
}

export function deleteArtistReviewById ( id ) {
  return apiFetch(`/artist-reviews/${id}`, {
    method: 'DELETE',
  })
}
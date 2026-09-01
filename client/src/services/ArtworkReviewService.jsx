// one function per route

import { apiFetch } from "../api/api";


// ArtworkReviewIndex

// needs params due to sort/filter
export function getArtworkReview (params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiFetch(`/artwork-reviews?${query}`);
}

export function createArtworkReview ( title, artist, date_completed, description, item_img, reason_for_liking, location_viewed ) {
  return apiFetch(`/artwork-reviews`, {
    method: 'POST',
    body: JSON.stringify({ 
      title: title,
      artist: artist,
      date_completed: date_completed, 
      description: description,
      item_img: item_img,
      reason_for_liking: reason_for_liking,
      location_viewed: location_viewed,
    }),
  })
}

// ArtworkReviewById
export function getArtworkReviewById ( id ) {
  return apiFetch(`/artwork-reviews/${id}`)
}

export function editArtworkReviewById ( id, updates ) {
  return apiFetch(`/artwork-reviews/${id}`, {
    method: 'PATCH',
    body: JSON.stringify( updates )
  })
}

export function deleteArtworkReviewById ( id ) {
  return apiFetch(`/artwork-reviews/${id}`, {
    method: 'DELETE',
  })
}
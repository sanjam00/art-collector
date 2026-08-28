// one function per route

import { apiFetch } from "../api/api";

// UserCollectionIndex
export function getMyCollections(params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiFetch(`/collections?${query}`);
}

export function createCollection(title) {
  return apiFetch('/collections', {
    method: 'POST',
    body: JSON.stringify({ title }),
  });
}

// CollectionById
export function getCollectionById(id) {
  return apiFetch(`/collections/${id}`);
}

export function editCollection(id, updates) {
  return apiFetch(`/collections/${id}`, {
    method: 'PATCH',
    body: JSON.stringify( updates ),
  });
}

export function deleteCollection(id) {
  return apiFetch(`/collections/${id}`, {
    method: 'DELETE'
  });
}
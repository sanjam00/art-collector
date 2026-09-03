// one function per route

import { apiFetch } from "../api/api";

// CollectionFeed

// no params bc no sort/filter for the MVP
export function getCollectionFeed(token) {
  return apiFetch(`/home`, token, {methods: 'GET' });
}

// UserCollectionIndex

// needs params due to sort/filter
export function getMyCollections(params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiFetch(`/collections?${query}`);
}

export function createCollection(token, title) {
  return apiFetch('/collections', token, {
    method: 'POST',
    body: JSON.stringify({ title }),
  });
}

// CollectionById
export function getCollectionById(id) {
  return apiFetch(`/collections/${id}`);
}

export function editCollection(id, token, updates) {
  return apiFetch(`/collections/${id}`, token, {
    method: 'PATCH',
    body: JSON.stringify( updates ),
  });
}

export function deleteCollection(id, token) {
  return apiFetch(`/collections/${id}`, token, {
    method: 'DELETE'
  });
}
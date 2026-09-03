
import { apiFetch } from "../api/api";

export function editProfile(token, updates) {
  return apiFetch('/whoami', token, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  });
}
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { editArtworkReviewById } from "../services/ArtworkReviewService";
import BottomSheet from "./BottomSheet";

export default function EditArtworkReviewModal({ review, onClose, onSaved }) {
  const [title, setTitle] = useState(review.title);
  const [artist, setArtist] = useState(review.artist || '');
  const [dateCompleted, setDateCompleted] = useState(review.date_completed || '');
  const [description, setDescription] = useState(review.description || '');
  const [itemImg, setItemImg] = useState(review.item_img || '');
  const [reasonForLiking, setReasonForLiking] = useState(review.reason_for_liking || '');
  const [locationViewed, setLocationViewed] = useState(review.location_viewed || '');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  
  const { token } = useAuth();
  
  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setSaving(true);
    try {
      const updated = await editArtworkReviewById(review.id, token, {
        title,
        artist,
        date_completed: dateCompleted,
        description,
        item_img: itemImg,
        reason_for_liking: reasonForLiking,
        location_viewed: locationViewed,
      });
      onSaved(updated);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <BottomSheet isOpen={true} onClose={onClose} title="Edit Artwork Review" size="large">
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Artist</label>
          <input className="form-control" value={artist} onChange={(e) => setArtist(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Date completed</label>
          <input
            className="form-control"
            value={dateCompleted}
            onChange={(e) => setDateCompleted(e.target.value)}
            placeholder="e.g. 1889 or c. 1889"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input className="form-control" value={itemImg} onChange={(e) => setItemImg(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Why you liked it</label>
          <textarea className="form-control" value={reasonForLiking} onChange={(e) => setReasonForLiking(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Where you saw it</label>
          <input className="form-control" value={locationViewed} onChange={(e) => setLocationViewed(e.target.value)} />
        </div>

        <div className="d-flex justify-content-end gap-2">
          <button type="button" className="btn btn-outline-secondary" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </BottomSheet>
  );
}
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { editArtistReviewById } from "../services/ArtistReviewService";
import BottomSheet from "./BottomSheet";

export default function EditArtistReviewModal({ review, onClose, onSaved }) {
  const [name, setName] = useState(review.name);
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

    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    setSaving(true);
    try {
      const updated = await editArtistReviewById(review.id, token, {
        name,
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
    <BottomSheet isOpen={true} onClose={onClose} title="Edit Artist Review" size="large">
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
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
          <label className="form-label">Why you liked them</label>
          <textarea className="form-control" value={reasonForLiking} onChange={(e) => setReasonForLiking(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Where you saw their work</label>
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
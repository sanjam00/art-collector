import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { createArtistReview } from "../services/ArtistReviewService";
import BottomSheet from "./BottomSheet";

export default function CreateArtistReviewModal({ onClose, onCreated }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [itemImg, setItemImg] = useState('');
  const [reasonForLiking, setReasonForLiking] = useState('');
  const [locationViewed, setLocationViewed] = useState('');
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
      await createArtistReview(token, {
        name,
        description,
        item_img: itemImg,
        reason_for_liking: reasonForLiking,
        location_viewed: locationViewed,
      });
      onCreated();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <BottomSheet isOpen={true} onClose={onClose} title="New Artist Review" size="large">
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
            {saving ? "Saving..." : "Create"}
          </button>
        </div>
      </form>
    </BottomSheet>
  );
}
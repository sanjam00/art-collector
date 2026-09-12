import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { createCollection } from "../services/CollectionService";
import BottomSheet from "./BottomSheet";

export default function CreateCollectionModal({ onClose, onCreated }) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  
  const { token } = useAuth();
  const navigate = useNavigate();
  
  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setSaving(true);
    try {
      const newCollection = await createCollection(token, title);
      onCreated();
      navigate(`/collections/${newCollection.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <BottomSheet isOpen={true} onClose={onClose} title="New Collection">
      {error && <p className="error-message">{error}</p>}

      {/* create then edit flow... create with title then edit details */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            required
          />
        </div>

        <div className="d-flex justify-content-end gap-2">
          <button type="button" className="btn btn-outline-secondary" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </BottomSheet>
  );
}
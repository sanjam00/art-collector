
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { editCollection, deleteCollection } from "../services/CollectionService";
import BottomSheet from "./BottomSheet";

export default function EditCollectionModal({ collection, onClose, onSaved, onDeleted }) {
  const [title, setTitle] = useState(collection.title);
  const [description, setDescription] = useState(collection.description || '');
  const [collectionImg, setCollectionImg] = useState(collection.collection_img || '');
  const [isPublic, setIsPublic] = useState(collection.is_public);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  
  const { token } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const updated = await editCollection(collection.id, token, {
        title,
        description,
        collection_img: collectionImg,
        is_public: isPublic,
      });
      onSaved(updated);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm("Delete this collection? This can't be undone.")) return;

    setDeleting(true);
    try {
      await deleteCollection(collection.id, token);
      onDeleted();
    } catch (err) {
      setError(err.message);
      setDeleting(false);
    }
  }

  return (
    <BottomSheet isOpen={true} onClose={onClose} title="Edit Collection" size="large">
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Cover image URL</label>
          <input className="form-control" value={collectionImg} onChange={(e) => setCollectionImg(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="isPublicCheckbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="isPublicCheckbox">
            Make this collection public
          </label>
        </div>

        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete Collection"}
          </button>

          <div className="d-flex gap-2">
            <button type="button" className="btn btn-outline-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </form>
    </BottomSheet>
  );
}
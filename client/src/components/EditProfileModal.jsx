import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { editProfile } from "../services/UserService";
import BottomSheet from "./BottomSheet";
import "../styles/BottomSheet.css";

import xSquareIcon from "../styles/icons/x-square.svg"
import xSquareFillIcon from "../styles/icons/x-square-fill.svg"
import save2Icon from "../styles/icons/save2.svg"
import save2FillIcon from "../styles/icons/save2-fill.svg"

export default function EditProfileModal({ user, onClose, onSaved }) {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [profileImg, setProfileImg] = useState(user.profile_img || '');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  
  const { token } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const updatedUser = await editProfile(token, {
        username,
        email,
        profile_img: profileImg,
      });
      onSaved(updatedUser);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <BottomSheet isOpen={true} onClose={onClose} title="Edit Profile" showCloseButton={false} size="large">
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="edit-profile-form">
        <div className="mb-3">
          <label className="form-label">Profile image URL</label>
          <input className="form-control" value={profileImg} onChange={(e) => setProfileImg(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Username</label>
          <input className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="modal-actions d-flex justify-content-end gap-2">
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
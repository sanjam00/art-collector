import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { editProfile } from "../services/UserService";

export default function EditProfileModal({ user, onClose, onSaved }) {
  const { token } = useAuth();
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [profileImg, setProfileImg] = useState(user.profile_img || '');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

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

  // add bootstrap classes
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Edit Profile</h3>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label>
            Username
            <input value={username} onChange={(e) => setUsername(e.target.value)} required />
          </label>

          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>

          <label>
            Profile image URL
            <input value={profileImg} onChange={(e) => setProfileImg(e.target.value)} />
          </label>

          <div className="modal-actions">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
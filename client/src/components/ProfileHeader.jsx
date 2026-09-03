
export default function ProfileHeader({ user, onEditClick }) {
  if (!user) return null;

  // add bootstrap classes
  return (
    <div className="profile-header">
      <img
        className="profile-photo"
        src={user.profile_img || '/default-avatar.png'}
        alt={`${user.username}'s profile`}
      />
      <h2 className="profile-username">{user.username}</h2>
      <button className="edit-profile-button" onClick={onEditClick}>
        Edit Profile
      </button>
    </div>
  );
}
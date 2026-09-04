
import pfpPlaceholder from "../styles/icons/pngtree-avatar-placeholder.png"
import pencilIcon from "../styles/icons/pencil.svg"
import pencilFillIcon from "../styles/icons/pencil-fill.svg"
import "../styles/ProfileHeader.css"

export default function ProfileHeader({ user, onEditClick }) {
  if (!user) return null;

  return (
    <div className="profile-header d-flex align-items-center gap-3">
      <img
        className="profile-photo"
        src={user.profile_img || pfpPlaceholder}
        alt={`${user.username}'s photo`}
      />
      <h2 className="profile-username flex-grow-1 mb-0">{user.username}</h2>
      <button className="icon-hover" type="button" onClick={onEditClick}>
        <img className="icon-default" src={pencilIcon} alt="Edit profile" />
        <img className="icon-hover-state" src={pencilFillIcon} alt="" />
      </button>
    </div>
  );
}
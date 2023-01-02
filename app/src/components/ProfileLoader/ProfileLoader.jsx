import "./ProfileLoader.css";

import DEFAULT from "../../assets/default__profile__picture.svg";

export function ProfileLoader({ profiles }) {
  return (
    <ul className="profiles" type="none">
      {profiles.map((profile) => {
        return (
          <li className="profile">
            <div className="profile__info">
              <img src={profile.profilePicture || DEFAULT} alt="User profile" />
              <h3>{profile.name}</h3>
            </div>

            <button>Follow</button>
          </li>
        );
      })}
    </ul>
  );
}

import "./ProfileLoader.css";

import { useGlobalUser } from "../../context";

import DEFAULT from "../../assets/default__profile__picture.svg";

export function ProfileLoader({ profiles }) {
  const [globalUser] = useGlobalUser();

  return (
    <ul className="profiles" type="none">
      {profiles.map((profile) => {
        return (
          <li className="profile">
            <div className="profile__info">
              <img src={profile.profilePicture || DEFAULT} alt="User profile" />
              <h3>{profile.name}</h3>
            </div>

            {globalUser.id !== profile.id && (
              <button className="profile__button follow">Follow</button>
            )}
          </li>
        );
      })}
    </ul>
  );
}

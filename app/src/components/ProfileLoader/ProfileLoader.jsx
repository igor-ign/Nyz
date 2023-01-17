import "./ProfileLoader.css";

import { useGlobalUser } from "../../context";

import DEFAULT from "../../assets/default__profile__picture.svg";

import { BUTTON_TYPE } from "../../constants";
import { useState } from "react";

export function ProfileLoader({ profiles }) {
  const [userToFollowOrUnfollow, setUserToFollowOrUnfollow] = useState();
  const [globalUser] = useGlobalUser();

  function handleValidateAction(profile) {
    setUserToFollowOrUnfollow(profile);
    profile.followedUser ? handleUnfollow() : handleFollow();
  }

  async function handleFollow() {
    try {
      const params = {
        follower: globalUser.email,
        followed: userToFollowOrUnfollow.email,
      };
      //TODO: end of the flow after backend create the endpoint
    } catch {
      console.error("error");
    }
  }

  async function handleUnfollow() {
    try {
      const params = {
        unfollower: globalUser.email,
        unfollowed: userToFollowOrUnfollow.email,
      };

      //TODO: end of the flow after backend create the endpoint
    } catch {
      console.error("error");
    }
  }

  return (
    <ul className="profiles" type="none">
      {profiles.map((profile) => {
        return (
          <li className="profile" key={profile.id}>
            <div className="profile__info">
              <img src={profile.profilePicture || DEFAULT} alt="User profile" />
              <h3>{profile.name}</h3>
            </div>

            {globalUser.id !== profile.id && (
              <button
                className={`profile__button ${
                  BUTTON_TYPE[profile.followedUser]
                }`}
                onClick={() => handleValidateAction(profile)}
              >
                {BUTTON_TYPE[profile.followedUser]}
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}

import "./ProfileLoader.css";

import { useState } from "react";

import { useFollow } from "../../hooks";

import { useGlobalUser } from "../../context";

import DEFAULT from "../../assets/default__profile__picture.svg";

import { BUTTON_TYPE } from "../../constants";

export function ProfileLoader({ profiles }) {
  const [userToFollowOrUnfollow, setUserToFollowOrUnfollow] = useState();
  const [globalUser] = useGlobalUser();

  const { follow, unfollow } = useFollow();

  function handleValidateAction(profile) {
    setUserToFollowOrUnfollow(profile);
    profile.followedUser ? handleUnfollow() : handleFollow();
  }

  async function handleFollow() {
    try {
      const params = {
        followerEmail: globalUser.email,
        followedEmail: userToFollowOrUnfollow.email,
      };

      await follow(params);
    } catch {
      console.error("error");
    }
  }

  async function handleUnfollow() {
    try {
      const params = {
        followerEmail: globalUser.email,
        followedEmail: userToFollowOrUnfollow.email,
      };

      await unfollow(params);
    } catch (e) {
      console.error(e);
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

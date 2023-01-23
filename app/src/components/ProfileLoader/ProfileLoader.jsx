import "./ProfileLoader.css";

import { toast } from "react-toastify";

import { useFollow } from "../../hooks";

import { useGlobalUser } from "../../context";

import DEFAULT from "../../assets/default__profile__picture.svg";

import {
  BUTTON_TYPE,
  USER_FOLLOW_SUCCESS,
  USER_FOLLOW_ERROR,
  USER_UNFOLLOW_SUCCESS,
  USER_UNFOLLOW_ERROR,
} from "../../constants";

export function ProfileLoader({ profiles, setProfiles }) {
  const [globalUser] = useGlobalUser();

  const { follow, unfollow } = useFollow();

  function handleValidateAction(profile) {
    profile.followedUser ? handleUnfollow(profile) : handleFollow(profile);
  }

  async function handleFollow(profile) {
    try {
      const params = {
        followerId: globalUser.id,
        followedId: profile.id,
      };

      await follow(params);

      toast.success(USER_FOLLOW_SUCCESS);
    } catch {
      toast.error(USER_FOLLOW_ERROR);
    }

    setProfiles([]);
  }

  async function handleUnfollow(profile) {
    try {
      const params = {
        followerId: globalUser.id,
        followedId: profile.id,
      };

      await unfollow(params);
      toast.success(USER_UNFOLLOW_SUCCESS);
    } catch (e) {
      console.error(e);
      toast.error(USER_UNFOLLOW_ERROR);
    }

    setProfiles([]);
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

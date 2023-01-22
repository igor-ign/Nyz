import "./ProfileLoader.css";

import { ToastContainer, toast } from "react-toastify";

import { useFollow } from "../../hooks";

import { useGlobalUser } from "../../context";

import DEFAULT from "../../assets/default__profile__picture.svg";

import { BUTTON_TYPE, TOAST_DEFAULT_DURATION } from "../../constants";

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

      toast.success("User followed sucessfully");
    } catch {
      console.error("error");
      toast.error("Error when trying to follow this user");
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
      toast.success("User Unfollowed sucessfully");
    } catch (e) {
      console.error(e);
      toast.error("Error when trying to Unfollow this user");
    }

    setProfiles([]);
  }

  return (
    <ul className="profiles" type="none">
      <ToastContainer autoClose={TOAST_DEFAULT_DURATION} />
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

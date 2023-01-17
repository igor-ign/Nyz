package br.com.nyz.helper;

import br.com.nyz.controller.response.ProfileResponse;
import br.com.nyz.domain.Follow;
import br.com.nyz.domain.User;
import br.com.nyz.repository.FollowRepository;
import br.com.nyz.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

import static java.util.Objects.nonNull;

@Component
public class ProfileHelper {
    @Autowired
    private FollowRepository followRepository;

    @Autowired
    private UserRepository userRepository;

    public void toSeeIfUserIsFollowed(ProfileResponse user, String authorEmail) {
        User author = userRepository.findByEmail(authorEmail);

        Follow isUserFollowed = followRepository.findFollowByFollowerIdAndFollowedId(author.getId(), user.getId());

        if (nonNull(isUserFollowed)) {
            user.setFollowedUser(true);
        } else {
            user.setFollowedUser(false);
        }

        if (author.getEmail() == user.getEmail()) {
            user.setFollowedUser(false);
        }

    }
}

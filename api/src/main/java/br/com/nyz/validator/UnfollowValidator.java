package br.com.nyz.validator;

import br.com.nyz.domain.Follow;
import br.com.nyz.domain.User;
import br.com.nyz.repository.FollowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static java.util.Objects.isNull;
import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Component
public class UnfollowValidator {

    private static final String INVALID_USER = "User is invalid.";
    private static final String INVALID_REQUEST = "You can't unfollow this user because you don't even follow him.";

    @Autowired
    private FollowRepository followRepository;

    public void validate(User follower, User followed) {
        Optional<Follow> follow = Optional.ofNullable(followRepository.findFollowByFollowerIdAndFollowedId(follower.getId(), followed.getId()));

        if (follow.isEmpty()) {
            throw new ResponseStatusException(BAD_REQUEST, INVALID_REQUEST);
        }

        if (isNull(follower.getId()) || isNull(followed.getId())) {
            throw new ResponseStatusException(BAD_REQUEST, INVALID_USER);
        }
    }
}

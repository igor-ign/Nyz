package br.com.nyz.service;

import br.com.nyz.controller.request.FollowRequest;
import br.com.nyz.controller.response.FollowResponse;
import br.com.nyz.domain.Follow;
import br.com.nyz.domain.User;
import br.com.nyz.mapper.FollowMapper;
import br.com.nyz.repository.FollowRepository;
import br.com.nyz.repository.UserRepository;
import br.com.nyz.validator.FollowValidator;
import br.com.nyz.validator.UnfollowValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FollowService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FollowRepository followRepository;

    @Autowired
    private FollowValidator followValidator;

    @Autowired
    private UnfollowValidator unfollowValidator;



    public FollowResponse follow(FollowRequest request) {
        User follower = userRepository.findByEmail(request.followerEmail);
        User followed = userRepository.findByEmail(request.followedEmail);

        followValidator.validate(follower, followed);

        Follow newFollow = FollowMapper.toEntity(follower, followed);

        followRepository.save(newFollow);

        return FollowMapper.toResponse(newFollow);

    }

    public FollowResponse unfollow(FollowRequest request) {
        User follower = userRepository.findByEmail(request.followerEmail);
        User followed = userRepository.findByEmail(request.followedEmail);

        unfollowValidator.validate(follower, followed);

        Follow follow = followRepository.findFollowByFollowerIdAndFollowedId(follower.getId(), followed.getId());

        followRepository.delete(follow);

        return FollowMapper.toResponse(follow);
    }
}

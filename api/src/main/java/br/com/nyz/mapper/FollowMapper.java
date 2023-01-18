package br.com.nyz.mapper;

import br.com.nyz.controller.response.FollowResponse;
import br.com.nyz.domain.Follow;
import br.com.nyz.domain.User;

public class FollowMapper {
    public static Follow toEntity(User follower, User followed) {
        return Follow.builder()
                .followerId(follower.getId())
                .followedId(followed.getId())
                .build();
    }

    public static FollowResponse toResponse(Follow follow) {
        return FollowResponse.builder()
                .followedId(follow.getFollowedId())
                .followerId(follow.getFollowerId())
                .build();
    }
}

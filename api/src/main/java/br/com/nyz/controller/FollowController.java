package br.com.nyz.controller;

import br.com.nyz.controller.response.FollowResponse;
import br.com.nyz.service.FollowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/connections")
public class FollowController {

    @Autowired
    private FollowService followService;

    @PostMapping("/follow/{followerId}/{followedId}")
    public FollowResponse followUser(@PathVariable Integer followerId, @PathVariable Integer followedId) {
        return followService.follow(followerId, followedId);
    }

    @DeleteMapping("/unfollow/{followerId}/{followedId}")
    public FollowResponse unfollowUser(@PathVariable Integer followerId, @PathVariable Integer followedId) {
        return followService.unfollow(followerId, followedId);
    }
}

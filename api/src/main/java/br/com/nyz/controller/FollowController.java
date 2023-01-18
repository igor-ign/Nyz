package br.com.nyz.controller;

import br.com.nyz.controller.request.FollowRequest;
import br.com.nyz.controller.response.FollowResponse;
import br.com.nyz.service.FollowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/connections")
public class FollowController {

    @Autowired
    private FollowService followService;

    @PostMapping("/follow")
    public FollowResponse followUser(@RequestBody FollowRequest request) {
        return followService.follow(request);
    }

    @DeleteMapping("/unfollow")
    public FollowResponse unfollowUser(@RequestBody FollowRequest request) {
        return followService.unfollow(request);
    }
}

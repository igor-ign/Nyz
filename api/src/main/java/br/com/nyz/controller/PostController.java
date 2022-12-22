package br.com.nyz.controller;

import br.com.nyz.controller.request.PostRequest;
import br.com.nyz.controller.response.PostResponse;
import br.com.nyz.service.ListPostsService;
import br.com.nyz.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/post")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private ListPostsService listPostsService;

    @PostMapping("/add")
    public PostResponse addPost(@RequestBody PostRequest newPost) {
        return postService.post(newPost);
    }

    @GetMapping("/{userId}")
    public Page<PostResponse> followedUsersPosts(@PathVariable Integer userId, Pageable pageable) {
        return listPostsService.list(userId, pageable);
    }

}

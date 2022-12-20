package br.com.nyz.controller;

import br.com.nyz.controller.request.PostRequest;
import br.com.nyz.controller.response.PostResponse;
import br.com.nyz.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/post")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping("/add")
    public PostResponse addPost(@RequestBody PostRequest newPost) {
        return postService.post(newPost);
    }
}

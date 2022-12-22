package br.com.nyz.service;

import br.com.nyz.controller.response.PostResponse;
import br.com.nyz.domain.Post;
import br.com.nyz.mapper.PostMapper;
import br.com.nyz.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ListPostsService {

    @Autowired
    private PostRepository postRepository;

    public Page<PostResponse> list(Integer userId, Pageable pageable) {
        Page<Post> posts = postRepository.findPostFromFollowedUsers(userId, pageable);

        Page<PostResponse> response = posts.map(post -> PostMapper.toResponse(post));

        return response;
    }
}

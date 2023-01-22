package br.com.nyz.service;

import br.com.nyz.controller.request.PostRequest;
import br.com.nyz.controller.response.PostResponse;
import br.com.nyz.domain.Post;
import br.com.nyz.mapper.PostMapper;
import br.com.nyz.repository.PostRepository;
import br.com.nyz.validator.DeletePostValidator;
import br.com.nyz.validator.PostValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostService {

    @Autowired
    private PostValidator postValidator;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private DeletePostValidator deletePostValidator;

    public PostResponse post(PostRequest newPost) {
        postValidator.validate(newPost);

        Post post = PostMapper.toEntity(newPost);

        postRepository.save(post);

        return PostMapper.toResponse(post);

    }

    public PostResponse remove(Integer postId) {
        Post post = postRepository.findPostById(postId);

        deletePostValidator.validate(post);

        postRepository.delete(post);

        return PostMapper.toResponse(post);
    }
}

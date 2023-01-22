package br.com.nyz.mapper;

import br.com.nyz.controller.request.PostRequest;
import br.com.nyz.controller.response.PostResponse;
import br.com.nyz.domain.Post;

public class PostMapper {
    public static Post toEntity(PostRequest newPost) {
        return Post.builder()
                .authorId(newPost.getAuthorId())
                .authorName(newPost.getAuthorName())
                .authorEmail(newPost.getAuthorEmail())
                .authorPicture(newPost.getAuthorPicture())
                .title(newPost.getTitle())
                .description(newPost.getDescription())
                .postContent(newPost.getPostContent())
                .build();
    }

    public static PostResponse toResponse(Post post) {
        return PostResponse.builder()
                .id(post.getId())
                .authorId(post.getAuthorId())
                .authorEmail(post.getAuthorEmail())
                .authorName(post.getAuthorName())
                .authorPicture(post.getAuthorPicture())
                .title(post.getTitle())
                .description(post.getDescription())
                .postContent(post.getPostContent())
                .build();
    }
}

package br.com.nyz.controller.response;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostResponse {
    private Integer authorId;
    private String authorEmail;
    private String authorName;
    private String authorPicture;
    private String title;
    private String description;
    private String postContent;
}

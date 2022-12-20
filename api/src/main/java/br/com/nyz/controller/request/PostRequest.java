package br.com.nyz.controller.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostRequest {

    @NotNull(message = "Author Id can't be null.")
    private Integer authorId;

    @NotBlank(message = "E-mail can't be null.")
    private String authorEmail;

    @NotNull(message = "Author Id can't be null.")
    private String authorName;

    @NotNull(message = "Author Id can't be null.")
    private String authorPicture;

    @NotBlank(message = "Your post needs a title.")
    private String title;

    @NotBlank(message = "Your post needs a description.")
    private String description;

    @NotBlank(message = "Please write something before post")
    private String postContent;
}

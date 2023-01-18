package br.com.nyz.controller.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FollowRequest {

    @NotBlank(message = "E-mail can't be null.")
    public String followerEmail;

    @NotBlank(message = "E-mail can't be null.")
    public String followedEmail;
}

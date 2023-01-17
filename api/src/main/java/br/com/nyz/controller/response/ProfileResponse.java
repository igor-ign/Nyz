package br.com.nyz.controller.response;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProfileResponse {
    private Integer id;
    private String name;
    private String email;
    private String profilePicture;
    private boolean isFollowedUser;
}

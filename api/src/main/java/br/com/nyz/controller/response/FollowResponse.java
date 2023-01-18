package br.com.nyz.controller.response;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FollowResponse {
    private Integer followerId;
    private Integer followedId;
}

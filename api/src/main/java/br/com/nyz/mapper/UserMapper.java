package br.com.nyz.mapper;

import br.com.nyz.controller.response.UserResponse;
import br.com.nyz.domain.User;

public class UserMapper {
    public static UserResponse toResponse(User entity) {
        return UserResponse.builder()
                .id(entity.getId())
                .email(entity.getEmail())
                .profilePicture(entity.getProfilePicture())
                .name(entity.getName())
                .build();
    }

}

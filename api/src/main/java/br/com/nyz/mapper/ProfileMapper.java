package br.com.nyz.mapper;

import br.com.nyz.controller.response.ProfileResponse;
import br.com.nyz.domain.User;

public class ProfileMapper {
    public static ProfileResponse toResponse(User entity) {
        return ProfileResponse.builder()
                .id(entity.getId())
                .name(entity.getName())
                .email(entity.getEmail())
                .profilePicture(entity.getProfilePicture())
                .build();
    }
}

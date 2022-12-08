package br.com.nyz.mapper;

import br.com.nyz.controller.request.AddUserRequest;
import br.com.nyz.domain.User;

public class UserRegisterMapper {
    public static User toEntity(AddUserRequest newUser) {
        return User.builder()
                .name(newUser.getName())
                .profilePicture(newUser.getProfilePicture())
                .email(newUser.getEmail())
                .password(newUser.getPassword())
                .build();
    }
}

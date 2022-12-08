package br.com.nyz.service;

import br.com.nyz.controller.request.AddUserRequest;
import br.com.nyz.controller.response.UserResponse;
import br.com.nyz.domain.User;
import br.com.nyz.mapper.UserMapper;
import br.com.nyz.mapper.UserRegisterMapper;
import br.com.nyz.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Objects;

import static org.springframework.http.HttpStatus.UNPROCESSABLE_ENTITY;

@Service
public class UserRegisterService {

    @Autowired
    private UserRepository userRepository;
        private static final String USER_REGISTER_ERROR_MESSAGE = "Review all the informations provided and try to add the user again.";

    public UserResponse register(AddUserRequest newUser) {
        if (Objects.isNull(newUser)) {
            throw new ResponseStatusException(UNPROCESSABLE_ENTITY, USER_REGISTER_ERROR_MESSAGE);
        }

        User user = UserRegisterMapper.toEntity(newUser);

        userRepository.save(user);

        UserResponse response = UserMapper.toResponse(user);

        return response;

    }
}

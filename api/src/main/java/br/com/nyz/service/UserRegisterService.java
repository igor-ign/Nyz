package br.com.nyz.service;

import br.com.nyz.controller.request.AddUserRequest;
import br.com.nyz.controller.response.UserResponse;
import br.com.nyz.domain.User;
import br.com.nyz.mapper.UserMapper;
import br.com.nyz.mapper.UserRegisterMapper;
import br.com.nyz.repository.UserRepository;
import br.com.nyz.validator.UserRegisterValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Objects;

import static org.springframework.http.HttpStatus.UNPROCESSABLE_ENTITY;

@Service
public class UserRegisterService {

    private final PasswordEncoder encoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRegisterValidator userRegisterValidator;
        private static final String USER_REGISTER_ERROR_MESSAGE = "Review all the informations provided and try to add the user again.";

    public UserRegisterService(PasswordEncoder encoder) {
        this.encoder = encoder;
    }

    public UserResponse register(AddUserRequest request) {
        if (Objects.isNull(request)) {
            throw new ResponseStatusException(UNPROCESSABLE_ENTITY, USER_REGISTER_ERROR_MESSAGE);
        }

        userRegisterValidator.validate(request);

        User newUser = UserRegisterMapper.toEntity(request);
        newUser.setPassword(encoder.encode(newUser.getPassword()));

        userRepository.save(newUser);

        UserResponse response = UserMapper.toResponse(newUser);

        return response;

    }
}

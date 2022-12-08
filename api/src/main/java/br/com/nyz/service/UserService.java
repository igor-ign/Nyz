package br.com.nyz.service;

import br.com.nyz.controller.request.DetailedUserRequest;
import br.com.nyz.controller.response.UserResponse;
import br.com.nyz.domain.User;
import br.com.nyz.mapper.UserMapper;
import br.com.nyz.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import static java.util.Objects.isNull;
import static org.springframework.http.HttpStatus.UNPROCESSABLE_ENTITY;

@Service
public class UserService {
    private static final String INVALID_EMAIL_MESSAGE = "The e-mail doesn't exist in our database.";

    @Autowired
    private UserRepository userRepository;

    public UserResponse listUser(DetailedUserRequest request) {
        String userEmail = request.getEmail();

        User user = userRepository.findByEmail(userEmail);

        if (isNull(user)) {
            throw new ResponseStatusException(UNPROCESSABLE_ENTITY, INVALID_EMAIL_MESSAGE);
        }

        UserResponse response = UserMapper.toResponse(user);

        return response;
    }
}

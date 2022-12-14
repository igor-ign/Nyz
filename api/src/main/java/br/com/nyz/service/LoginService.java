package br.com.nyz.service;

import br.com.nyz.controller.request.LoginRequest;
import br.com.nyz.controller.response.UserResponse;
import br.com.nyz.domain.User;
import br.com.nyz.mapper.UserMapper;
import br.com.nyz.repository.UserRepository;
import br.com.nyz.validator.LoginValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {
    @Autowired
    private LoginValidator loginValidator;

    @Autowired
    private UserRepository userRepository;

    public UserResponse login(LoginRequest request) {
        String userEmail = request.getEmail();

        loginValidator.validate(userEmail, request);

        User user = userRepository.findByEmail(request.getEmail());

        UserResponse response = UserMapper.toResponse(user);

        return response;
    }
}

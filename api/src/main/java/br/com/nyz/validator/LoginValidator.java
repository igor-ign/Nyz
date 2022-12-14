package br.com.nyz.validator;

import br.com.nyz.controller.request.LoginRequest;
import br.com.nyz.domain.User;
import br.com.nyz.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import static java.util.Objects.isNull;
import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Component
public class LoginValidator {
    private static final String WRONG_EMAIL_MESSAGE = "Invalid e-mail.";
    private static final String WRONG_PASSWORD_MESSAGE = "Invalid password.";

    private final PasswordEncoder encoder;

    @Autowired
    private UserRepository userRepository;

    public LoginValidator(PasswordEncoder encoder) {
        this.encoder = encoder;
    }

    public void validate(String userEmail, LoginRequest request) {
        User user = userRepository.findByEmail(userEmail);

        if (isNull(user)) {
            throw new ResponseStatusException(BAD_REQUEST, WRONG_EMAIL_MESSAGE);
        }

        String requestPassword = request.getPassword();
        String userPassword = user.getPassword();
        boolean isPasswordValid = encoder.matches(requestPassword, userPassword);

        if (!isPasswordValid) {
            throw new ResponseStatusException(BAD_REQUEST,WRONG_PASSWORD_MESSAGE);
        }
    }
}

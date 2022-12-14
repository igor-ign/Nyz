package br.com.nyz.validator;

import br.com.nyz.controller.request.UserRegisterRequest;
import br.com.nyz.domain.User;
import br.com.nyz.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.Objects;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Component
public class UserRegisterValidator {
    private static final int USER_NAME_MAX_LENGTH = 30;
    private static final int USER_NAME_MIN_LENGTH = 3;
    private static final int USER_EMAIL_MAX_LENGTH = 30;
    private static final int USER_EMAIL_MIN_LENGTH = 13;
    private static final int USER_PASSWORD_MIN_LENGTH = 8;
    private static final int USER_PASSWORD_MAX_LENGTH = 35;

    private static final String SHORT_USER_NAME_ERROR_MESSAGE = "Your name must have at least 3 letters.";
    private static final String BIG_USER_NAME_ERROR_MESSAGE = "Your name must have 30 letters or less.";
    private static final String SHORT_USER_EMAIL_ERROR_MESSAGE = "Your email must have at least 13 letters";
    private static final String BIG_USER_EMAIL_ERROR_MESSAGE = "Your email must have 30 letters or less.";
    private static final String SHORT_USER_PASSWORD_ERROR_MESSAGE = "Your password must have at least 8 letters.";
    private static final String BIG_USER_PASSWORD_ERROR_MESSAGE = "Your password must have 35 letters or less.";
    private static final String REPEATED_USER_EMAIL_ERROR_MESSAGE = "This e-mail was already been registered.";

    @Autowired
    private UserRepository userRepository;

    public void validate(UserRegisterRequest newUser) {
        String name = newUser.getName();
        String email = newUser.getEmail();
        String password = newUser.getPassword();

        int nameLength = name.length();
        int emailLength = email.length();
        int passwordLength = password.length();

        User registeredUser = userRepository.findByEmail(email);

        if (Objects.nonNull(registeredUser)) {
            throw new ResponseStatusException(BAD_REQUEST, REPEATED_USER_EMAIL_ERROR_MESSAGE);

        }

        if (nameLength < USER_NAME_MIN_LENGTH) {
            throw new ResponseStatusException(BAD_REQUEST, SHORT_USER_NAME_ERROR_MESSAGE);
        }

        if (nameLength > USER_NAME_MAX_LENGTH) {
            throw new ResponseStatusException(BAD_REQUEST, BIG_USER_NAME_ERROR_MESSAGE);
        }

        if (emailLength < USER_EMAIL_MIN_LENGTH) {
            throw new ResponseStatusException(BAD_REQUEST, SHORT_USER_EMAIL_ERROR_MESSAGE);
        }

        if (emailLength > USER_EMAIL_MAX_LENGTH) {
            throw new ResponseStatusException(BAD_REQUEST, BIG_USER_EMAIL_ERROR_MESSAGE);
        }

        if (passwordLength < USER_PASSWORD_MIN_LENGTH) {
            throw new ResponseStatusException(BAD_REQUEST, SHORT_USER_PASSWORD_ERROR_MESSAGE);
        }

        if (passwordLength > USER_PASSWORD_MAX_LENGTH) {
            throw new ResponseStatusException(BAD_REQUEST, BIG_USER_PASSWORD_ERROR_MESSAGE);
        }

    }
}

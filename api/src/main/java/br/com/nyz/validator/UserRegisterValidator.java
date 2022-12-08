package br.com.nyz.validator;

import br.com.nyz.controller.request.AddUserRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Component
public class UserRegisterValidator {
    private static final int USER_NAME_MAX_LENGTH = 30;
    private static final int USER_NAME_MIN_LENGTH = 3;
    private static final int USER_EMAIL_MAX_LENGTH = 30;
    private static final int USER_EMAIL_MIN_LENGTH = 13;

    private static final String SHORT_USER_NAME_ERROR_MESSAGE = "Your name must have at least 3 letters.";
    private static final String BIG_USER_NAME_ERROR_MESSAGE = "Your name must have 30 or less letters.";
    private static final String SHORT_EMAIL_ERROR_MESSAGE = "Your email must have at least 13 letters";
    private static final String BIG_EMAIL_ERROR_MESSAGE = "Your email must have 30 or less letters";

    public static void validate(AddUserRequest newUser) {
        String name = newUser.getName();
        String email = newUser.getEmail();

        int nameLength = name.length();
        int emailLength = email.length();

        if (nameLength < USER_NAME_MIN_LENGTH) {
            throw new ResponseStatusException(BAD_REQUEST, SHORT_USER_NAME_ERROR_MESSAGE);
        }

        if (nameLength > USER_NAME_MAX_LENGTH) {
            throw new ResponseStatusException(BAD_REQUEST, BIG_USER_NAME_ERROR_MESSAGE);
        }

        if (emailLength < USER_EMAIL_MIN_LENGTH) {
            throw new ResponseStatusException(BAD_REQUEST, SHORT_EMAIL_ERROR_MESSAGE);
        }

        if (emailLength > USER_EMAIL_MAX_LENGTH) {
            throw new ResponseStatusException(BAD_REQUEST, BIG_EMAIL_ERROR_MESSAGE);
        }
    }
}

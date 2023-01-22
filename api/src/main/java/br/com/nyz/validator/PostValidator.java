package br.com.nyz.validator;

import br.com.nyz.controller.request.PostRequest;
import br.com.nyz.domain.User;
import br.com.nyz.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static java.util.Objects.isNull;
import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Component
public class PostValidator {
    private static final String INVALID_USER_ID_MESSAGE = "This user doesn't exist in our database";
    private static final String INVALID_AUTHOR_NAME_MESSAGE = "Author name didn't match with Id";

    // Todo : add post title and description min/max length

    @Autowired
    private UserRepository userRepository;

    public void validate(PostRequest newPost) {
        String authorEmail = newPost.getAuthorEmail();
        String authorName = newPost.getAuthorName();

        User isUserValid = userRepository.findByEmail(authorEmail);

        if (isNull(isUserValid)) {
            throw new ResponseStatusException(BAD_REQUEST, INVALID_USER_ID_MESSAGE);
        }

        if (!isUserValid.getName().contains(authorName)) {
            throw new ResponseStatusException(BAD_REQUEST, INVALID_AUTHOR_NAME_MESSAGE);
        }
    }
}

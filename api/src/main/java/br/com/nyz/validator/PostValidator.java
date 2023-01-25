package br.com.nyz.validator;

import br.com.nyz.controller.request.PostRequest;
import br.com.nyz.domain.User;
import br.com.nyz.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import static java.util.Objects.isNull;
import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Component
public class PostValidator {
    private static final String INVALID_USER_ID_MESSAGE = "This user doesn't exist in our database";
    private static final String INVALID_AUTHOR_NAME_MESSAGE = "Author name didn't match with Id";
    private static final String BIG_POST_TITLE_LENGTH = "The post title max length is 45 words.";
    private static final String BIG_POST_DESCRIPTION_LENGTH = "The post description max length is 100 words.";
    private static final int POST_TITLE_MAX_LENGTH = 45;
    private static final int POST_DESCRIPTION_MAX_LENGTH = 100;

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

        if (newPost.getTitle().length() > POST_TITLE_MAX_LENGTH) {
            throw new ResponseStatusException(BAD_REQUEST, BIG_POST_TITLE_LENGTH);
        }

        if (newPost.getDescription().length() > POST_DESCRIPTION_MAX_LENGTH) {
            throw new ResponseStatusException(BAD_REQUEST, BIG_POST_DESCRIPTION_LENGTH);
        }
    }
}

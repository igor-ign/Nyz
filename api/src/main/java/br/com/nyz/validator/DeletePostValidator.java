package br.com.nyz.validator;

import br.com.nyz.domain.Post;
import br.com.nyz.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import static java.util.Objects.isNull;
import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Component
public class DeletePostValidator {

    private static final String INVALID_POST_MESSAGE = "This post doesn't exist in our database";

    public void validate(Post post) {
        if (isNull(post)) {
            throw new ResponseStatusException(BAD_REQUEST, INVALID_POST_MESSAGE);
        }

    }
}

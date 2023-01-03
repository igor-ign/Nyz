package br.com.nyz.repository;

import br.com.nyz.domain.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PostRepository extends JpaRepository<Post, Integer> {
    @Query(value = "SELECT * FROM Post AS p INNER JOIN Follow AS f ON f.followed_id = p.author_id WHERE f.follower_id = ?1", nativeQuery = true)
    Page<Post> findPostFromFollowedUsers(Integer userId, Pageable pageable);

    Page<Post> findPostsByAuthorId(Integer userId, Pageable pageable);
}

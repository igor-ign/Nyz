package br.com.nyz.repository;

import br.com.nyz.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Integer> {

    User findByEmail(String email);

    @Query(value = "SELECT * FROM \"user\" WHERE name LIKE %?1%", nativeQuery = true)
    Page<User> findByName(String name, Pageable pageable);
}

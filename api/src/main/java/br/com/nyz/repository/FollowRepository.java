package br.com.nyz.repository;

import br.com.nyz.domain.Follow;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowRepository extends JpaRepository<Follow, Integer> {

    Follow findFollowByFollowerIdAndFollowedId(Integer followerId, Integer followedId);
}

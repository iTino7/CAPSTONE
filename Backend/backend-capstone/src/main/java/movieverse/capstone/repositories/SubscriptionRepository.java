package movieverse.capstone.repositories;

import movieverse.capstone.entities.SubscriptionEntities;
import movieverse.capstone.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SubscriptionRepository extends JpaRepository<SubscriptionEntities, Long> {
    Optional<SubscriptionEntities> findByUser(User user);
}

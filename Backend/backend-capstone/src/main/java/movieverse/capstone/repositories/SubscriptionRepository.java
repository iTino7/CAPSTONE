package movieverse.capstone.repositories;

import movieverse.capstone.entities.SubscriptionEntities;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubscriptionRepository extends JpaRepository<SubscriptionEntities, Long> {
}

package movieverse.capstone.services;

import movieverse.capstone.entities.SubscriptionEntities;
import movieverse.capstone.entities.User;
import movieverse.capstone.repositories.SubscriptionRepository;
import movieverse.capstone.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class SubscriptionService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    public SubscriptionEntities addSubscriptionToUser(Long userId, String stripeSubscriptionId, String priceId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        SubscriptionEntities subscriptionEntities = user.getSubscriptionEntities();

        if (subscriptionEntities == null) {
            subscriptionEntities = new SubscriptionEntities(stripeSubscriptionId, priceId, user);
        } else {
            subscriptionEntities.setStripeSubscriptionId(stripeSubscriptionId);
            subscriptionEntities.setPriceId(priceId);
            subscriptionEntities.setStartDate(LocalDateTime.now());
            subscriptionEntities.setEndDate(LocalDateTime.now().plusMonths(1));
        }

        user.setSubscriptionEntities(subscriptionEntities);
        return subscriptionRepository.save(subscriptionEntities);
    }
}

package movieverse.capstone.services;

import movieverse.capstone.entities.Subscription;
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

    public Subscription addSubscriptionToUser(Long userId, String stripeSubscriptionId, String priceId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Subscription subscription = user.getSubscription();

        if (subscription == null) {
            // primo abbonamento
            subscription = new Subscription(stripeSubscriptionId, priceId, user);
        } else {
            // aggiorno l’abbonamento già esistente
            subscription.setStripeSubscriptionId(stripeSubscriptionId);
            subscription.setPriceId(priceId);
            subscription.setStartDate(LocalDateTime.now());
            subscription.setEndDate(LocalDateTime.now().plusMonths(1));
        }

        user.setSubscription(subscription);
        return subscriptionRepository.save(subscription);
    }
}

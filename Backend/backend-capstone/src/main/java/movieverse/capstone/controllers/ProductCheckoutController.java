package movieverse.capstone.controllers;


import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import movieverse.capstone.entities.Subscription;
import movieverse.capstone.entities.User;
import movieverse.capstone.payloads.ProductRequest;
import movieverse.capstone.payloads.StripeResponse;
import movieverse.capstone.payloads.SubscriptionRequest;
import movieverse.capstone.services.StripeService;
import movieverse.capstone.services.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/subscription/v1")
public class ProductCheckoutController {

    @Autowired
    private SubscriptionService subscriptionService;


    @Value("${stripe.secretKey}")
    private String secretKey;

    @Autowired
    private StripeService stripeService;

    @PostMapping("/checkout")
    public ResponseEntity<StripeResponse> createSubscription(@RequestBody ProductRequest productRequest) {
        StripeResponse subscription = stripeService.createSubscription(productRequest);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(subscription);
    }

    @RequestMapping("/create")
    public User index(@RequestBody User data) throws StripeException {
        Stripe.apiKey = secretKey;
        Map<String, Object> params = new HashMap<>();
        params.put("name", data.getName());
        params.put("email", data.getEmail());
        Customer customer = Customer.create(params);
        data.setCustomerId(customer.getId());
        return data;
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<Subscription> addSubscriptionToUser(
            @PathVariable Long userId,
            @RequestBody SubscriptionRequest request) {

        Subscription subscription = subscriptionService.addSubscriptionToUser(
                userId,
                request.stripeSubscriptionId(),
                request.priceId()
        );

        return ResponseEntity.ok(subscription);
    }

}

package movieverse.capstone.controllers;


import com.stripe.Stripe;
import com.stripe.model.*;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import com.stripe.param.PriceListParams;
import com.stripe.param.ProductListParams;
import com.stripe.param.checkout.SessionRetrieveParams;
import movieverse.capstone.entities.User;
import movieverse.capstone.enums.Subscriptions;
import movieverse.capstone.payloads.ProductRequest;
import movieverse.capstone.payloads.StripeResponse;
import movieverse.capstone.repositories.UserRepository;
import movieverse.capstone.services.StripeService;
import movieverse.capstone.services.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/subscription/v1")
public class ProductCheckoutController {

    @Autowired
    private SubscriptionService subscriptionService;

    @Autowired
    private UserRepository userRepository;


    @Value("${stripe.secretKey}")
    private String secretKey;

    @Autowired
    private StripeService stripeService;

    @PostMapping("/checkout")
    public ResponseEntity<StripeResponse> createSubscription(@RequestBody ProductRequest productRequest) {
        Stripe.apiKey = secretKey;
        User user = userRepository.findById(productRequest.userId()).orElseThrow(() -> new RuntimeException("User non trovato"));
        StripeResponse subscription = stripeService.createSubscription(productRequest, user);
        return ResponseEntity.status(HttpStatus.OK).body(subscription);
    }

    @GetMapping("/stripe/plans")
    public List<Map<String, Object>> getPlans() throws Exception {
        Stripe.apiKey = secretKey;
        ProductCollection products = Product.list(ProductListParams.builder().setLimit(10L).build());
        PriceCollection prices = Price.list(PriceListParams.builder().setLimit(10L).build());

        List<Map<String, Object>> plans = new ArrayList<>();


        for (Product product : products.getData()) {
            Map<String, Object> plan = new HashMap<>();
            plan.put("productId", product.getId());
            plan.put("name", product.getName());
            plan.put("description", product.getDescription());
            plan.put("metadati", product.getMetadata());
            List<Map<String, Object>> productPrices = new ArrayList<>();
            for (Price price : prices.getData()) {
                if (price.getProduct().equals(product.getId())) {
                    Map<String, Object> priceMap = new HashMap<>();
                    priceMap.put("priceId", price.getId());
                    priceMap.put("amount", price.getUnitAmount());
                    priceMap.put("currency", price.getCurrency());
                    productPrices.add(priceMap);
                }
            }

            plan.put("prices", productPrices);
            plans.add(plan);
        }

        return plans;

    }

    @PostMapping("/stripe/webhook")
    public ResponseEntity<String> handleStripeWebhook(@RequestBody String payload, @RequestHeader(value = "Stripe-Signature", required = false) String sigHeader) {

        Stripe.apiKey = secretKey;
        Event event;
        try {
            event = Webhook.constructEvent(payload, sigHeader, secretKey);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid webhook");
        }

        if ("checkout.session.completed".equals(event.getType())) {
            Session session = (Session) event.getDataObjectDeserializer().getObject().orElseThrow(() -> new RuntimeException("Unable to deserialize session"));

            String customerId = session.getClientReferenceId();


            Optional<User> optionalUser = userRepository.findById(Long.parseLong(customerId));
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();

                // Recupera i line items della session
                try {
                    Session sessionWithItems = Session.retrieve(session.getId(), SessionRetrieveParams.builder().addExpand("line_items").build(), null);

                    List<LineItem> items = sessionWithItems.getLineItems().getData();
                    if (!items.isEmpty()) {
                        String priceId = items.get(0).getPrice().getId();
                        user.setSubscriptions(mapPriceId(priceId));
                        userRepository.save(user);
                        System.out.println("✅ Utente aggiornato con subscription: " + user.getSubscriptions());
                    }
                    System.out.println("✅ Webhook ricevuto: " + event.getType());
                } catch (Exception ex) {
                    ex.printStackTrace();
                }
            }
        }

        return ResponseEntity.ok("Webhook handled");
    }

    private Subscriptions mapPriceId(String priceId) {
        Stripe.apiKey = secretKey;
        return switch (priceId) {
            case "price_1S5PWM0VRXlaLYzSkPLaI8RT" -> Subscriptions.STANDARD;
            case "price_1S5PW80VRXlaLYzSRLvQpYJ7" -> Subscriptions.STANDARD_ADS;
            case "price_1S5PWZ0VRXlaLYzS1QhAuPDa" -> Subscriptions.PREMIUM;
            default -> Subscriptions.FREE;
        };
    }
}

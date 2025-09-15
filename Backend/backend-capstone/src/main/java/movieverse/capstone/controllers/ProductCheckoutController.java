package movieverse.capstone.controllers;


import com.stripe.Stripe;
import com.stripe.model.Price;
import com.stripe.model.PriceCollection;
import com.stripe.model.Product;
import com.stripe.model.ProductCollection;
import com.stripe.param.PriceListParams;
import com.stripe.param.ProductListParams;
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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

        user.setSubscriptions(Subscriptions.valueOf(productRequest.plan()));
        userRepository.save(user);
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
}

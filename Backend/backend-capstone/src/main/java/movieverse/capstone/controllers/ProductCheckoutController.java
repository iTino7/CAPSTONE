package movieverse.capstone.controllers;


import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Price;
import com.stripe.model.Product;
import com.stripe.param.PriceListParams;
import com.stripe.param.ProductListParams;
import movieverse.capstone.payloads.ProductRequest;
import movieverse.capstone.payloads.StripeResponse;
import movieverse.capstone.payloads.SubscriptionDTO;
import movieverse.capstone.services.StripeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/product/v1")
public class ProductCheckoutController {


    @Value("${stripe.secretKey}")
    private String secretKey;

    @Autowired
    private StripeService stripeService;

    @PostMapping("/create-subscription")
    public StripeResponse createSubscription(@RequestBody ProductRequest request) {
        return stripeService.createSubscription(request.priceId());
    }

    @GetMapping("/subscriptions")
    public ResponseEntity<List<SubscriptionDTO>> getSubscriptions() throws StripeException {
        return ResponseEntity.ok(stripeService.getAllSubscriptions());
    }

    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> getAllStripeData() throws StripeException {
        Stripe.apiKey = secretKey;

        // Recupera tutti i prodotti
        var products = Product.list(ProductListParams.builder().setLimit(100L).build());

        // Recupera tutti i prezzi
        var prices = Price.list(PriceListParams.builder().setLimit(100L).build());

        Map<String, Object> response = new HashMap<>();
        response.put("products", products.getData());
        response.put("prices", prices.getData());

        return ResponseEntity.ok(response);
    }

}

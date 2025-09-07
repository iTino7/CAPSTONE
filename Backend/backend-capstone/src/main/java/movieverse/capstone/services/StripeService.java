package movieverse.capstone.services;


import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Price;
import com.stripe.model.Product;
import com.stripe.model.checkout.Session;
import com.stripe.param.PriceListParams;
import com.stripe.param.ProductListParams;
import com.stripe.param.checkout.SessionCreateParams;
import movieverse.capstone.payloads.StripeResponse;
import movieverse.capstone.payloads.SubscriptionDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StripeService {

    @Value("${stripe.secretKey}")
    private String secretKey;


    public StripeResponse createSubscription(String priceId) {
        Stripe.apiKey = secretKey;

        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.SUBSCRIPTION) // modalità abbonamento
                .setSuccessUrl("http://localhost:3002/success") // redirect dopo pagamento
                .setCancelUrl("http://localhost:3002/cancel") // redirect se annullato
                .addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setPrice(priceId) // id del prezzo già creato su Stripe
                                .setQuantity(1L)
                                .build()
                )
                .build();

        try {
            Session session = Session.create(params);
            return StripeResponse.builder()
                    .status("SUCCESS")
                    .message("Subscription session created")
                    .sessionId(session.getId())
                    .sessionUrl(session.getUrl()) // questo URL manda l'utente a Stripe
                    .build();
        } catch (StripeException e) {
            e.printStackTrace();
            return StripeResponse.builder()
                    .status("FAILED")
                    .message(e.getMessage())
                    .sessionId(null)
                    .sessionUrl(null)
                    .build();
        }
    }

    public List<Product> getAllProducts() throws StripeException {
        Stripe.apiKey = secretKey;

        ProductListParams params = ProductListParams.builder()
                .setLimit(100L) // massimo 100 prodotti
                .build();

        return Product.list(params).getData();
    }

    public List<Price> getAllPrices() throws StripeException {
        Stripe.apiKey = secretKey;

        PriceListParams params = PriceListParams.builder()
                .setLimit(100L) // massimo 100 prezzi
                .build();

        return Price.list(params).getData();
    }

    public List<SubscriptionDTO> getAllSubscriptions() throws StripeException {
        Stripe.apiKey = secretKey;

        List<Product> products = Product.list(
                ProductListParams.builder().setLimit(100L).build()
        ).getData();

        List<Price> prices = Price.list(
                PriceListParams.builder().setLimit(100L).build()
        ).getData();

        List<SubscriptionDTO> subscriptions = new ArrayList<>();

        for (Price price : prices) {
            Product product = products.stream()
                    .filter(p -> p.getId().equals(price.getProduct()))
                    .findFirst()
                    .orElse(null);

            if (product != null && "subscription".equals(price.getType())) {
                subscriptions.add(new SubscriptionDTO(
                        product.getId(),
                        product.getName(),
                        price.getId(),
                        price.getUnitAmount() != null ? price.getUnitAmount() : 0,
                        price.getCurrency(),
                        price.getRecurring() != null ? price.getRecurring().getInterval() : null
                ));
            }
        }

        return subscriptions;
    }
}

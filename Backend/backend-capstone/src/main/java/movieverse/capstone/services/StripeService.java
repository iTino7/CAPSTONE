package movieverse.capstone.services;


import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import movieverse.capstone.payloads.ProductRequest;
import movieverse.capstone.payloads.StripeResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class StripeService {

    @Value("${stripe.secretKey}")
    private String secretKey;


    public StripeResponse createSubscription(ProductRequest productRequest) {
        Stripe.apiKey = secretKey;

//        SessionCreateParams.LineItem.PriceData.ProductData productData = SessionCreateParams.LineItem.PriceData.ProductData.builder()
//                .setName(productRequest.name()).build();
//
//        SessionCreateParams.LineItem.PriceData priceData = SessionCreateParams.LineItem.PriceData.builder()
//                .setCurrency(productRequest.currency() == null ? "EUR" : productRequest.currency())
//                .setUnitAmount(productRequest.amount())
//                .setProductData(productData)
//
//                .build();

        SessionCreateParams.LineItem lineItem = SessionCreateParams.LineItem.builder()
                .setQuantity(productRequest.quantity())
                .setPrice(productRequest.priceId())
                .build();

        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.SUBSCRIPTION)
                .setSuccessUrl("http://localhost:3002/success")
                .setCancelUrl("http://localhost:3002/cancel")
                .addLineItem(lineItem)
                .build();

        Session session = null;

        try {
            session = Session.create(params);
        } catch (StripeException ex) {
            System.out.println(ex.getMessage());
        }

        return StripeResponse.builder()
                .status("SUCCESS")
                .message("Subscription created")
                .sessionId(session.getId())
                .sessionUrl(session.getUrl())
                .build();
    }
}

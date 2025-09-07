package movieverse.capstone.payloads;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SubscriptionDTO {
    private String productId;
    private String productName;
    private String priceId;
    private long priceAmount; // in centesimi
    private String currency;
    private String interval; // monthly, yearly, ecc.
}
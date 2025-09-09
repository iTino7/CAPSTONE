package movieverse.capstone.payloads;

public record SubscriptionRequest(String stripeSubscriptionId, String priceId) {
}

package movieverse.capstone.payloads;


import lombok.Builder;

@Builder
public record StripeResponse(String status, String message, String sessionId, String sessionUrl) {
}

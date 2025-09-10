package movieverse.capstone.payloads;

public record ProductRequest(
        Long quantity,
        String priceId,
        Long userId
) {
}

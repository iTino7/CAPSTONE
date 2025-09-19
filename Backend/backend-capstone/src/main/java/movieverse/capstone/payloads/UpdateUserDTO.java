package movieverse.capstone.payloads;

public record UpdateUserDTO(
        String username,
        String name,
        String email,
        String password
) {
}

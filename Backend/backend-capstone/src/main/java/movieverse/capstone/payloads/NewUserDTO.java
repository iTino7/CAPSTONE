package movieverse.capstone.payloads;

import jakarta.validation.constraints.NotBlank;

public record NewUserDTO(
        @NotBlank(message = "The username is mandatory!")
        String username,
        @NotBlank(message = "The name is mandatory!")
        String name,
        @NotBlank(message = "The email is mandatory!")
        String email,
        @NotBlank(message = "The password is mandatory!")
        String password
) {
}

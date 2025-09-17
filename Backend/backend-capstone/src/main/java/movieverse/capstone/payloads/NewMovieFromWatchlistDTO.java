package movieverse.capstone.payloads;

import jakarta.validation.constraints.NotBlank;

public record NewMovieFromWatchlistDTO(
        @NotBlank(message = "the movie is mandatory")
        String movieId
) {
}

package movieverse.capstone.payloads;

import jakarta.validation.constraints.NotBlank;

public record NewMovieFromWatchlistDTO(
        @NotBlank(message = "the movie id is mandatory")
        String movieId,
        @NotBlank(message = "the title is mandatory")
        String title,
        @NotBlank(message = "the poster is mandatory")
        String poster,
        String name
) {
}

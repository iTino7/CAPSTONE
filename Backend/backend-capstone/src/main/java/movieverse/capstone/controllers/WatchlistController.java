package movieverse.capstone.controllers;


import movieverse.capstone.entities.User;
import movieverse.capstone.entities.Watchlist;
import movieverse.capstone.exception.ValidationException;
import movieverse.capstone.payloads.NewMovieFromWatchlistDTO;
import movieverse.capstone.repositories.UserRepository;
import movieverse.capstone.services.WatchlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/watchlist")
public class WatchlistController {

    @Autowired
    private WatchlistService watchlistService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/watchlist")
    public Page<Watchlist> getUserWatchlist(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy) {
        return watchlistService.getUserWatchlist(page, size, sortBy);
    }

    @PostMapping("/watchlist")
    public Watchlist addMovieToWatchlist(
            @AuthenticationPrincipal User currentUser,
            @RequestBody @Validated NewMovieFromWatchlistDTO payload,
            BindingResult validation) {

        if (validation.hasErrors()) {
            throw new ValidationException(
                    validation.getFieldErrors()
                            .stream()
                            .map(f -> f.getDefaultMessage())
                            .toList()
            );
        }

        return watchlistService.addMovie(payload, currentUser);
    }


    @DeleteMapping("/{id}")
    public void removeFromWatchlist(@PathVariable Long id, @AuthenticationPrincipal User currentUser) {
        watchlistService.removeFromWatchlist(id, currentUser);
    }
}

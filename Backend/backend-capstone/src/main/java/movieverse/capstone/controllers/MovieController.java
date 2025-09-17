package movieverse.capstone.controllers;

import movieverse.capstone.entities.User;
import movieverse.capstone.entities.Watchlist;
import movieverse.capstone.payloads.WatchlistDTO;
import movieverse.capstone.services.TmdbService;
import movieverse.capstone.services.WatchlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movies")
public class MovieController {

    @Autowired
    private TmdbService tmdbService;

    @Autowired
    private WatchlistService watchlistService;

    @GetMapping(value = "/card", produces = "application/json")
    public String getCardsMovie() {
        return tmdbService.getCardsMovie();
    }

    @GetMapping(value = "/movie", produces = "application/json")
    public String getCatalogueMovie() {
        return tmdbService.getCatalogueMovie();
    }

    @GetMapping(value = "/moviePopular", produces = "application/json")
    public String getCatalogueMoviePopular() {
        return tmdbService.getCatalogueMoviePopular();
    }

    @GetMapping(value = "/serie", produces = "application/json")
    public String getCatalogueSerie() {
        return tmdbService.getCatalogueSerie();
    }

    @GetMapping(value = "/seriePopular", produces = "application/json")
    public String getCatalogueSeriePopular() {
        return tmdbService.getCatalogueSeriePopular();
    }

    @GetMapping(value = "/series", produces = "application/json")
    public String getSeries() {
        return tmdbService.getSerie();
    }

    @GetMapping(value = "/movies", produces = "application/json")
    public String getMovie() {
        return tmdbService.getMovie();
    }

    @PostMapping
    public Watchlist addMovie(@RequestBody WatchlistDTO dto,
                              @AuthenticationPrincipal User user) {
        return watchlistService.addMovie(dto.movieId(), user);
    }

    @GetMapping
    public List<Watchlist> getUserWatchlist(@AuthenticationPrincipal User user) {
        return watchlistService.getUserWatchlist(user.getId());
    }

    @DeleteMapping("/{id}")
    public void removeFromWatchlist(@PathVariable Long id, @AuthenticationPrincipal User user) {
        watchlistService.removeFromWatchlist(id, user);
    }

}

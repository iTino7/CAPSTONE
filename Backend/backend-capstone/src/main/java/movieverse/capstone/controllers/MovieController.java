package movieverse.capstone.controllers;

import movieverse.capstone.services.TmdbService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/movies")
public class MovieController {

    @Autowired
    private TmdbService tmdbService;

    @GetMapping(value = "/card", produces = "application/json")
    public String getCardsMovie() {
        return tmdbService.getCardsMovie();
    }
}

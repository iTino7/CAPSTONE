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

    @GetMapping(value = "/searchMovie", produces = "application/json")
    public String getMovieSearch() {
        return tmdbService.getMoviePopular();
    }

    @GetMapping(value = "/trendingSeries", produces = "application/json")
    public String getTrendingSeries() {
        return tmdbService.getSeriesTrending();
    }

    @GetMapping(value = "/featuredSeries", produces = "application/json")
    public String getFeaturedSeries() {
        return tmdbService.getSeriesFeatured();
    }

    @GetMapping(value = "/collection", produces = "application/json")
    public String getCollection() {
        return tmdbService.getCollectionMovie();
    }


}

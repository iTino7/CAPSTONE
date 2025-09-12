package movieverse.capstone.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class TmdbService {

    @Autowired
    private WebClient webClient;

    public String getCardsMovie() {
        return webClient.get()
                .uri("/discover/tv?with_networks=213&language=en-US&page=1")
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    public String getCatalogueMovie() {
        return webClient.get()
                .uri("https://api.themoviedb.org/3/discover/movie?&with_watch_providers=8&watch_region=US&page=1")
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    public String getCatalogueMoviePopular() {
        return webClient.get()
                .uri("https://api.themoviedb.org/3/discover/movie?&with_watch_providers=8&watch_region=US&$sort_by=popularity.desc&page=1")
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    public String getCatalogueSerie() {
        return webClient.get()
                .uri("https://api.themoviedb.org/3/discover/tv?&with_watch_providers=8&watch_region=US&page=1")
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    public String getCatalogueSeriePopular() {
        return webClient.get()
                .uri("https://api.themoviedb.org/3/discover/tv?&with_watch_providers=8&watch_region=US&$sort_by=popularity.desc&page=1")
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }


}

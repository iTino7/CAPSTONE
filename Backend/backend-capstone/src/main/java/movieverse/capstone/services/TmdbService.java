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
}

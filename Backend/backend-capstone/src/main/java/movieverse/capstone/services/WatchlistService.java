package movieverse.capstone.services;


import movieverse.capstone.entities.User;
import movieverse.capstone.entities.Watchlist;
import movieverse.capstone.exception.NotFoundException;
import movieverse.capstone.payloads.NewMovieFromWatchlistDTO;
import movieverse.capstone.repositories.WatchlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WatchlistService {

    @Autowired
    private WatchlistRepository watchlistRepository;

    public Watchlist findById(long id) {
        return this.watchlistRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User not found with this id " + id));
    }

    public Watchlist addMovie(NewMovieFromWatchlistDTO payload, User user) {
        Optional<Watchlist> existing = watchlistRepository.findByUserIdAndMovieId(user.getId(), payload.movieId());
        if (existing.isPresent()) {
            return existing.get();
        }

        Watchlist watchlist = new Watchlist();
        watchlist.setMovieId(payload.movieId());
        watchlist.setTitle(payload.title());
        watchlist.setPoster(payload.poster());
        watchlist.setName(payload.name());
        watchlist.setUser(user);

        return watchlistRepository.save(watchlist);
    }

    public Page<Watchlist> getUserWatchlist(int pageNumber, int pageSize, String sortBy) {
        if (pageSize > 50) pageSize = 50;
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).descending());
        return watchlistRepository.findAll(pageable);
    }

    public void removeFromWatchlist(Long id, User user) {
        Watchlist watchlist = watchlistRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("not found film"));
        if (watchlist.getUser().getId() != user.getId()) {
            throw new RuntimeException("not authorizated");
        }

        watchlistRepository.delete(watchlist);
    }

}

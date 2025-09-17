package movieverse.capstone.services;


import movieverse.capstone.entities.User;
import movieverse.capstone.entities.Watchlist;
import movieverse.capstone.repositories.WatchlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WatchlistService {

    @Autowired
    private WatchlistRepository watchlistRepository;

    public Watchlist addMovie(String movieId, User user) {
        Watchlist watchlist = new Watchlist();
        watchlist.setMovieId(movieId);
        watchlist.setUser(user);
        return watchlistRepository.save(watchlist);
    }

    public List<Watchlist> getUserWatchlist(Long userId) {
        return watchlistRepository.findByUserId(userId);
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

package movieverse.capstone.repositories;

import movieverse.capstone.entities.Watchlist;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WatchlistRepository extends JpaRepository<Watchlist, Long> {
    Page<Watchlist> findByUserId(Long userId, Pageable pageable);

    Optional<Watchlist> findByUserIdAndMovieId(Long userId, String movieId);
}

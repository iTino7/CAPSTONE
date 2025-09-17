package movieverse.capstone.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Entity
@Table(name = "watchlists")
public class Watchlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String movieId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Watchlist() {
    }

    public Watchlist(String movieId) {
        this.movieId = movieId;
    }
}

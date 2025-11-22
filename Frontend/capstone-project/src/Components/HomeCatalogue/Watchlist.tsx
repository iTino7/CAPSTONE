import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import type { Content, Wishlist } from "../../Interface/Watchlist";
import { XCircleFill } from "react-bootstrap-icons";
import FallingText from "../FallingTextProps";
import { API_URL } from "../../config/api";
import type { Result } from "../../Interface/Movie";

function Watchlist() {
  const [watchlist, setWatchlist] = useState<Content[]>([]);
  const [showA, setShowA] = useState(false);
  const toggleShowB = () => setShowA(!showA);
  const navigate: NavigateFunction = useNavigate();

  const fetchWishlist = async () => {
    try {
      const resp = await fetch(`${API_URL}/watchlist/watchlist`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (resp.ok) {
        const data: Wishlist = await resp.json();
        setWatchlist(data.content);
      }
    } catch (error) {
      // Error fetching watchlist
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const deleteFilmWishlist = async (id: number) => {
    try {
      const resp = await fetch(`${API_URL}/watchlist/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (resp.ok) {
        setWatchlist((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      // Error deleting from watchlist
    }
  };

  const handleClick = async (item: Content) => {
    try {
      const mapTmdbToResult = (tmdbData: any, isMovie: boolean): Result => {
        return {
          adult: tmdbData.adult || false,
          backdrop_path: tmdbData.backdrop_path || "",
          genre_ids: tmdbData.genres?.map((g: any) => g.id) || [],
          id: tmdbData.id,
          origin_country: tmdbData.origin_country || (tmdbData.production_countries?.map((c: any) => c.iso_3166_1) || []),
          original_language: tmdbData.original_language || "",
          original_name: tmdbData.original_name || tmdbData.original_title || "",
          overview: tmdbData.overview || "",
          popularity: tmdbData.popularity || 0,
          poster_path: tmdbData.poster_path || "",
          first_air_date: isMovie ? null : (tmdbData.first_air_date ? new Date(tmdbData.first_air_date) as any : null),
          release_date: isMovie ? (tmdbData.release_date ? new Date(tmdbData.release_date) as any : null) : null,
          name: isMovie ? "" : (tmdbData.name || ""),
          title: isMovie ? (tmdbData.title || "") : "",
          vote_average: tmdbData.vote_average || 0,
          vote_count: tmdbData.vote_count || 0,
        };
      };

      const getTmdbApiKey = (): string | null => {
        let tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;
        
        if (tmdbApiKey) {
          return tmdbApiKey;
        }

        try {
          const apiKey = import.meta.env.VITE_API_KEY || import.meta.env.API_KEY;
          if (apiKey && typeof apiKey === 'string' && apiKey.startsWith("eyJ")) {
            const payload = JSON.parse(atob(apiKey.split('.')[1]));
            if (payload.aud && typeof payload.aud === 'string') {
              return payload.aud;
            }
          }
        } catch (error) {
          // Error extracting API key from JWT
        }

        return null;
      };

      const tmdbApiKey = getTmdbApiKey();

      if (!tmdbApiKey) {
        try {
          const searchResp = await fetch(
            `${API_URL}/movies/search?query=${encodeURIComponent(item.title)}`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.API_KEY}`,
              },
            }
          );

          if (searchResp.ok) {
            const searchData = await searchResp.json();
            const foundItem = searchData.results?.find((r: Result) => 
              r.id.toString() === item.movieId || 
              r.title === item.title || 
              r.name === item.title
            );

            if (foundItem) {
            const title = foundItem.title ? foundItem.title.replace(/\s+/g, '_') : foundItem.name.replace(/\s+/g, '_');
            const route = foundItem.title ? `/movie/${title}` : `/series/${title}`;
            navigate(route, { state: foundItem });
              return;
            }
          }
        } catch (error) {
          // Error searching via backend
        }

        return;
      }

      let resp = await fetch(
        `https://api.themoviedb.org/3/movie/${item.movieId}?api_key=${tmdbApiKey}`
      );

      if (resp.ok) {
        const movieData = await resp.json();
        const mappedData = mapTmdbToResult(movieData, true);
        const movieTitle = mappedData.title.replace(/\s+/g, '_');
        navigate(`/movie/${movieTitle}`, { state: mappedData });
        return;
      }

      resp = await fetch(
        `https://api.themoviedb.org/3/tv/${item.movieId}?api_key=${tmdbApiKey}`
      );

      if (resp.ok) {
        const seriesData = await resp.json();
        const mappedData = mapTmdbToResult(seriesData, false);
        const seriesName = mappedData.name.replace(/\s+/g, '_');
        navigate(`/series/${seriesName}`, { state: mappedData });
        return;
      }
    } catch (error) {
      // Error fetching item details
    }
  };

  

  return (
    <Container fluid className="min-vh-100">
      <Row className="">
        <h1 className="text-white fw-light mt-5">My Watchlist</h1>
        {watchlist.length > 0 ? (
          watchlist.map((item) => (
            <Col xs={12} sm={6} md={2} className="mt-2 d-flex flex-column" key={item.id}>
              <div style={{ position: "relative" }}>
                <img
                  onClick={() => handleClick(item)}
                  src={`https://image.tmdb.org/t/p/original${item.poster}`}
                  alt=""
                  width={"100%"}
                  className="mb-2 rounded-3"
                  style={{ cursor: "pointer" }}
                />
                <button
                  style={{ position: "absolute", right: "0px", top: "0px", zIndex: 1 }}
                  className="btn text-danger border-0 "
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteFilmWishlist(item.id);
                    toggleShowB();
                  }}
                >
                  <XCircleFill />
                </button>
              </div>
            </Col>
          ))
        ) : (
          <h4 className="text-white mt-4 fw-semibold">
            <FallingText
              text={`Add a movie or series...`}
              highlightWords={[
                "React",
                "Bits",
                "animated",
                "components",
                "simplify",
              ]}
              highlightClass="highlighted"
              trigger="hover"
              gravity={0.39}
              fontSize="2rem"
              mouseConstraintStiffness={0.1}
            />
          </h4>
        )}
      </Row>
    </Container>
  );
}

export default Watchlist;

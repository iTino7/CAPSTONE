import { Col, Container, Row, Toast } from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons";
import type { Content } from "../../Interface/Watchlist";
import { useState, useEffect, useCallback } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { API_URL } from "../../config/api";
interface MovieandSerieProps {
  img: string;
  description: string;
  title: string;
  movieId: string;
  name: string;
  poster: string;
}

function MovieandSerieBackground({
  img,
  description,
  movieId,
  title,
  name,
  poster,
}: MovieandSerieProps) {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [watchlistItemId, setWatchlistItemId] = useState<number | null>(null);
  const [showA, setShowA] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(true);
  const toggleShowA = () => setShowA(!showA);

  const checkIfInWatchlist = useCallback(async () => {
    try {
      const resp = await fetch(`${API_URL}/watchlist/watchlist`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        const foundItem = data.content.find((item: Content) => item.movieId === movieId);
        if (foundItem) {
          setIsInWatchlist(true);
          setWatchlistItemId(foundItem.id);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [movieId]);

  useEffect(() => {
    checkIfInWatchlist();
  }, [movieId, checkIfInWatchlist]);

  useEffect(() => {
    const imageUrl = `https://image.tmdb.org/t/p/original${img}`;
    const image = new Image();
    
    image.onload = () => {
      setIsImageLoading(false);
    };
    
    image.onerror = () => {
      setIsImageLoading(false);
    };
    
    image.src = imageUrl;
  }, [img]);

  const toggleWatchlist = async () => {
    try {
      if (isInWatchlist && watchlistItemId) {
        const resp = await fetch(`${API_URL}/watchlist/${watchlistItemId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (resp.ok) {
          setIsInWatchlist(false);
          setWatchlistItemId(null);
          setToastMessage(`${title || name} has been removed from the list!`);
          toggleShowA();
        }
      } else {
        const resp = await fetch(`${API_URL}/watchlist/watchlist`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            movieId,
            title: title || name,
            poster: poster,
          }),
        });
        if (resp.ok) {
          const data = await resp.json();
          setIsInWatchlist(true);
          setWatchlistItemId(data.id);
          setToastMessage(`${title || name} has been added to the list!`);
          toggleShowA();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <style>
        {`
          .movie-background-container {
            background: linear-gradient(180deg, rgba(13, 13, 15, 0.1) 12%, rgba(255, 255, 255, 0) 56%, rgba(0, 0, 0, 1) 100%),
                         linear-gradient(0deg, rgba(13, 13, 15, 0.1) 12%, rgba(255, 255, 255, 0) 56%, rgba(0, 0, 0, 1) 100%),
                         url(https://image.tmdb.org/t/p/original${img});
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
          }
          
          @media (max-width: 767px) {
            .movie-background-container {
              background: linear-gradient(180deg, rgba(13, 13, 15, 0.4) 0%, rgba(13, 13, 15, 0.6) 40%, rgba(0, 0, 0, 0.95) 100%),
                           url(https://image.tmdb.org/t/p/w780${poster || img});
              background-size: cover;
              background-repeat: no-repeat;
              background-position: center top;
            }
          }
        `}
      </style>
      <Container
        fluid
        className="no-padding-container relative movie-background-container"
        style={{
          height: "100vh",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
      {isImageLoading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <LoadingSpinner text="Loading content..." />
        </div>
      )}
      <Row className="p-0 m-0">
        <Col className="p-0 m-0">
          <div
            className="text-white fw-light movie-description-scroll"
            style={{ 
              position: "absolute", 
              bottom: 0, 
              left: 0, 
              right: 0,
              padding: "20px",
              background: "linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.85) 60%, rgba(0, 0, 0, 0) 100%)",
              maxHeight: "50vh",
              overflowY: "auto"
            }}
          >
            <div className="mb-2">
              <h4 
              className="text-white fw-light mb-0 text-center"
              style={{
                fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
                lineHeight: "1.5",
                width: "100%",
                display: "inline-block"
              }}
            >
              {description}
              <button className="btn border-0 p-0 ms-2" style={{ verticalAlign: "middle", display: "inline-block" }}>
                {isInWatchlist ? (
                  <StarFill
                    onClick={toggleWatchlist}
                    style={{ color: "#ffd250", fontSize: "1rem", marginBottom: "0.25rem" }}
                  />
                ) : (
                  <Star
                    onClick={toggleWatchlist}
                    style={{ color: "#ffd250", fontSize: "1rem", marginBottom: "0.25rem" }}
                  />
                )}
              </button>
            </h4>
            </div>
          </div>
        </Col>
        <Toast
          style={{ position: "absolute", bottom: "40px", right: "40px" }}
          show={showA}
          onClose={toggleShowA}
        >
          <Toast.Header className="bg-transparent border-0">
            <strong className="me-auto">MovieVerse</strong>
          </Toast.Header>
          <Toast.Body>
            {toastMessage}
          </Toast.Body>
        </Toast>
      </Row>
    </Container>
    </>
  );
}

export default MovieandSerieBackground;

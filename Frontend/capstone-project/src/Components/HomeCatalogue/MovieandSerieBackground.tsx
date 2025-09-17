import { Col, Container, Row } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";
import type { Content } from "../../Interface/Watchlist";
import { useState } from "react";

interface MovieandSerieProps {
  img: string;
  description: string;
  title: string;
  movieId: string;
  poster: string;
}

function MovieandSerieBackground({ img, description, movieId, title, poster }: MovieandSerieProps) {
  const [, setWatchlist] = useState<Content[]>([]);

  const fetchWishlist = async (movieId: string, title: string,  poster: string) => {
    try {
      const resp = await fetch("http://localhost:3002/watchlist/watchlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ movieId, title, poster }),
      });
      if (resp.ok) {
        const data = await resp.json();
        setWatchlist((prev) => [...prev, data]);
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Container
      fluid
      className="no-padding-container relative"
      style={{
        background: `
      linear-gradient(180deg, rgba(13, 13, 15, 0.1) 12%, rgba(255, 255, 255, 0) 56%, rgba(0, 0, 0, 1) 100%),
      linear-gradient(0deg, rgba(13, 13, 15, 0.1) 12%, rgba(255, 255, 255, 0) 56%, rgba(0, 0, 0, 1) 100%),
      url(https://image.tmdb.org/t/p/original${img})
    `,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
        width: "100%",
        position: "absolute",

        top: 0,
        left: 0,
      }}
    >
      <Row className="p-0 m-0">
        <Col className="p-0 m-0">
          <h4
            className="text-white fw-light mb-0 w-50 mb-5 ms-4"
            style={{ position: "absolute", bottom: 20, left: 0, right: 0 }}
          >
            {description}
            <button className="btn" onClick={() => fetchWishlist(movieId, title, poster)}>
              <StarFill className="mb-1" style={{ color: "	#ffd250" }} />
            </button>
          </h4>
        </Col>
      </Row>
    </Container>
  );
}

export default MovieandSerieBackground;

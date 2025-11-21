import { Col, Container, Modal, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import type { MovieCard, Result } from "../../Interface/Movie";
import LoadingSpinner from "../LoadingSpinner";
import { API_URL } from "../../config/api";
import Magnet from "../Magnet";
import SplitText from "../SplitText";

function AdvFetchandMovies() {
  const [movie, setMovie] = useState<Result[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [selectMovie, setSelectedMovie] = useState<Result | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  const fetchCard = async () => {
    try {
      setIsLoading(true);
      const resp = await fetch(`${API_URL}/movies/card`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.API_KEY}`,
        },
      });
      if (resp.ok) {
        const data: MovieCard = await resp.json();
        setMovie(data.results);
      } else {
        throw new Error("Errore nel caricamento dei dati");
      }
    } catch (err) {
      if (err) setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCard();
  }, []);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768); // 768px è il breakpoint md di Bootstrap
    };

    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);

    return () => {
      window.removeEventListener('resize', checkIsDesktop);
    };
  }, []);

  return (
    <Container fluid className="bg-black py-4" style={{ position: "relative", isolation: "isolate" }}>
      <div className="d-flex flex-column align-items-center customTitleAdv" style={{ isolation: "auto" }}>
        <Magnet padding={200} disabled={false} magnetStrength={5}>
          <h1
            className="text-center title text-white"
            style={{
              fontFamily: " DM Sans, sans-serif",
            }}
          >
            <SplitText
              text={`" See what's next "`}
              className="text-2xl font-semibold text-center"
              delay={150}
              duration={1.0}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.4}
              rootMargin="-100px"
              textAlign="center"
              onLetterAnimationComplete={undefined}
            />
          </h1>
        </Magnet>
      </div>

      {error && <h2 className="text-danger text-center">{error}.</h2>}
      
      {isLoading ? (
        <LoadingSpinner className="py-5" text="Loading featured content..." />
      ) : (
        <Row className="textAdv d-flex justify-content-around" style={{ position: "relative", zIndex: 2 }}>
          {movie.slice(0, 6).map((item) => (
          <React.Fragment key={item.id}>
            <Col key={item.id} xs={12} sm={6} md={4} lg={8}></Col>
            <Col xs={12} sm={6} md={5} lg={4} className="mb-4 mb-sm-4">
              <img
                onClick={() => setSelectedMovie(item)}
                className="rounded-3"
                src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                height={400}
                alt={item.name}
                style={{
                  objectFit: "contain",
                  cursor: "pointer",
                  zIndex: "2",
                  position: "relative",
                }}
              />
            </Col>
            <Col xs={12} sm={6} md={4} lg={3}></Col>
          </React.Fragment>
          ))}
        </Row>
      )}
      
      <Modal
          show={!!selectMovie}
          onHide={() => setSelectedMovie(null)}
          size={isDesktop ? "lg" : "sm"}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="bg-transparent"
          dialogClassName="modal-dialog-centered"
          style={{ zIndex: 9999 }}
        >
          <Modal.Body
            className="rounded-3 modal-background-responsive p-0"
            style={{
              background: selectMovie?.backdrop_path 
                ? `linear-gradient(180deg, rgba(13, 13, 15, 0.1) 12%, rgba(255, 255, 255, 0) 56%, rgba(0, 0, 0, 1) 100%), url(https://image.tmdb.org/t/p/original${selectMovie.backdrop_path})`
                : selectMovie?.poster_path
                ? `linear-gradient(180deg, rgba(13, 13, 15, 0.1) 12%, rgba(255, 255, 255, 0) 56%, rgba(0, 0, 0, 1) 100%), url(https://image.tmdb.org/t/p/original${selectMovie.poster_path})`
                : 'linear-gradient(180deg, rgba(13, 13, 15, 0.1) 12%, rgba(255, 255, 255, 0) 56%, rgba(0, 0, 0, 1) 100%)',
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: isDesktop ? "60vh" : "300px",
              maxHeight: isDesktop ? "60vh" : "300px",
              width: "100%",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: `linear-gradient(180deg, rgba(13, 13, 15, 0.1) 12%, rgba(255, 255, 255, 0) 56%, rgba(0, 0, 0, 1) 100%)`,
                zIndex: 1,
              }}
            />
            <button
              onClick={() => setSelectedMovie(null)}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                zIndex: 10,
                backgroundColor: "transparent",
                border: "none",
                width: "40px",
                height: "40px",
                color: "white",
                fontSize: "32px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label="Close"
            >
              ×
            </button>
          </Modal.Body>
          <Modal.Footer 
            className="border-0 justify-content-center flex-column p-0"
            style={{ 
              position: "relative", 
              zIndex: 2,
              backgroundColor: "rgba(0, 0, 0, 0.95)",
              paddingTop: "20px",
              paddingBottom: "20px"
            }}
          >
            <div className="title text-center mb-3 text-white px-3">
              <h1 style={{ fontSize: "clamp(1.2rem, 4vw, 1.8rem)" }}>
                {selectMovie?.name || selectMovie?.title}
              </h1>
            </div>
            <div 
              className="text-white text-center px-3 movie-description-scroll"
              style={{ 
                fontSize: "clamp(0.85rem, 2.5vw, 1rem)",
                lineHeight: "1.6",
                maxHeight: "40vh",
                overflowY: "auto",
                paddingBottom: "10px"
              }}
            >
              {selectMovie?.overview}
            </div>
          </Modal.Footer>
        </Modal>
    </Container>
  );
}

export default AdvFetchandMovies;

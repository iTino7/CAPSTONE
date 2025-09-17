import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import type { Content, Wishlist } from "../../Interface/Watchlist";

function Watchlist() {
  const [watchlist, setWatchlist] = useState<Content[]>([]);

  const fetchWishlist = async () => {
    try {
      const resp = await fetch("http://localhost:3002/watchlist/watchlist", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (resp.ok) {
        const data: Wishlist = await resp.json();
        setWatchlist(data.content);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const deleteFilmWishlist = async (id: number) => {
    try {
      const resp = await fetch(`http://localhost:3002/watchlist/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (resp.ok) {
        setWatchlist((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(watchlist);

  return (
    <Container fluid className="min-vh-100">
      <Row className="">
        <h1 className="text-white fw-light">My Watchlist</h1>
        {watchlist.length > 0 ? (
          watchlist.map((item) => (
            <Col xs={12} sm={6} md={2} className="mt-5 d-flex flex-column">
              <img
                src={`https://image.tmdb.org/t/p/original${item.poster}`}
                alt=""
                width={"100%"}
                className="my-3 rounded-3 pe-auto"
                style={{ cursor: "pointer" }}
              />
              <button
                onClick={() => deleteFilmWishlist(item.id)}
                className="btn text-white"
              >
                ciao
              </button>
            </Col>
          ))
        ) : (
          <h1 className="text-white">Aggiungi un film o una serie...</h1>
        )}
      </Row>
    </Container>
  );
}

export default Watchlist;

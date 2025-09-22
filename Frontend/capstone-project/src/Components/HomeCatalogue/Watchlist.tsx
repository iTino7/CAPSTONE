import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import type { Content, Wishlist } from "../../Interface/Watchlist";
import { XCircleFill } from "react-bootstrap-icons";
import FallingText from "../FallingTextProps";

function Watchlist() {
  const [watchlist, setWatchlist] = useState<Content[]>([]);
  const [showA, setShowA] = useState(false);
  const toggleShowB = () => setShowA(!showA);
  

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
        <h1 className="text-white fw-light mt-5">My Watchlist</h1>
        {watchlist.length > 0 ? (
          watchlist.map((item) => (
            <Col xs={12} sm={6} md={2} className="mt-2 d-flex flex-column">
              <div style={{ position: "relative" }}>
                <img
                  src={`https://image.tmdb.org/t/p/original${item.poster}`}
                  alt=""
                  width={"100%"}
                  className="mb-2 rounded-3"
                />
                <button
                  style={{ position: "absolute", right: "0px" }}
                  className="btn text-danger border-0 "
                >
                  <XCircleFill
                    onClick={() => {
                      deleteFilmWishlist(item.id);
                      toggleShowB();
                    }}
                  />
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

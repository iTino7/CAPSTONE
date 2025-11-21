import { Col, Container, Form, FormControl, Row } from "react-bootstrap";
import ComponentSearch from "./ComponentSearch";
import { useState } from "react";
import type { MovieCard, Result } from "../../Interface/Movie";
import { API_URL } from "../../config/api";
import LoadingSpinner from "../LoadingSpinner";

function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState<Result[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setData([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    try {
      let resp = await fetch(
        `${API_URL}/movies/search?query=${encodeURIComponent(query)}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.API_KEY}`,
          },
        }
      );

      if (!resp.ok) {
        let tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;
        
        if (!tmdbApiKey) {
          try {
            const apiKey = import.meta.env.VITE_API_KEY || import.meta.env.API_KEY;
            if (apiKey && apiKey.startsWith("eyJ")) {
              const payload = JSON.parse(atob(apiKey.split('.')[1]));
              if (payload.aud && typeof payload.aud === 'string') {
                tmdbApiKey = payload.aud;
              }
            }
          } catch {
          }
        }
        
        if (!tmdbApiKey) {
          console.error("TMDB API key not found");
          setData([]);
          return;
        }
        
        resp = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=${tmdbApiKey}&query=${encodeURIComponent(query)}`
        );
      }

      if (resp.ok) {
        const data: MovieCard = await resp.json();

        const filtered = data.results.filter((item: Result) => {
          const dateStr = item.release_date || item.first_air_date;
          if (!dateStr) return false;
          if (!item.poster_path) return false;

          const year = new Date(dateStr).getFullYear();
          return year > 2012 && year < 2025;
        });

        setData(filtered);
      } else {
        console.error("Error searching:", resp.statusText);
        setData([]);
      }
    } catch (error) {
      console.log(error);
      setData([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      performSearch(searchInput);
    }
  };

  return (
    <Container fluid style={{ backgroundColor: "#121212", minHeight: "100vh" }}>
      <Row>
        <div className="mt-3">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col xs={12}>
                <FormControl
                  type="text"
                  placeholder="Search by title, character, or genre"
                  className="bg-transparent border-0 customPlaceholder mb-5 text-white fs-3 w-100"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </Col>
            </Row>
          </Form>
          {(isSearching || data.length > 0) && (
            <Col>
              <h3 className="text-white mb-4 fs-3">Search results</h3>
              {isSearching ? (
                <div className="mb-5">
                  <LoadingSpinner text="Searching..." />
                </div>
              ) : data.length > 0 ? (
                <div className="slider-container mb-5">
                  <ComponentSearch
                    title=""
                    results={data}
                  />
                </div>
              ) : (
                <div className="text-white text-center mb-5">
                  <p>No results found</p>
                </div>
              )}
            </Col>
          )}
          <Col>
            <ComponentSearch
              title="Popular searches"
              fetchCategory="searchMovie"
              filterCategory="movie"
            />
          </Col>
          <Col>
            <ComponentSearch
              title="Trending searches"
              fetchCategory="trendingSeries"
              filterCategory="movie"
            />
          </Col>
          <Col>
            <ComponentSearch
              title="Featured"
              fetchCategory="featuredSeries"
              filterCategory="series"
            />
          </Col>
          <Col>
            <ComponentSearch
              title="All collections"
              fetchCategory="collection"
              filterCategory="movie"
            />
          </Col>
        </div>
      </Row>
    </Container>
  );
}

export default Search;

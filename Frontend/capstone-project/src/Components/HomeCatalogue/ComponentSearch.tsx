import React, { useEffect, useState } from "react";
import { Col, Container } from "react-bootstrap";
import type { MovieCard, Result } from "../../Interface/Movie";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config/api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface SearchProps {
  title?: string;
  fetchCategory?: string;
  filterCategory?: string;
  results?: Result[]; 
}

function ComponentSearch({
  title,
  fetchCategory,
  filterCategory,
  results
}: SearchProps) {
  const [data, setData] = useState<Result[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const handleClick = (item: Result) => {
    navigate(`/${filterCategory}/${item.name || item.title}`, { state: item });
  };

  // Settings solo per mobile (uno alla volta, senza autoplay)
  const mobileSettings = {
    dots: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
    ],
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setHasMoved(false);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setHasMoved(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setHasMoved(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    
    // Se c'è movimento significativo, è un drag
    if (Math.abs(walk) > 5) {
      setHasMoved(true);
      e.preventDefault();
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setHasMoved(false);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    
    if (Math.abs(walk) > 5) {
      setHasMoved(true);
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setHasMoved(false);
  };

  const fetchData = async () => {
    if (!fetchCategory) return;
    try {
      const resp = await fetch(
        `${API_URL}/movies/${fetchCategory}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.API_KEY}`
          },
        }
      );
      if (resp.ok) {
        const respData: MovieCard = await resp.json();
        setData(respData.parts || respData.results);
      } else {
        console.error("Error fetching data:", resp.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

   useEffect(() => {
    if (!results) { 
      fetchData();
    } else {
      setData(results);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchCategory, results]);

  console.log(data);

  return (
    <Col>
      <h3 className="text-white mb-4 fs-3">{title}</h3>
      <Container fluid className="slider-container mb-5">
        <style>
          {`
            @media (min-width: 768px) {
              .search-scroll-container::-webkit-scrollbar {
                display: none;
              }
              .search-scroll-container {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            }
            @media (max-width: 767px) {
              .slider-container .slick-slide {
                padding-right: 0 !important;
                text-align: center;
                display: flex !important;
                justify-content: center !important;
                align-items: center !important;
              }
              .slider-container .slick-list {
                text-align: center;
              }
              .slider-container .slick-track {
                display: flex !important;
                align-items: center;
              }
            }
          `}
        </style>
        {/* Desktop: 6 film visibili con scroll orizzontale */}
        <div 
          ref={scrollContainerRef}
          className="d-none d-md-flex search-scroll-container"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            overflowX: "auto",
            overflowY: "hidden",
            display: "flex",
            gap: "15px",
            paddingBottom: "10px",
            scrollbarWidth: "none",
            width: "100%",
            cursor: isDragging ? "grabbing" : "grab",
            userSelect: "none",
            WebkitUserSelect: "none"
          }}
        >
          {data.map((item) => (
            <div
              key={item.id}
              style={{
                flex: "0 0 calc((100% - 75px) / 6)",
                marginBottom: "1rem"
              }}
            >
              <img
                onClick={() => {
                  if (!hasMoved) {
                    handleClick(item);
                  }
                }}
                style={{ cursor: isDragging ? "grabbing" : "pointer", borderRadius: "6px", width: "100%", height: "auto", display: "block" }}
                alt={item.title || item.name}
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* Mobile: slider uno alla volta senza autoplay */}
        <div className="d-md-none" style={{ textAlign: "center" }}>
          <div style={{ maxWidth: "100%", width: "100%", textAlign: "center" }}>
            <Slider {...mobileSettings}>
              {data.map((item) => (
                <div 
                  key={item.id} 
                  style={{ 
                    display: "flex", 
                    justifyContent: "center", 
                    alignItems: "center",
                    textAlign: "center",
                    paddingRight: "0"
                  }}
                >
                  <img
                    onClick={() => handleClick(item)}
                    style={{ 
                      borderRadius: "6px", 
                      cursor: "pointer",
                      maxWidth: "80%",
                      margin: "0 auto",
                      display: "block"
                    }}
                    alt={item.title || item.name}
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </Container>
    </Col>
  );
}

export default ComponentSearch;

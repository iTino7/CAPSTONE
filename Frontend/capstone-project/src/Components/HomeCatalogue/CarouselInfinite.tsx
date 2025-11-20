import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Container } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import type { MovieCard, Result } from "../../Interface/Movie";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import { API_URL } from "../../config/api";

interface FilterSearch {
  filterFetch: string;
  filterCategory: string;
}

function CarouselInfinite({ filterFetch, filterCategory }: FilterSearch) {
  const [movie, setMovie] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

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

  const handleClick = (item: Result) => {
    navigate(`/${filterCategory}/${item.name}`, { state: item });
  };

  const fetchMovie = async () => {
    try {
      setIsLoading(true);
      const resp = await fetch(`${API_URL}/movies/${filterFetch}`, {
        headers: {
          Authorization:
            `Bearer ${import.meta.env.API_KEY}`,
        },
      });
      if (resp.ok) {
        const data: MovieCard = await resp.json();
        setMovie(data.results);
      } else {
        throw new Error("Errore");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  if (isLoading) {
    return <LoadingSpinner className="py-5" text="Loading content..." />;
  }

  return (
    <Container fluid className="slider-container mt-5">
      <style>
        {`
          @media (min-width: 768px) {
            .desktop-scroll-container::-webkit-scrollbar {
              display: none;
            }
            .desktop-scroll-container {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          }
        `}
      </style>
      {/* Desktop: 6 film visibili con scroll orizzontale */}
      <div 
        ref={scrollContainerRef}
        className="d-none d-md-flex desktop-scroll-container"
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
        {movie.map((item) => (
          <div
            key={item.id}
            style={{
              flex: "0 0 calc((100% - 75px) / 6)",
              marginBottom: "1rem"
            }}
          >
            <div
              style={{ position: "relative" }}
            >
              <img
                className="imgHover"
                onClick={(e) => {
                  // Se non c'è stato movimento durante il drag, è un click
                  if (!hasMoved) {
                    e.stopPropagation();
                    handleClick(item);
                  }
                }}
                src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                width={"100%"}
                style={{ objectFit: "cover", borderRadius: "6px", cursor: isDragging ? "grabbing" : "pointer", height: "auto", display: "block" }}
                draggable={false}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: slider uno alla volta senza autoplay */}
      <div className="d-md-none" style={{ textAlign: "center" }}>
        <style>
          {`
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
        <div style={{ maxWidth: "100%", width: "100%", textAlign: "center" }}>
          <Slider {...mobileSettings}>
            {movie.map((item) => (
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
                  className="imgHover"
                  onClick={() => handleClick(item)}
                  src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                  style={{ 
                    objectFit: "cover", 
                    borderRadius: "6px", 
                    cursor: "pointer",
                    maxWidth: "80%",
                    margin: "0 auto",
                    display: "block"
                  }}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </Container>
  );
}

export default CarouselInfinite;

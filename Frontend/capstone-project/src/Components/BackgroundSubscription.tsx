import { useEffect, useState } from "react";
import type { Plans } from "../Interface/PlansInterface";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { API_URL } from "../config/api";

interface BackgroundSubscriptionProps {
  textColorCustom: string;
}

// Hook per rilevare se siamo su mobile
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

function BackgroundSubscription({
  textColorCustom,
}: BackgroundSubscriptionProps) {
  const [plans, setPlans] = useState<Plans[]>([]);
  const isMobile = useIsMobile();

  const navigate = useNavigate();

  const fetchPlans = async () => {
    try {
      const resp = await fetch(
        `${API_URL}/subscription/v1/stripe/plans`,
        {}
      );
      if (resp.ok) {
        const data: Plans[] = await resp.json();
        setPlans(data);
      }
    } catch (error) {
      // Error fetching plans
    }
  };

  const quantity: number = 1;

  const userId = localStorage.getItem("userId");
  const [loadingButtonId, setLoadingButtonId] = useState<string | null>(null);

  const fetchStripe = async (priceId: string, plan: string) => {
    if (userId === "undefined" || userId === null) {
      navigate("/auth/signup");
      return;
    }

    setLoadingButtonId(priceId);
    try {
      const resp = await fetch(
        `${API_URL}/subscription/v1/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            priceId,
            quantity,
            userId,
            plan,
          }),
        }
      );

      if (!resp.ok) {
        throw new Error("Errore nella richiesta a Stripe");
      }

      const data = await resp.json();

      if (data.sessionUrl) {
        window.location.href = data.sessionUrl;
      }
    } catch (error) {
      alert("Error processing payment. Please try again.");
      setLoadingButtonId(null);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center my-3"
      style={{ minHeight: isMobile ? "auto" : "100vh" }}
    >
      <Row className="d-flex justify-content-center w-100">
        {plans.length > 0 ? (
          plans
            .reverse()
            .slice(0, 3)
            .map((item) => (
              <Col
                className="d-flex me-0 me-md-5 flex-column justify-content-between border-sm-0 my-2 my-md-0 border rounded-3 px-3 px-md-4 py-3 py-md-4"
                key={item.productId}
                xs={12}
                sm={10}
                md={3}
              >
                <h1
                  className={`${textColorCustom} text-center mb-3 mb-md-5 mt-2 mt-md-3`}
                  style={{
                    fontSize: isMobile ? "1.5rem" : "1.75rem",
                  }}
                >
                  {item.name}
                </h1>
                <div style={{ fontSize: isMobile ? "0.9rem" : "1rem" }}>
                  <p className={`${textColorCustom} mb-0 fw-bolder`}>
                    Monthly price
                  </p>
                  <p className={`${textColorCustom} mb-1`}>
                    {item.metadati.Monthly_price}
                  </p>
                  <span className="border-bottom mt-0 mb-2 mb-md-3 d-block"></span>
                  <p className={`${textColorCustom} mb-0 fw-bolder`}>
                    Video and sound quality
                  </p>
                  <p className={`${textColorCustom} mb-1`}>
                    {item.metadati.Video_and_sound_quality}
                  </p>
                  <span className="border-bottom mt-0 mb-2 mb-md-3 d-block"></span>
                  <p className={`${textColorCustom} mb-0 fw-bolder`}>
                    Resolution
                  </p>
                  <p className={`${textColorCustom} mb-1`}>
                    {item.metadati.Resolution}
                  </p>
                  <span className="border-bottom mt-0 mb-2 mb-md-3 d-block"></span>
                  {item.metadati?.Spatial_audio ? (
                    <>
                      <p className={`${textColorCustom} mb-0 fw-bolder`}>
                        Spatial audio
                      </p>
                      <p className={`${textColorCustom} mb-1`}>
                        {item.metadati.Spatial_audio}
                      </p>
                      <span className="border-bottom mt-0 mb-2 mb-md-3 d-block"></span>
                    </>
                  ) : (
                    <></>
                  )}
                  <p className={`${textColorCustom} mb-0 fw-bolder`}>
                    Supported devices
                  </p>
                  <p className={`${textColorCustom} mb-1`}>
                    {item.metadati.Supported_devices}
                  </p>
                  <span className="border-bottom mt-0 mb-2 mb-md-3 d-block"></span>
                  <p className={`${textColorCustom} mb-0 fw-bolder`}>
                    Devices your household can watch at the same time
                  </p>
                  <p className={`${textColorCustom} mb-1`}>
                    {item.metadati.Devices_same_time}
                  </p>
                  <span className="border-bottom mt-0 mb-2 mb-md-3 d-block"></span>
                  <p className={`${textColorCustom} mb-0 fw-bolder`}>
                    Download devices
                  </p>
                  <p className={`${textColorCustom} mb-1`}>
                    {item.metadati.Download_devices}
                  </p>
                  <span className="border-bottom mt-0 mb-2 mb-md-3 d-block"></span>
                  <p className={`${textColorCustom} mb-0 fw-bolder`}>Ads</p>
                  <p className={`${textColorCustom} mb-1`}>
                    {item.metadati.Ads}
                  </p>
                </div>
                <button
                  onClick={() => {
                    fetchStripe(
                      item.prices[0].priceId,
                      item.name.toUpperCase().replace(/ /g, "_")
                    );
                  }}
                  className="btn text-white my-2 my-md-3 d-flex align-items-center justify-content-center gap-2"
                  style={{
                    backgroundColor: "#e50914",
                    fontSize: isMobile ? "0.9rem" : "1rem",
                    padding: isMobile ? "0.5rem 1rem" : "0.75rem 1.5rem",
                  }}
                  disabled={loadingButtonId === item.prices[0].priceId}
                >
                  {loadingButtonId === item.prices[0].priceId && (
                    <Spinner
                      animation="border"
                      size="sm"
                      variant="light"
                      style={{ width: "16px", height: "16px" }}
                    />
                  )}
                  {loadingButtonId === item.prices[0].priceId ? "Processing..." : "Next"}
                </button>
              </Col>
            ))
        ) : (
          <div>
            <Spinner animation="border" />
          </div>
        )}
      </Row>
    </Container>
  );
}

export default BackgroundSubscription;

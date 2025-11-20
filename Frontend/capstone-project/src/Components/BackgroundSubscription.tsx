import { useEffect, useState } from "react";
import type { Plans } from "../Interface/PlansInterface";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { API_URL } from "../config/api";

interface BackgroundSubscriptionProps {
  textColorCustom: string;
}

function BackgroundSubscription({
  textColorCustom,
}: BackgroundSubscriptionProps) {
  const [plans, setPlans] = useState<Plans[]>([]);

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
      console.log(error);
    }
  };

  const quantity: number = 1;

  const userId = localStorage.getItem("userId");

  const fetchStripe = async (priceId: string, plan: string) => {
    if (userId === "undefined" || userId === null) {
      navigate("/auth/signup");
      return;
    }

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
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <Container
      fluid
      className=" d-flex justify-content-center align-items-center my-3 "
      style={{ minHeight: "100vh" }}
    >
      <Row className=" d-flex justify-content-center ">
        {plans.length > 0 ? (
          plans
            .reverse()
            .slice(0, 3)
            .map((item) => (
              <Col
                className="d-flex me-0 me-md-5 flex-column justify-content-between border-sm-0 my-3 my-md-0 border rounded-3"
                key={item.productId}
                xs={12}
                sm={12}
                md={3}
              >
                <h1
                  className={` ${textColorCustom} text-center fs-3 mb-5 mt-3`}
                >
                  {item.name}
                </h1>
                <p className={` ${textColorCustom} mb-0 fw-bolder`}>
                  Monthly price
                </p>
                <p className={` ${textColorCustom} mb-1`}>
                  {item.metadati.Monthly_price}
                </p>
                <span className="border-bottom mt-0 mb-3"></span>
                <p className={` ${textColorCustom} mb-0 fw-bolder`}>
                  Video and sound quality
                </p>
                <p className={` ${textColorCustom} mb-1`}>
                  {item.metadati.Video_and_sound_quality}
                </p>
                <span className="border-bottom mt-0 mb-3"></span>
                <p className={` ${textColorCustom} mb-0 fw-bolder`}>
                  Resolution
                </p>
                <p className={` ${textColorCustom} mb-1`}>
                  {item.metadati.Resolution}
                </p>
                <span className="border-bottom mt-0 mb-3"></span>
                {item.metadati?.Spatial_audio ? (
                  <>
                    <p className={` ${textColorCustom} mb-0 fw-bolder`}>
                      Spatial audio
                    </p>
                    <p className={` ${textColorCustom} mb-1`}>
                      {item.metadati.Spatial_audio}
                    </p>
                    <span className="border-bottom mt-0 mb-3"></span>
                  </>
                ) : (
                  <></>
                )}
                <p className={` ${textColorCustom} mb-0 fw-bolder`}>
                  Supported devices
                </p>
                <p className={` ${textColorCustom} mb-1`}>
                  {item.metadati.Supported_devices}
                </p>
                <span className="border-bottom mt-0 mb-3"></span>
                <p className={` ${textColorCustom} mb-0 fw-bolder`}>
                  Devices your household can watch at the same time
                </p>
                <p className={` ${textColorCustom} mb-1`}>
                  {item.metadati.Devices_same_time}
                </p>
                <span className="border-bottom mt-0 mb-3"></span>
                <p className={` ${textColorCustom} mb-0 fw-bolder`}>
                  Download devices
                </p>
                <p className={` ${textColorCustom} mb-1`}>
                  {item.metadati.Download_devices}
                </p>
                <span className="border-bottom mt-0 mb-3"></span>
                <p className={` ${textColorCustom} mb-0 fw-bolder`}>Ads</p>
                <p className={` ${textColorCustom} mb-1`}>
                  {item.metadati.Ads}
                </p>
                <button
                  onClick={() => {
                    fetchStripe(
                      item.prices[0].priceId,
                      item.name.toUpperCase().replace(/ /g, "_")
                    );
                    console.log(item.name.toUpperCase().replace(/ /g, "_"));
                  }}
                  className="btn text-white my-3"
                  style={{ backgroundColor: "#e50914" }}
                >
                  Next
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

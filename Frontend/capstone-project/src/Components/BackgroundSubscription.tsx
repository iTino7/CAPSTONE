import { useEffect, useState } from "react";
import type { Plans } from "../Interface/PlansInterface";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

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
        "http://localhost:3002/subscription/v1/stripe/plans",
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

  console.log(userId);

  const fetchStripe = async (priceId: string) => {
    if (userId === "undefined") {
      navigate("/auth/signup");
      return;
    }

    try {
      const resp = await fetch(
        "http://localhost:3002/subscription/v1/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            priceId,
            quantity,
            userId,
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
      className=" d-flex justify-content-center align-items-center "
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
                <h1 className={` ${textColorCustom} text-center my-3`}>
                  {item.name}
                </h1>
                <p className={` ${textColorCustom} mb-0 fw-bolder`}>
                  Quota mensile
                </p>
                <p className={` ${textColorCustom} mb-1`}>
                  {item.metadati.Quota_mensile}
                </p>
                <span className="border-bottom mt-0 mb-3"></span>
                <p className={` ${textColorCustom} mb-0 fw-bolder`}>
                  Qualità audio e video
                </p>
                <p className={` ${textColorCustom} mb-1`}>
                  {item.metadati.Qualità_audio_e_video}
                </p>
                <span className="border-bottom mt-0 mb-3"></span>
                <p className={` ${textColorCustom} mb-0 fw-bolder`}>
                  Risoluzione
                </p>
                <p className={` ${textColorCustom} mb-1`}>
                  {item.metadati.Risoluzione}
                </p>
                <span className="border-bottom mt-0 mb-3"></span>
                {item.metadati?.Audio_spaziale ? (
                  <>
                    <p className={` ${textColorCustom} mb-0 fw-bolder`}>
                      Audio spaziale
                    </p>
                    <p className={` ${textColorCustom} mb-1`}>
                      {item.metadati.Audio_spaziale}
                    </p>
                    <span className="border-bottom mt-0 mb-3"></span>
                  </>
                ) : (
                  <></>
                )}
                <p className={` ${textColorCustom} mb-0 fw-bolder`}>
                  Dispositivi supportati
                </p>
                <p className={` ${textColorCustom} mb-1`}>
                  {item.metadati.Dispositivi_supportati}
                </p>
                <span className="border-bottom mt-0 mb-3"></span>
                <p className={` ${textColorCustom} mb-0 fw-bolder`}>
                  Dispositivi su cui il tuo nucleo domestico può guardare
                  Netflix contemporaneamente
                </p>
                <p className={` ${textColorCustom} mb-1`}>
                  {item.metadati.Dispositivi_connessi_contemporaneamente}
                </p>
                <span className="border-bottom mt-0 mb-3"></span>
                <p className={` ${textColorCustom} mb-0 fw-bolder`}>
                  Dispositivi su cui sono consentiti i download
                </p>
                <p className={` ${textColorCustom} mb-1`}>
                  {item.metadati.Dispositivi_per_i_download}
                </p>
                <span className="border-bottom mt-0 mb-3"></span>
                <p className={` ${textColorCustom} mb-0 fw-bolder`}>
                  Pubblicità
                </p>
                <p className={` ${textColorCustom} mb-1`}>
                  {item.metadati.Pubblicità}
                </p>
                <button
                  onClick={() => {
                    fetchStripe(item.prices[0].priceId);
                  }}
                  className="btn text-white my-3"
                  style={{ backgroundColor: "#e50914" }}
                >
                  Continua
                </button>
              </Col>
            ))
        ) : (
          <p>...</p>
        )}
      </Row>
    </Container>
  );
}

export default BackgroundSubscription;

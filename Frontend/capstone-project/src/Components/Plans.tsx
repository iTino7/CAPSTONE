import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import type { Plans } from "../Interface/Plans";

function Plans() {
  const [plans, setPlans] = useState<Plans[]>([]);

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
      console.log("Stripe response:", data);

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
      className="bg-dark w-100 d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Row>
        {plans.length > 0 ? (
          plans.reverse().map((item) => (
            <Col
              className="d-flex flex-column justify-content-between"
              key={item.productId}
              xs={12}
              sm={4}
            >
              <h1 className="text-white text-center">{item.name}</h1>
              <h5 className="text-white text-center">Quota mensile</h5>
              <p className="text-white mb-0 text-center">
                {item.metadati.Quota_mensile}
              </p>
              <h5 className="text-white text-center">Qualità audio e video</h5>
              <p className="text-white mb-0 text-center">
                {item.metadati.Qualità_audio_e_video}
              </p>
              <h5 className="text-white text-center">Risoluzione</h5>
              <p className="text-white mb-0 text-center">
                {item.metadati.Risoluzione}
              </p>
              {item.metadati?.Audio_spaziale ? (
                <>
                  <h5 className="text-white text-center">Audio spaziale</h5>
                  <p className="text-white mb-0 text-center">
                    <p>{item.metadati.Audio_spaziale}</p>
                  </p>
                </>
              ) : (
                <></>
              )}
              <h5 className="text-white text-center">Dispositivi supportati</h5>
              <p className="text-white mb-0 text-center">
                {item.metadati.Dispositivi_supportati}
              </p>
              <h5 className="text-white text-center">
                Dispositivi su cui il tuo nucleo domestico può guardare Netflix
                contemporaneamente
              </h5>
              <p className="text-white mb-0 text-center">
                {item.metadati.Dispositivi_connessi_contemporaneamente}
              </p>
              <h5 className="text-white text-center">
                Dispositivi su cui sono consentiti i download
              </h5>
              <p className="text-white mb-0 text-center">
                {item.metadati.Dispositivi_per_i_download}
              </p>
              <h5 className="text-white text-center">Pubblicità</h5>
              <p className="text-white mb-0 text-center">
                {item.metadati.Pubblicità}
              </p>
              <button
                onClick={() => {
                  fetchStripe(item.prices[0].priceId);
                }}
                className="btn bg-primary text-white"
              >
                ciao
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

export default Plans;

import { Accordion, Col, Container, Row } from "react-bootstrap";
import type { FAQItem } from "../../Interface/FAQ";

function FAQ() {
  const faqData: FAQItem[] = [
    {
      question: "How many ads will I see?",
      answer: `You can expect to see a few short ads per hour. We aim to place ads during natural plot breaks for a more seamless experience. You'll see ads before and during select TV shows and movies. Some newly released movies only have ads before they begin.
When you press pause, you can see in the progress bar how many ad breaks there will be. When an ad break starts, the number of ads in the ad break appears in the upper-right corner. Fast forward and skip aren't available when an ad is playing.`,
    },
    {
      question: "Do Kids profiles have ads?",
      answer:
        "Kids profiles do not have ads, so you can continue sharing your account with the kids in your household without worrying about what they see in ads.",
    },
    {
      question: "Is my device compatible?",
      answer:
        "Some older devices and types of TVs are not compatible with the Standard with ads plan.",
    },
    {
      question: "What can I watch this plan?",
      answer:
        "You can stream, download and play thousands of shows, movies and games. While the vast majority of TV shows and movies are available on an ad-supported plan, a small number are not due to licensing restrictions. These titles will appear with a lock icon when you search or browse MovieVerse.",
    },
    {
      question: "Who can join Standard with ads?",
      answer: `Anyone with a MovieVerse account can join the Standard with ads plan. If you already have a MovieVerse account, you can switch to this plan at any time. If you don't have an account, you can create one when you sign up for the plan.`,
    },
  ];

  return (
    <Container fluid className=" py-5">
      <h1 className="text-center">Frequently Asked Questions</h1>
      <Row>
        <Col>
          <Accordion defaultActiveKey="0" className="py-3 mx-auto w-75">
            {faqData.map((item, index) => (
              <Accordion.Item eventKey={`${index}`} key={index}>
                <Accordion.Header>{item.question}</Accordion.Header>
                <Accordion.Body>{item.answer}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
}

export default FAQ;

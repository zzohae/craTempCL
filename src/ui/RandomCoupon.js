import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Modal } from "react-bootstrap";
import Movetool from "./Mtitle";

const CouponImage = ({ imgSrc }) => (
  <Row className="g-3">
    {imgSrc.map((img, index) => (
      <Col key={index} xs={5}>
        <Card className="shadow-sm">
          <Card.Img src={img.src} alt={img.alt} className="img-fluid" />
        </Card>
      </Col>
    ))}
  </Row>
);

const RandomCoupon = ({
  mtitle,
  title,
  description,
  imgSrc,
  probabilityData,
  buttonText,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalImageAlt, setModalImageAlt] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const getRandomImageAlt = () => imgSrc[Math.floor(Math.random() * imgSrc.length)].alt;

  const openPopup = () => {
    setModalImageAlt(getRandomImageAlt());
    setShowModal(true);
  };

  // 랜덤 확률표 토글 함수
  const toggleVisibility = () => setIsVisible(!isVisible);

  // Enter 키로 모달 닫기 처리
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && showModal) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showModal]);

  return (
    <div className="random-coupon-container">
      {/* Movetool */}
      {mtitle && (
        <div style={{ paddingTop: "3.125rem", marginBottom: "3.125rem" }}>
          <Movetool textColor="#214aee" h2size="34px" nomargin>
            {title}
          </Movetool>
        </div>
      )}

      <Card className="shadow-sm p-3 mb-4">
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text style={{ display: "inline-block" }}>{description}</Card.Text>

          <Row className="justify-content-center d-flex align-items-stretch">
            <Col lg={4} md={12}>
              <CouponImage imgSrc={imgSrc} />
            </Col>

            <Col lg={3} md={5} className="box-column d-flex flex-column justify-content-center align-items-center">
            <img
                src="/assets/img/coupon/randombox.jpg"
                alt="Image"
                className="image-random img-fluid mb-3"
              />
              <Button
                variant="primary"
                onClick={openPopup}
                className="button-common"
              >
                {buttonText}
              </Button>
            </Col>
          </Row>

          {/* 랜덤 확률표 */}
          <div className="mt-4">
            <Button
              variant="link"
              onClick={toggleVisibility}
              className={`button-toggle ${isVisible ? "active" : ""}`}
            >
              {isVisible ? "랜덤확률표 숨기기" : "랜덤확률표 보기"}
              <i className={`bi bi-chevron-${isVisible ? "up" : "down"}`}></i>
            </Button>

            {isVisible && (
              <div className="box-notice mt-3">
                <hr className="my-3" />
                <div className="box-notice__fence">
                  <h5 className="box-notice__title">쿠폰에 대한 안내</h5>
                  <ul className="custom-list">
                    {probabilityData.map((probability, index) => (
                      <li key={index}>
                        <span>
                          {probability.text}: {probability.percentage}%
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{description}</p>
          <p>{modalImageAlt}이(가) 정상적으로 발급되었습니다!</p>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
        닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RandomCoupon;

// home.tsx
import React, { useState } from "react";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "react-bootstrap";

import AboutMe from "../components/about/about";
import Experience from "../components/experience/experience";
import Header from "../components/header/header";
import Skills from "../components/skills/skills";

import { experiences } from "../data/experiences";

import "./home.css";
import ContactModal from "../components/contact/contact";

function HomePage() {
  const [showCVModal, setShowCVModal] = useState(false);
  const handleCVClose = () => setShowCVModal(false);
  const handleCVShow = () => setShowCVModal(true);

  const [showContactModal, setShowContactModal] = useState(false);
  const handleContactClose = () => setShowContactModal(false);
  const handleContactShow = () => setShowContactModal(true); // Add this function

  return (
    <>
      <div className="centerpiece">
        <div className="line-with-notch">
          <FontAwesomeIcon icon={faCircleNotch} className="notch-icon" size="3x" />
        </div>
        <h1>Ethereal Technologies</h1>
        <p>Software experts you can rely on</p>
        <div className="buttons-container">
          <button className="transparent-button" onClick={handleCVShow}>
            Experience (CV)
          </button>

          <button className="transparent-button" onClick={handleContactShow}>
            Contact
          </button>
        </div>

        <ContactModal show={showContactModal} onHide={handleContactClose} />
      </div>

      <Modal show={showCVModal} onHide={handleCVClose} size="xl" dialogClassName="modal-50w" centered>
        <Modal.Body>
          <Header />
          <AboutMe />
          <Skills />
          <Experience experiences={experiences} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default HomePage;

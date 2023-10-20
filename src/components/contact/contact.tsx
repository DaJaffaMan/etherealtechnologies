// ContactModal.tsx
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Modal } from "react-bootstrap";

import "./contact.css";

interface ContactModalProps {
  show: boolean;
  onHide: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered className="">
      <Modal.Header closeButton>
        <Modal.Title className="flex-grow text-center">Contact Me</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="contact-icons">
          <a href="https://www.linkedin.com/in/jack-jefferies" target="_blank" rel="noopener noreferrer">
            <div className="contact-icon">
              <FontAwesomeIcon icon={faLinkedin} size="3x" className="rounded-icon" />
              <p className="contact-text">LinkedIn</p>
            </div>
          </a>

          <a href="https://github.com/Dajaffaman" target="_blank" rel="noopener noreferrer">
            <div className="contact-icon">
              <FontAwesomeIcon icon={faGithub} size="3x" className="rounded-icon" />
              <p className="contact-text">GitHub</p>
            </div>
          </a>

          <a href="mailto:jack@etherealtechnologies.co.uk">
            <div className="contact-icon">
              <FontAwesomeIcon icon={faEnvelope} size="3x" className="rounded-icon" />
              <p className="contact-text">Email</p>
            </div>
          </a>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ContactModal;

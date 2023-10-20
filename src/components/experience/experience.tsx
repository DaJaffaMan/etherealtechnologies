import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import { JobExperience } from "../../data/experiences";

import "bootstrap/dist/css/bootstrap.min.css";

interface ExperienceProps {
  experiences: JobExperience[];
}

const Experience: React.FC<ExperienceProps> = ({ experiences }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setCurrentIndex(selectedIndex);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? experiences.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === experiences.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="experience-main-content w-7/10 bg-white p-5 overflow-y-auto w-full">
      <Carousel activeIndex={currentIndex} onSelect={handleSelect} interval={null}>
        {experiences.map((experience, index) => (
          <Carousel.Item key={index}>
            <div className="experience-header">
              <h2 className="experience-title text-xl font-bold mb-2">{experience.title}</h2>
              <span className="experience-counter text-slate-600 text-sm float-right">
                ({currentIndex + 1} of {experiences.length})
              </span>
            </div>
            <h3 className="experience-company text-lg mb-2">{experience.company}</h3>
            <p className="experience-duration italic mb-4">{experience.duration}</p>
            <p className="experience-description">{experience.description}</p>
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="experience-buttons text-center mt-4">
        <Button onClick={prevSlide} variant="secondary" className="experience-prev-button bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mr-10">
          Previous
        </Button>
        <Button onClick={nextSlide} variant="secondary" className="experience-next-button bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
          Next
        </Button>
      </div>
    </div>
  );
};

export default Experience;

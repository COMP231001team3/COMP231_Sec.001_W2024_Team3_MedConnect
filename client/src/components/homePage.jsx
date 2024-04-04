import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./homePage.css";

{
  /*the Home page
Stroy#1: As a user, I can see the Home page when the application launches so that I can login/signup, can access general information, and search a doctor*/
}

function HomePage() {
  const slides = [
    {
      image:
        "https://redfox.tech/wp-content/uploads/2022/12/inovacao-em-saude-1.jpg",
      text: "Register and Book your appointment now!",
    },
    {
      image:
        "https://i.pinimg.com/originals/85/64/cd/8564cdc8db657a0acb3088ff14c7e1ef.jpg",
      text: "Inumers doctors and nurses are available to help you.",
    },
    {
      image:
        "https://laboratoriojoaopaulo.com.br/wp-content/uploads/2023/05/analises-clinicas.jpg",
      text: "Our priority is YOU",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const goToPreviousSlide = () => {
    const newIndex = (currentSlide - 1 + slides.length) % slides.length;
    setCurrentSlide(newIndex);
  };

  const goToNextSlide = () => {
    const newIndex = (currentSlide + 1) % slides.length;
    setCurrentSlide(newIndex);
  };

  return (
    <div className="containerHome-fluid">
      <div className="row1">
        <div className="col">
          <div
            className="homePageThreelslides"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          >
            <p className="textThreeslide">{slides[currentSlide].text}</p>
            <button
              className="btnBefore"
              type="button"
              onClick={goToPreviousSlide}
            >
              Previous
            </button>
            <button className="btnAfter" type="button" onClick={goToNextSlide}>
              Next
            </button>
          </div>
        </div>
      </div>
      <div className="row2">
        <div className="col">
          <div className="blog">
            <h2 className="blog-title">Blog</h2>
            <div className="row3">
              <div className="col-md-6">
                <h5>How Telemedicine is Revolutionizing Patient Care</h5>
                <p>
                  Dive into the rise of telemedicine and its impact on
                  healthcare accessibility and delivery, during the ongoing
                  COVID-19 pandemic
                </p>
                <h5>
                  Preventive Healthcare: A Cornerstone for Long-Term Wellness
                </h5>
                <p>
                  Explore the significance of preventive healthcare in
                  maintaining overall well-being and longevity.
                </p>
                <h5>
                  Breaking the Stigma: Fostering Mental Health Awareness and
                  Support
                </h5>
                <p>
                  Address the pervasive stigma surrounding mental health issues
                  and the importance of promoting awareness and support.
                </p>
              </div>
              <div className="col-md-6">
                <h5>Advancements in Robotic Surgery</h5>
                <p>
                  Explore the latest innovations in robotic-assisted surgery and
                  their impact on patient outcomes.
                </p>
                <h5>
                  Empowering Patients: The Rise of Patient-Centered Healthcare
                </h5>
                <p>
                  Delve into the shift towards patient-centered care and its
                  significance in improving healthcare outcomes.
                </p>
                <h5>
                  Addressing Healthcare Disparities: Promoting Equity and Access
                  for All
                </h5>
                <p>
                  Shine a spotlight on healthcare disparities and the clinic's
                  efforts to promote equity and access to care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row4">
        <div className="col">
          <div className="news">
            <h2>News</h2>
            <div className="row4">
              <div className="col-md-4">
                <h5>
                  New Study Shows Promising Results for Personalized Cancer
                  Immunotherapy
                </h5>
                <a href="https://www.yalemedicine.org/news/lecanemab-leqembi-new-alzheimers-drug#:~:text=Lecanemab%20works%20by%20removing%20a,Alzheimer's%20disease%2C%E2%80%9D%20says%20Dr.">
                  HERE
                </a>
              </div>
              <div className="col-md-4">
                <h5>COVID-19 Vaccine Booster Shots Recommended</h5>
                <a href="https://www.toronto.ca/community-people/health-wellness-care/health-programs-advice/respiratory-viruses/covid-19/covid-19-vaccines/covid-19-vaccine-eligibility-doses/#:~:text=Everyone%20six%20months%20of%20age%20and%20older%2C%20who%20has%20been,COVID%2D19%20vaccine%20or%20infection.">
                  HERE
                </a>
              </div>
              <div className="col-md-4">
                <h5>Telemedicine Usage Surges Amidst Pandemic</h5>
                <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9035352/#:~:text=A%20national%20study%20including%2036,interactions%20in%20the%20same%20period.">
                  HERE
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

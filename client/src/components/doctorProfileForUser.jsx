import React, { useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./doctorProfileForUser.css";
import profileImage from "./profile.jpg";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Contexts/authContext";

function DoctorProfileForUser() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [doctor, setDoctor] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const { currentUser } = useAuth();
  const { Id } = useParams(); // Access the Id from the URL params

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/doctors/${Id}`); // Use Id from URL params
        if (response.status !== 200) {
          throw new Error("Search Failed");
        }
        setDoctor(response.data);
        setReviews(response.data.reviews);
      } catch (error) {
        console.error("Search error:", error);
      }
    };

    fetchDoctorData();
  }, [Id]); // Use Id as dependency

  const handleBookClick = () => {
    setShowCalendar(true);
  };

  if (!doctor) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      return;
    }
    try {
      const response = await axios.put(`http://localhost:5000/doctors/${Id}`, {
        reviews: {
          reviewer: currentUser.email,
          comment: comment,
          rating: rating,
        }
      });
      // Assuming the server returns updated doctor data including reviews
      setDoctor(response.data);
      setReviews(response.data.reviews);
      // Clear the comment and rating after submission
      setComment("");
      setRating(0);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <section className="containerDoctorProfileForUser">
      <div className="doctorprofileTitle">
        <h1>Doctor profile</h1>
      </div>
      <div className="doctorprofile">
        <img src={profileImage} alt="Profile Image" />
        <ul>
          <li>
            <h2>{doctor.name}</h2>
          </li>
          <li>Location: {doctor.address}</li>
          <li>Specialization: {doctor.specialization}</li>
          <li>Price: {doctor.price ? doctor.price : "The doctor did not provide a price per session. Call for details."}</li>
          <li>Rating: {doctor.rating ? doctor.rating : "No one rated a doctor yet"}</li>
        </ul>
      </div>
      <div className="bookAppointmentTitle">
        <h3>Book Appointment</h3>
      </div>
      <div className="bookAppointment">
        <p> [Provide a map here with text "see on map"]</p>
        <div>
          {/* Block for Book Appointment Button */}
          {currentUser ? (
                  <Link to={`/bookAppointment/${Id}`}>
                    <button>Book Appointment</button>
                  </Link>
                ) : (
                  <Link to="/sign-in">
                    <button>Sign In to Book Appointment</button>
                  </Link>
                )}
        </div>
      </div>
  
      {/* Form for leaving a comment */}
      {currentUser && (
        <div className="leaveReviewSection">
          <h3>Leave a Review</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="comment">Comment:</label>
              <textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
            </div>
            <div>
              <label htmlFor="rating">Rating:</label>
              <input type="number" id="rating" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} />
            </div>
            <button type="submit">Submit Review</button>
          </form>
        </div>
      )}
      <div className="reviews">
        <h3>Reviews</h3>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index}>
              <p>{review.text}</p>
              <p>Rating: {review.rating}</p>
            </div>
          ))
        ) : (
          <p>No reviews available</p>
        )}
      </div>
    </section>
  );
}

export default DoctorProfileForUser;

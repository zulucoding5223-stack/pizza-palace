import React, { useState } from "react";
import { FaStar, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { useAppContext } from "../utils/appContext";
import { useNavigate } from "react-router-dom";

const RateUs = () => {
  const [isClicked, setIsClicked] = useState(0);
  const [stars, setStars] = useState(0);
  const navigate = useNavigate();
  const [review, setReview] = useState("");
  const { setTestimonials, testimonials, logout, user } = useAppContext();

  const setRatingStars = (s) => {
    setIsClicked(s);
    setStars(s);
  };

  const handleSendReview = () => {
    if (stars <= 0 || review.trim() === "") {
      alert("Please add a rating and a review.");
      return;
    }

    const testimonial = {
      user: { name: user.name, image: user.image },
      review: review.trim(),
      ratings: stars,
    };

    const newTestimonials = [testimonial, ...testimonials];
    setTestimonials(newTestimonials);

    setReview("");
    setStars(0);
    setIsClicked(0);
    logout();
    navigate("/");
  };

  return (
    <div className="inset-0 fixed bg-black/30 flex items-center justify-center p-4 z-50">
      {/* Modal Container */}
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden max-h-screen">
        {/* Header with close button */}
        <div className="flex justify-end p-4">
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <FaTimes size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 pb-8 text-center">
          {/* Icon */}
          <div
            onClick={() => {
              navigate("/menu");
            }}
            className="mb-6"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <FaSignOutAlt className="text-blue-600" size={28} />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Before You Go...
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-8">
            We hope you had a great experience! Would you mind rating your time
            with us?
          </p>

          {/* Star Rating */}
          <div className="flex justify-center gap-2 mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                onClick={() => {
                  setRatingStars(star);
                }}
                key={star}
                className={`${star <= isClicked ? "text-yellow-400" : "text-gray-300"} hover:text-yellow-400 transition-colors duration-200`}
              >
                <FaStar size={32} />
              </button>
            ))}
          </div>

          {/* Feedback Text Area */}
          <div className="mb-6">
            <textarea
              onChange={(e) => setReview(e.target.value)}
              value={review}
              placeholder="Tell us about your experience (optional)..."
              className="w-full p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="3"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                handleSendReview();
              }}
              className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors duration-200"
            >
              Submit & Logout
            </button>

            <button className="w-full bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors duration-200">
              Skip & Logout
            </button>

            <button
              onClick={() => {
                navigate("/menu");
              }}
              className="text-gray-500 text-sm hover:text-gray-700 transition-colors py-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateUs;

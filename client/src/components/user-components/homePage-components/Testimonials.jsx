import React from "react";
import { useAppContext } from "../../../utils/appContext";
import { FaStar } from "react-icons/fa";

const Testimonials = () => {
  const { testimonials } = useAppContext();
  return (
    <section className="bg-gray-50 py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16">
          What Our Customers Say
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {testimonials &&
            testimonials.length > 0 &&
            testimonials.map((testimonial, index) => {
              return (
                <div key={index} className="bg-white p-8 rounded-xl shadow-md">
                  <div className="flex items-start justify-between">
                    <p className="text-gray-600 mb-4">{testimonial.review}</p>
                    <div className="flex justify-center gap-2 mb-8">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          className={`${star <= testimonial.ratings ? "text-yellow-400" : "text-gray-300"} hover:text-yellow-400 transition-colors duration-200`}
                        >
                          <FaStar size={32} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <img
                      src={testimonial.user?.image}
                      alt="user-pp"
                      className="object-center rounded-full w-15 h-15"
                    />
                    <h4 className="font-semibold text-xl">
                      {testimonial.user.name}
                    </h4>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

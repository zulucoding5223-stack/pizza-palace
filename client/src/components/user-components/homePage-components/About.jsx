import React from "react";

const About = () => {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Text */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            About Slice&Stack
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            At Slice&Stack, we craft every meal with passion and precision.
            Our chefs use fresh ingredients to create flavors that leave a
            lasting impression.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Whether you're craving pizza, burgers, or something special,
            we deliver quality and taste in every bite.
          </p>
        </div>

        {/* Image */}
        <div>
          <img
            src="/about.jpg"
            alt="About food"
            className="w-full rounded-xl shadow-lg"
          />
        </div>

      </div>
    </section>
  );
};

export default About;

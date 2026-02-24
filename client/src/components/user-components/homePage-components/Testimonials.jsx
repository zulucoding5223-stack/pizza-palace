import React from "react";

const Testimonials = () => {
  return (
    <section className="bg-gray-50 py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16">
          What Our Customers Say
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          <div className="bg-white p-8 rounded-xl shadow-md">
            <p className="text-gray-600 mb-4">
              “Absolutely delicious and delivered on time!”
            </p>
            <h4 className="font-semibold">Sarah M.</h4>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <p className="text-gray-600 mb-4">
              “Best pizza I’ve ever had. Highly recommended.”
            </p>
            <h4 className="font-semibold">James T.</h4>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <p className="text-gray-600 mb-4">
              “Professional service and amazing flavors.”
            </p>
            <h4 className="font-semibold">Linda K.</h4>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Testimonials;

import React from "react";

const WhyChooseUs = () => {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16">
          Why Choose Us
        </h2>

        <div className="grid md:grid-cols-3 gap-12">

          <div className="p-6 border rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Fresh Ingredients</h3>
            <p className="text-gray-600">
              We use only high-quality fresh ingredients in every dish.
            </p>
          </div>

          <div className="p-6 border rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Fast Delivery</h3>
            <p className="text-gray-600">
              Quick and reliable service right to your doorstep.
            </p>
          </div>

          <div className="p-6 border rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Top Quality Service</h3>
            <p className="text-gray-600">
              Your satisfaction is always our highest priority.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;

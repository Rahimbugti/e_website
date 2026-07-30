import {
  FaShippingFast,
  FaLock,
  FaUndo,
  FaHeadset,
} from "react-icons/fa";

function Features() {
  const features = [
    {
      icon: <FaShippingFast />,
      title: "Free Shipping",
      desc: "Free delivery on all orders over $50.",
    },
    {
      icon: <FaLock />,
      title: "Secure Payment",
      desc: "100% secure and trusted payment methods.",
    },
    {
      icon: <FaUndo />,
      title: "Easy Returns",
      desc: "7-day easy return and refund policy.",
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      desc: "Our team is always ready to help you.",
    },
  ];

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose Us
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl duration-300"
            >

              <div className="text-5xl text-blue-600 flex justify-center mb-5">
                {item.icon}
              </div>

              <h3 className="text-xl font-bold">
                {item.title}
              </h3>

              <p className="text-gray-500 mt-3">
                {item.desc}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Features;
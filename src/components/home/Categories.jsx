import {
  FaLaptop,
  FaMobileAlt,
  FaKeyboard,
  FaHeadphones,
  FaGamepad,
  FaDesktop,
} from "react-icons/fa";

function Categories() {
  const categories = [
    { name: "Laptops", icon: <FaLaptop /> },
    { name: "Mobiles", icon: <FaMobileAlt /> },
    { name: "Keyboards", icon: <FaKeyboard /> },
    { name: "Headphones", icon: <FaHeadphones /> },
    { name: "Gaming", icon: <FaGamepad /> },
    { name: "Accessories", icon: <FaDesktop /> },
  ];

  return (
    <section className="max-w-7xl mx-auto py-16 px-6">

      <h2 className="text-4xl font-bold text-center mb-12">
        Shop By Category
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

        {categories.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl duration-300 cursor-pointer"
          >
            <div className="text-5xl text-blue-600 flex justify-center mb-4">
              {item.icon}
            </div>

            <h3 className="font-bold text-lg">
              {item.name}
            </h3>
          </div>
        ))}

      </div>

    </section>
  );
}

export default Categories;
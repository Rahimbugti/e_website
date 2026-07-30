import { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabase";
import { Link } from "react-router-dom";

function BestSellers() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getBestSellers();
  }, []);

  const getBestSellers = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(4);

    if (!error) {
      setProducts(data || []);
    }
  };

  // Handles both cases: full URL already saved, OR only a storage path saved
  const getImageUrl = (image) => {
    if (!image) return "https://via.placeholder.com/400x300?text=No+Image";

    if (image.startsWith("http")) {
      return image;
    }

    // Replace "products" with your actual Supabase storage bucket name
    const { data } = supabase.storage.from("products").getPublicUrl(image);
    return data?.publicUrl || "https://via.placeholder.com/400x300?text=No+Image";
  };

  return (
    <section className="max-w-7xl mx-auto py-16 px-6">
      <h2 className="text-4xl font-bold text-center mb-10">
        Best Sellers
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((item) => (
          <Link key={item.id} to={`/product/${item.id}`}>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl duration-300">

              <img
                src={getImageUrl(item.image)}
                alt={item.title}
                className="w-full h-60 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                }}
              />

              <div className="p-5">

                <h3 className="text-xl font-bold">
                  {item.title}
                </h3>

                <p className="text-gray-500 mt-2 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex justify-between items-center mt-4">

                  <span className="text-2xl font-bold text-blue-600">
                    ${item.price}
                  </span>

                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Buy Now
                  </button>

                </div>

              </div>

            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default BestSellers;
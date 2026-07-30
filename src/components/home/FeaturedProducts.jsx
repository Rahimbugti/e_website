import { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabase";
import { Link } from "react-router-dom";
import { FaStar, FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(8);

    if (!error) {
      setProducts(data || []);
    } else {
      console.log(error);
    }
  };

  const addToWishlist = async (productId) => {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast.error("Please login first");
      return;
    }

    const { error } = await supabase
      .from("wishlist")
      .insert([
        {
          user_id: user.id,
          product_id: productId,
        },
      ]);

    if (error) {

      if (error.code === "23505") {
        toast("Already in wishlist ❤️");
      }
      else {
        console.log(error);
        toast.error(error.message);
      }

      return;
    }

    toast.success("Added to Wishlist ❤️");

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
    <section className="max-w-7xl mx-auto px-6 py-16">

      <h2 className="text-4xl font-bold mb-10">
        Featured Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {products.map((item) => (

          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 duration-300"
          >

            <div className="relative">

              <img
                src={getImageUrl(item.image)}
                alt={item.title}
                className="w-full h-60 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                }}
              />

              <span className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                -20%
              </span>

              <button
                onClick={() => addToWishlist(item.id)}
                className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-red-100"
              >
                <FaHeart className="text-red-500" />
              </button>

            </div>

            <div className="p-5">

              <h3 className="text-xl font-bold">
                {item.title}
              </h3>

              <div className="flex text-yellow-500 mt-2">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              <p className="text-gray-500 mt-3 line-clamp-2">
                {item.description}
              </p>

              <div className="flex justify-between items-center mt-5">

                <span className="text-2xl font-bold text-blue-600">
                  ${item.price}
                </span>

                <Link
                  to={`/product/${item.id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  View
                </Link>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default FeaturedProducts;
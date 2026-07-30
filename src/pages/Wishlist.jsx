import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    getWishlist();
  }, []);

  const getWishlist = async () => {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log("CURRENT USER:", user);

    if (!user) return;

    const { data, error } = await supabase
      .from("wishlist")
      .select(`
        id,
        products (
          id,
          title,
          price,
          image
        )
      `)
      .eq("user_id", user.id);

    console.log("WISHLIST DATA:", data);
    console.log("WISHLIST ERROR:", error);

    if (error) {
      console.log(error);
      return;
    }

    setWishlist(data || []);
  };

  const removeWishlist = async (id) => {
    const { error } = await supabase
      .from("wishlist")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Removed from Wishlist");

    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  // Handles both cases: full URL already saved, OR only a storage path saved
  const getImageUrl = (image) => {
    if (!image) return "https://via.placeholder.com/400x300?text=No+Image";

    if (image.startsWith("http")) {
      return image;
    }

    const { data } = supabase.storage.from("products").getPublicUrl(image);
    return data?.publicUrl || "https://via.placeholder.com/400x300?text=No+Image";
  };

  // Filter out entries whose product was deleted
  const validWishlist = wishlist.filter((item) => item.products);

  return (
    <div className="max-w-7xl mx-auto p-10">

      <h1 className="text-4xl font-bold mb-8">
        My Wishlist ❤️
      </h1>

      {validWishlist.length === 0 ? (
        <h2 className="text-xl text-gray-500">
          Wishlist is Empty
        </h2>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {validWishlist.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >

              <img
                src={getImageUrl(item.products.image)}
                alt={item.products.title}
                className="w-full h-56 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                }}
              />

              <div className="p-4">

                <h2 className="text-xl font-bold">
                  {item.products.title}
                </h2>

                <p className="text-blue-600 font-bold mt-2">
                  ${item.products.price}
                </p>

                <div className="flex justify-between mt-5">

                  <Link
                    to={`/product/${item.products.id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    View
                  </Link>

                  <button
                    onClick={() => removeWishlist(item.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                  >
                    <FaTrash />
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default Wishlist;
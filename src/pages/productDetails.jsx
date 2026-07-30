import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabase/supabase";
import toast, { Toaster } from "react-hot-toast";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  
  const { dispatch } = useCart();
  

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProduct();
  }, [id]);
  

  const getProduct = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    setProduct(data);
    setLoading(false);
  };

const handleAddToCart = () => {
  console.log("Button Clicked");
  console.log(product);

  if (product.stock <= 0) {
     

    toast.error("Out of stock");
    return;
  }

  dispatch({
    type: "ADD_TO_CART",
    payload: {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    },
    
  });
  console.log(
  "AFTER ADD CART:",
  JSON.parse(localStorage.getItem("cart"))
);
  

  toast.success("Added to cart");
};

  if (loading) {
    return (
      <div className="text-center mt-20 text-2xl">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center mt-20 text-2xl">
        Product not found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <Toaster />

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <img
            src={product.image}
            alt={product.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold">
            {product.title}
          </h1>

          <p className="text-2xl text-blue-600 mt-4 font-bold">
            ${product.price}
          </p>

          <p className="mt-5 text-gray-600">
            {product.description}
          </p>

          <div className="mt-5">
            <p>
              <span className="font-bold">Category:</span>{" "}
              {product.category}
            </p>

            <p className="mt-2">
              <span className="font-bold">Stock:</span>{" "}
              {product.stock}
            </p>
          </div>

          <button
  onClick={handleAddToCart}
  className="bg-blue-600 text-white px-8 py-3 rounded mt-8"
>
  Add To Cart
</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
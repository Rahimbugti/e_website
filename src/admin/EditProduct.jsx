import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../supabase/supabase";
import toast, { Toaster } from "react-hot-toast";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: "",
  });

  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      toast.error(error.message);
      return;
    }

    setProduct(data);
    setLoading(false);
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    let imageUrl = product.image;

    if (newImage) {
      const fileName = `${Date.now()}-${newImage.name}`;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, newImage);

      if (uploadError) {
        toast.error(uploadError.message);
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName);

      imageUrl = publicUrl;
    }

    // 🔍 DEBUG VERSION — exact error dekhne ke liye
    const { data, error } = await supabase
      .from("products")
      .update({
        title: product.title,
        description: product.description,
        price: Number(product.price),
        category: product.category,
        stock: Number(product.stock),
        image: imageUrl,
      })
      .eq("id", id)
      .select();

    console.log("Update Data:", data);
    console.log("Update Error:", error);

    if (error) {
      console.log(JSON.stringify(error, null, 2));
      toast.error(error.message);
      return;
    }

    toast.success("Product Updated Successfully");

    setTimeout(() => {
      navigate("/admin/products");
    }, 1000);
  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg p-8 rounded">
      <Toaster />

      <h1 className="text-3xl font-bold mb-6">
        Edit Product
      </h1>

      <form onSubmit={handleUpdate}>

        <input
          type="text"
          name="title"
          value={product.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-3 w-full mb-4 rounded"
        />

        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          className="border p-3 w-full mb-4 rounded"
        />

        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          placeholder="Category"
          className="border p-3 w-full mb-4 rounded"
        />

        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="border p-3 w-full mb-4 rounded"
        />

        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-3 w-full mb-4 rounded"
        />

        <div className="mb-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-40 h-40 object-cover rounded mb-3"
          />

          <input
            type="file"
            onChange={(e) => setNewImage(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white w-full py-3 rounded"
        >
          Update Product
        </button>

      </form>
    </div>
  );
}

export default EditProduct;
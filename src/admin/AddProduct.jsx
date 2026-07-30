import { useState } from "react";
import { supabase } from "../supabase/supabase";
import toast, { Toaster } from "react-hot-toast";
import ProductTable from "../components/ProductTable";

function AddProduct() {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please select an image");
      return;
    }

    // Unique image name
    const fileName = `${Date.now()}-${image.name}`;

    // Upload image to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(fileName, image);

    if (uploadError) {
      console.log(uploadError);
      toast.error(uploadError.message);
      return;
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage
      .from("product-images")
      .getPublicUrl(fileName);

    // Save product in database
    const { error } = await supabase.from("products").insert([
      {
        title: product.title,
        description: product.description,
        price: Number(product.price),
        category: product.category,
        stock: Number(product.stock),
        image: publicUrl,
      },
    ]);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Product Added Successfully");

    // Reset form
    setProduct({
      title: "",
      description: "",
      price: "",
      category: "",
      stock: "",
    });

    setImage(null);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <Toaster />

      <h1 className="text-3xl font-bold mb-6">
        Add Product
      </h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          value={product.title}
          onChange={handleChange}
          placeholder="Product Title"
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

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="mb-4"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-3 rounded"
        >
          Save Product
        </button>

      </form>
      <ProductTable />
    </div>
  );
}

export default AddProduct;
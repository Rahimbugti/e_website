import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";



import {
  getProducts,
  deleteProduct,
} from "../services/productService";

function Products() {
  const [products, setProducts] = useState([]);

  // Load Products
  const loadProducts = async () => {
    const { data, error } = await getProducts();

    if (error) {
      toast.error(error.message);
      return;
    }

    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Delete Product
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    const { error } = await deleteProduct(id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Product Deleted Successfully");

    loadProducts();
  };

  return (
    <div className="p-8">
      <Toaster />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Products
        </h1>

        <Link
          to="/admin/add-product"
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          Add Product
        </Link>
      </div>

      <table className="w-full border border-collapse">

        <thead className="bg-gray-200">
          <tr>
            <th className="border p-3">Image</th>
            <th className="border p-3">Title</th>
            <th className="border p-3">Price</th>
            <th className="border p-3">Stock</th>
            <th className="border p-3">Actions</th>
          </tr>
        </thead>

        <tbody>

          {products.map((item) => (

            <tr key={item.id}>

              <td className="border p-2">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded"
                />
              </td>

              <td className="border p-2">{item.title}</td>

              <td className="border p-2">${item.price}</td>

              <td className="border p-2">{item.stock}</td>

              <td className="border p-2 space-x-2">

                <Link
  to={`/admin/edit-product/${item.id}`}
  className="bg-green-600 text-white px-4 py-2 rounded"
>
  Edit
</Link>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Products;
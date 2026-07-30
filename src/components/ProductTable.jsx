import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";

function ProductTable() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setProducts(data);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Products</h2>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Image</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Stock</th>
          </tr>
        </thead>

        <tbody>
          {products.map((item) => (
            <tr key={item.id}>
              <td className="border p-2">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover"
                />
              </td>

              <td className="border p-2">{item.title}</td>

              <td className="border p-2">${item.price}</td>

              <td className="border p-2">{item.category}</td>

              <td className="border p-2">{item.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";
import toast from "react-hot-toast";
import { FaTrash, FaPlus } from "react-icons/fa";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error(error.message);
      return;
    }

    setCategories(data || []);
  };

  const addCategory = async () => {
    if (!name.trim()) {
      toast.error("Enter category name");
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("categories")
      .insert([{ name }]);

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Category Added");

    setName("");

    getCategories();
  };

  const deleteCategory = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Category Deleted");

    getCategories();
  };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-8">
        Categories Management
      </h1>

      <div className="bg-white rounded-xl shadow p-6 mb-8 flex gap-4">

        <input
          type="text"
          placeholder="Category Name"
          className="flex-1 border rounded-lg p-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={addCategory}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-6 rounded-lg flex items-center gap-2"
        >
          <FaPlus />
          Add
        </button>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-900 text-white">

            <tr>
              <th className="p-4">Category</th>
              <th className="p-4">Created</th>
              <th className="p-4">Action</th>
            </tr>

          </thead>

          <tbody>

            {categories.map((item) => (

              <tr
                key={item.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4 font-semibold">
                  {item.name}
                </td>

                <td className="p-4">
                  {new Date(item.created_at).toLocaleDateString()}
                </td>

                <td className="p-4">

                  <button
                    onClick={() => deleteCategory(item.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <FaTrash />
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Categories;
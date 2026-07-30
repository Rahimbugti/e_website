import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

function Coupons() {
  const [coupons, setCoupons] = useState([]);
  const [form, setForm] = useState({
    code: "",
    discount: "",
    expiry_date: "",
  });

  useEffect(() => {
    getCoupons();
  }, []);

  const getCoupons = async () => {
    const { data, error } = await supabase
      .from("coupons")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return toast.error(error.message);

    setCoupons(data || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("coupons")
      .insert([form]);

    if (error) return toast.error(error.message);

    toast.success("Coupon Added");

    setForm({
      code: "",
      discount: "",
      expiry_date: "",
    });

    getCoupons();
  };

  const deleteCoupon = async (id) => {
    const { error } = await supabase
      .from("coupons")
      .delete()
      .eq("id", id);

    if (error) return toast.error(error.message);

    toast.success("Coupon Deleted");

    getCoupons();
  };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Coupons Management
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded p-6 mb-8"
      >

        <input
          type="text"
          placeholder="Coupon Code"
          value={form.code}
          onChange={(e) =>
            setForm({ ...form, code: e.target.value })
          }
          className="border p-3 w-full mb-4"
        />

        <input
          type="number"
          placeholder="Discount %"
          value={form.discount}
          onChange={(e) =>
            setForm({ ...form, discount: e.target.value })
          }
          className="border p-3 w-full mb-4"
        />

        <input
          type="date"
          value={form.expiry_date}
          onChange={(e) =>
            setForm({
              ...form,
              expiry_date: e.target.value,
            })
          }
          className="border p-3 w-full mb-4"
        />

        <button className="bg-blue-600 text-white px-6 py-3 rounded">
          Add Coupon
        </button>

      </form>

      <table className="w-full border">

        <thead className="bg-slate-900 text-white">

          <tr>

            <th className="p-3">Code</th>
            <th className="p-3">Discount</th>
            <th className="p-3">Expiry</th>
            <th className="p-3">Action</th>

          </tr>

        </thead>

        <tbody>

          {coupons.map((coupon) => (

            <tr key={coupon.id} className="border-b">

              <td className="p-3">{coupon.code}</td>

              <td className="p-3">
                {coupon.discount}%
              </td>

              <td className="p-3">
                {coupon.expiry_date}
              </td>

              <td className="p-3">

                <button
                  onClick={() => deleteCoupon(coupon.id)}
                  className="bg-red-600 text-white px-3 py-2 rounded"
                >
                  <FaTrash />
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Coupons;
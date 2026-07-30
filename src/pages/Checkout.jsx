import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { supabase } from "../supabase/supabase";

function Checkout() {

  const navigate = useNavigate();
  const { cart, dispatch } = useCart();
  console.log("Checkout Cart:", cart)

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });

  const [loading, setLoading] = useState(false);

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Final total after discount
  const finalTotal = total - (total * discount) / 100;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const applyCoupon = async () => {
    if (!couponCode) {
      toast.error("Enter a coupon code");
      return;
    }

    const { data, error } = await supabase
      .from("coupons")
      .select("*")
      .eq("code", couponCode)
      .single();

    if (error || !data) {
      toast.error("Invalid Coupon");
      return;
    }

    const today = new Date();
    const expiry = new Date(data.expiry_date);

    if (expiry < today) {
      toast.error("Coupon Expired");
      return;
    }

    setDiscount(data.discount);

    toast.success(`${data.discount}% Discount Applied`);
  };

  const handleOrder = async (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.address || !form.city) {
      toast.error("Please fill in all fields");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log("Current User:", user);

      if (!user) {
        toast.error("Please login first");
        navigate("/login");
        return;
      }

      // =================== Stock Validation ===================
      for (const item of cart) {
        const { data: product, error } = await supabase
          .from("products")
          .select("title, stock")
          .eq("id", item.id)
          .single();

        if (error) {
          toast.error("Product not found");
          setLoading(false);
          return;
        }

        if (product.stock <= 0) {
          toast.error(`${product.title} is out of stock.`);
          setLoading(false);
          return;
        }

        if (item.quantity > product.stock) {
          toast.error(
            `Only ${product.stock} item(s) available for ${product.title}.`
          );
          setLoading(false);
          return;
        }
      }
      // ========================================================


      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            user_id: user.id,
            name: form.name,
            phone: form.phone,
            address: form.address,
            city: form.city,
            total: finalTotal,
            status: "Pending",
          },
        ])
        .select()
        .single();

    if (orderError) throw orderError;

// ===================== Send Email =====================
const { error: emailError } = await supabase.functions.invoke(
  "send-order-email",
  {
    body: {
      customerEmail: user.email,
      customerName: form.name,
      orderId: order.id,
      total: order.total,
      status: order.status,
    },
  }
);

if (emailError) {
  console.error("Email Error:", emailError);
}
// ======================================================

const items = cart.map((item) => ({
  order_id: order.id,
  product_id: item.id,
  quantity: item.quantity,
  price: item.price,
}));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(items);

      if (itemsError) throw itemsError;

      // ================= Update Stock =================
      for (const item of cart) {
        const { data: product } = await supabase
          .from("products")
          .select("stock")
          .eq("id", item.id)
          .single();

        await supabase
          .from("products")
          .update({
            stock: product.stock - item.quantity,
          })
          .eq("id", item.id);
      }
      // ================================================

      toast.success("Order Created Successfully");
      dispatch({ type: "CLEAR_CART" });
      navigate("/order-success", { state: { orderId: order.id } });
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-10">
      <Toaster />

      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handleOrder} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="border p-3 w-full"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="border p-3 w-full"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          className="border p-3 w-full"
          value={form.address}
          onChange={handleChange}
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          className="border p-3 w-full"
          value={form.city}
          onChange={handleChange}
        />

        {/* Coupon Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter Coupon Code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="border p-3 w-full rounded"
          />

          <button
            type="button"
            onClick={applyCoupon}
            className="bg-green-600 text-white px-4 py-2 mt-2 rounded"
          >
            Apply Coupon
          </button>
        </div>

        {discount > 0 && (
          <p className="text-green-600 font-semibold">
            Coupon Applied: {discount}% off
          </p>
        )}

        <h2 className="text-2xl font-bold">
          Total: ${finalTotal.toFixed(2)}
        </h2>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-8 py-3 rounded disabled:opacity-50"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}

export default Checkout;
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { supabase } from "../supabase/supabase";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { FaSearch, FaHeart, FaShoppingCart, FaUserCircle } from "react-icons/fa";

function Navbar() {
  const { cart } = useCart();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    getUser();
    getProducts();
  }, []);

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);
  };

  const getProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");

    if (!error) {
      setProducts(data || []);
    }
  };

  const handleSearch = (value) => {
    setSearch(value);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const filtered = products.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filtered);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logout Successful");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50">
      {/* TOP NAVBAR */}
      <div className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between gap-5">

          {/* LOGO */}
          <Link to="/" className="text-3xl font-extrabold text-yellow-400">
            Rahim Store
          </Link>

          {/* SEARCH */}
          <div className="flex-1 hidden md:flex relative">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-4 py-3 rounded-l-lg bg-white text-black outline-none"
            />

            <button className="bg-yellow-400 px-6 rounded-r-lg text-black">
              <FaSearch />
            </button>

            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-lg mt-2 max-h-80 overflow-y-auto z-50">
                {suggestions.map((item) => (
                  <Link
                    key={item.id}
                    to={"/product/" + item.id}
                    onClick={() => {
                      setSearch("");
                      setSuggestions([]);
                    }}
                    className="flex gap-3 p-3 hover:bg-gray-100"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="font-semibold text-black">{item.title}</p>
                      <p className="text-green-600">${item.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT MENU */}
          <div className="flex items-center gap-6">
            <Link to="/my-orders" className="hover:text-yellow-400">
              My Orders
            </Link>

            {/* WISHLIST */}
            <Link to="/wishlist" className="relative text-2xl hover:text-red-400">
              <FaHeart />
            </Link>

            {/* CART */}
            <Link to="/cart" className="relative text-2xl hover:text-yellow-400">
              <FaShoppingCart />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-3">
                <FaUserCircle className="text-3xl" />
                <button
                  onClick={handleLogout}
                  className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-blue-600 px-5 py-2 rounded-lg">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* BOTTOM MENU */}
      <div className="bg-yellow-400 shadow">
        <div className="max-w-7xl mx-auto px-5 py-3 flex gap-8 font-semibold overflow-x-auto">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/my-orders">My Orders</Link>
          <Link to="/admin/dashboard">Dashboard</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/wishlist">Wishlist ❤️</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
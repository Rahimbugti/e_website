import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBox,
  FaList,
  FaShoppingCart,
  FaUsers,
  FaStar,
  FaTags,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { BsBarChartFill } from "react-icons/bs";

function AdminSidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white">

      <div className="text-2xl font-bold p-6 border-b border-slate-700">
        Admin Panel
      </div>

      <nav className="flex flex-col p-4 gap-2">

        <Link to="/admin/dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700">
          <FaTachometerAlt />
          Dashboard
        </Link>

        <Link to="/admin/products" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700">
          <FaBox />
          Products
        </Link>

        <Link to="/admin/categories" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700">
          <FaList />
          Categories
        </Link>

        <Link to="/admin/orders" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700">
          <FaShoppingCart />
          Orders
        </Link>

        <Link to="/admin/users" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700">
          <FaUsers />
          Users
        </Link>

        <Link to="/admin/reviews" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700">
          <FaStar />
          Reviews
        </Link>

        <Link to="/admin/coupons" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700">
          <FaTags />
          Coupons
        </Link>

        <Link
  to="/admin/sales-report"
  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700"
>
   <BsBarChartFill />
   Sales Report
</Link>

        <Link to="/admin/settings" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700">
          <FaCog />
          Settings
        </Link>

        <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-600 text-left">
          <FaSignOutAlt />
          Logout
        </button>

      </nav>
    </aside>
  );
}

export default AdminSidebar;
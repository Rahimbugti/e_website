import { Link, useLocation } from "react-router-dom";
import {
  MdDashboard,
  MdInventory,
  MdCategory,
} from "react-icons/md";
import {
  FaShoppingCart,
  FaUsers,
  FaPlus,
  FaStar,
  FaTags,
} from "react-icons/fa";

function AdminSidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700 ${
      isActive(path) ? "bg-slate-700" : ""
    }`;

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-5">
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

      <nav className="flex flex-col gap-2">

        <Link to="/admin/dashboard" className={linkClass("/admin/dashboard")}>
          <MdDashboard />
          Dashboard
        </Link>

        <Link to="/admin/products" className={linkClass("/admin/products")}>
          <MdInventory />
          Products
        </Link>

        <Link to="/admin/add-product" className={linkClass("/admin/add-product")}>
          <FaPlus />
          Add Product
        </Link>

        <Link to="/admin/orders" className={linkClass("/admin/orders")}>
          <FaShoppingCart />
          Orders
        </Link>

        <Link to="/admin/users" className={linkClass("/admin/users")}>
          <FaUsers />
          Users
        </Link>

        <Link to="/admin/categories" className={linkClass("/admin/categories")}>
          <MdCategory />
          Categories
        </Link>

        <Link to="/admin/reviews" className={linkClass("/admin/reviews")}>
          <FaStar />
          Reviews
        </Link>

        <Link
          to="/admin/sales-report"
          className={linkClass("/admin/sales-report")}
        >
          📊 Sales Report
        </Link>

        <Link to="/admin/coupons" className={linkClass("/admin/coupons")}>
          <FaTags />
          Coupons
        </Link>

      </nav>
    </aside>
  );
}

export default AdminSidebar;
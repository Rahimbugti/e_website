import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductDetails from "./pages/productDetails";
import Dashboard from "./admin/Dashboard";
import AddProduct from "./admin/AddProduct";
import Products from "./admin/Products";
import EditProduct from "./admin/EditProduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./admin/Orders";
import Users from "./admin/Users";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";
import Categories from "./admin/Categories";
import DashboardLayout from "./components/admin/DashboardLayout";
import AdminRoute from "./components/AdminRoute";
import Coupons from "./admin/Coupons";
import SalesReport from "./admin/SalesReport";
import ShopProducts from "./pages/ShopProducts";
import Contact from "./pages/Contact";
import Wishlist from "./pages/Wishlist";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
    

<Route path="/contact" element={<Contact />} />

<Route path="/wishlist" element={<Wishlist />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />
        <Route 
 path="/products" 
 element={<ShopProducts />}
/>

        <Route
          path="/admin/add-product"
          element={
            <AdminRoute>
              <DashboardLayout>
                <AddProduct />
              </DashboardLayout>
            </AdminRoute>
          }
        />
        <Route
  path="/admin/sales-report"
  element={
    <AdminRoute>
      <DashboardLayout>
        <SalesReport />
      </DashboardLayout>
    </AdminRoute>
  }
/>

        <Route
          path="/admin/edit-product/:id"
          element={
            <AdminRoute>
              <DashboardLayout>
                <EditProduct />
              </DashboardLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route path="/checkout" element={<Checkout />} />

        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <DashboardLayout>
                <Products />
              </DashboardLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <DashboardLayout>
                <Orders />
              </DashboardLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <DashboardLayout>
                <Users />
              </DashboardLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/my-orders"
          element={<MyOrders />}
        />

        <Route
          path="/order-success"
          element={<OrderSuccess />}
        />

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin/categories"
          element={
            <AdminRoute>
              <DashboardLayout>
                <Categories />
              </DashboardLayout>
            </AdminRoute>
            
          }
        />
        <Route
  path="/admin/coupons"
  element={
    <AdminRoute>
      <DashboardLayout>
        <Coupons />
      </DashboardLayout>
    </AdminRoute>
  }
/>
<Route
  path="/admin/sales"
  element={
    <AdminRoute>
      <DashboardLayout>
        <SalesReport />
      </DashboardLayout>
    </AdminRoute>
  }
/>

      </Routes>
    </>
  );
}

export default App;
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminCharts from "./pages/admin/AdminCharts";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";
import { showAlert, showConfirm } from "./utils/showAlert";

function UserAppShell({ authUser, onLogout }) {
  return (
    <CartProvider>
      <div className="app">
        <Navbar onLogout={onLogout} authUser={authUser} />
        <main className="main">
          <Outlet />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authUser, setAuthUser] = useState(null);

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    // Prevent scrolling during loading
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isLoading]);

  if (isLoading) {
    return <LoadingScreen onLoadComplete={handleLoadComplete} />;
  }

  const handleLoginSuccess = ({ username }) => {
    setAuthUser({ username });
    showAlert({
      title: "Login Berhasil",
      text: `Selamat datang, ${username}.`,
      icon: "success",
    });
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    const ok = await showConfirm({
      title: "Logout",
      text: "Yakin ingin logout?",
      confirmText: "Logout",
    });

    if (!ok) return;

    showAlert({
      title: "Logout",
      text: "Anda berhasil logout.",
      icon: "success",
    });
    setAuthUser(null);
    setIsAuthenticated(false);
  };

  const handleAdminLoginSuccess = ({ username }) => {
    setAdminUser({ username });
    showAlert({
      title: "Login Admin Berhasil",
      text: `Selamat datang, ${username}.`,
      icon: "success",
    });
    setIsAdminAuthenticated(true);
  };

  const handleAdminLogout = async () => {
    const ok = await showConfirm({
      title: "Logout Admin",
      text: "Yakin ingin logout dari Admin Panel?",
      confirmText: "Logout",
    });

    if (!ok) return;

    showAlert({
      title: "Logout Admin",
      text: "Anda berhasil logout.",
      icon: "success",
    });
    setAdminUser(null);
    setIsAdminAuthenticated(false);
  };

  return (
    <ThemeProvider>
      <Routes>
        {/* Admin routes (separate URL + separate login) */}
        <Route
          path="/admin/login"
          element={
            isAdminAuthenticated ? (
              <Navigate to="/admin/charts" replace />
            ) : (
              <AdminLogin onLoginSuccess={handleAdminLoginSuccess} />
            )
          }
        />
        <Route
          path="/admin"
          element={
            isAdminAuthenticated ? (
              <AdminLayout adminUser={adminUser} onLogout={handleAdminLogout} />
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        >
          <Route index element={<Navigate to="charts" replace />} />
          <Route path="charts" element={<AdminCharts />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>

        {/* User app routes (gated by user login) */}
        <Route
          element={
            isAuthenticated ? (
              <UserAppShell authUser={authUser} onLogout={handleLogout} />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;

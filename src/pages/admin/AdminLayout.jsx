import { NavLink, Outlet } from "react-router-dom";

export default function AdminLayout({ adminUser, onLogout }) {
  return (
    <section className="admin-page">
      <header className="admin-header">
        <div className="admin-header__left">
          <div className="admin-header__badge" aria-hidden="true">
            <i className="fa-solid fa-shield-halved"></i>
          </div>
          <div>
            <h1 className="admin-header__title">Admin Panel</h1>
            <p className="admin-header__subtitle">
              Login sebagai <strong>{adminUser?.username || "admin"}</strong>
            </p>
          </div>
        </div>

        <button type="button" className="admin-logout" onClick={onLogout}>
          <i className="fa-solid fa-right-from-bracket"></i> Logout
        </button>
      </header>

      <nav className="admin-navbar" aria-label="Admin navigation">
        <NavLink to="/admin/charts" className="admin-navbar__link">
          <i className="fa-solid fa-chart-line"></i> Grafik
        </NavLink>
        <NavLink to="/admin/products" className="admin-navbar__link">
          <i className="fa-solid fa-box"></i> Produk
        </NavLink>
        <NavLink to="/admin/orders" className="admin-navbar__link">
          <i className="fa-solid fa-receipt"></i> Pesanan
        </NavLink>
        <NavLink to="/admin/users" className="admin-navbar__link">
          <i className="fa-solid fa-users"></i> User
        </NavLink>
      </nav>

      <div className="admin-body">
        <Outlet />
      </div>
    </section>
  );
}

import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/useCart";
import { useTheme } from "../context/useTheme";

export default function Navbar() {
  const { cartItems } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const categories = [
    {
      name: "Keyboard",
      icon: "fa-solid fa-keyboard",
      path: "/products?category=Keyboard",
    },
    {
      name: "Mouse",
      icon: "fa-solid fa-computer-mouse",
      path: "/products?category=Mouse",
    },
    {
      name: "Headset",
      icon: "fa-solid fa-headphones",
      path: "/products?category=Headset",
    },
    {
      name: "Monitor",
      icon: "fa-solid fa-desktop",
      path: "/products?category=Monitor",
    },
  ];

  const handleCategoryClick = (category) => {
    setMenuOpen(false);
    navigate(`/products?category=${category}`);
  };

  return (
    <header className="navbar">
      <div className="navbar__container">
        <div className="navbar__logo">
          <Link to="/">
            <img
              src="https://cdn-icons-png.flaticon.com/512/686/686589.png"
              alt="GamerZone"
              className="navbar__logo-icon"
            />
            <span className="navbar__logo-text">GamerZone</span>
          </Link>
        </div>

        <button
          className="navbar__burger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav
          className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}
        >
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            <i className="fa-solid fa-house"></i> Home
          </NavLink>
          <NavLink to="/products" onClick={() => setMenuOpen(false)}>
            <i className="fa-solid fa-gamepad"></i> Produk
          </NavLink>
          <NavLink to="/cart" onClick={() => setMenuOpen(false)}>
            <i className="fa-solid fa-cart-shopping"></i> Cart ({totalItems})
          </NavLink>

          <div className="navbar__categories">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => handleCategoryClick(cat.name)}
                className="navbar__category-icon"
                title={cat.name}
              >
                <i className={cat.icon}></i>
              </button>
            ))}
          </div>

          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <i
              className={`fa-solid ${theme === "dark" ? "fa-sun" : "fa-moon"}`}
            ></i>
          </button>
        </nav>
      </div>
    </header>
  );
}

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import productsData from "../data/products.json";
import ProductCard from "../components/ProductCard";
import { exportProductsToExcel } from "../utils/exportToExcel";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";

  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [currentBanner, setCurrentBanner] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Generate random bubbles once
  const [bubbles] = useState(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.random() * 60 + 20,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
    }))
  );

  const categories = ["all", ...new Set(productsData.map((p) => p.category))];

  // Category icon mapping
  const getCategoryIcon = (category) => {
    const iconMap = {
      all: "fa-solid fa-border-all",
      Keyboard: "fa-solid fa-keyboard",
      Mouse: "fa-solid fa-computer-mouse",
      Headset: "fa-solid fa-headphones",
      Monitor: "fa-solid fa-desktop",
      Kursi: "fa-solid fa-chair",
      Mousepad: "fa-solid fa-table-cells",
      Aksesoris: "fa-solid fa-box",
    };
    return iconMap[category] || "fa-solid fa-tag";
  };

  const banners = [
    {
      text: "🔥 DISKON HINGGA 50% UNTUK KATEGORI KEYBOARD!",
      bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      text: "⚡ GRATIS ONGKIR MIN BELANJA 500K!",
      bg: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      text: "🎮 BUNDLE PAKET HEMAT GAMING SETUP!",
      bg: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      text: "🎁 PROMO SPESIAL - BELI 2 GRATIS 1!",
      bg: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [banners.length]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const filtered = productsData.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchCategory =
      categoryParam === "all" ? true : product.category === categoryParam;
    const matchMinPrice = minPrice ? product.price >= Number(minPrice) : true;
    const matchMaxPrice = maxPrice ? product.price <= Number(maxPrice) : true;

    return matchSearch && matchCategory && matchMinPrice && matchMaxPrice;
  });

  return (
    <section className="products-page">
      {/* Animated Bubbles Background */}
      <div className="bubbles-container">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="bubble"
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              left: `${bubble.left}%`,
              animationDelay: `${bubble.delay}s`,
              animationDuration: `${bubble.duration}s`,
            }}
          />
        ))}
      </div>

      <div
        className="products-banner"
        style={{ background: banners[currentBanner].bg }}
      >
        <p className="products-banner__text">{banners[currentBanner].text}</p>
        <div className="products-banner__dots">
          {banners.map((_, idx) => (
            <span
              key={idx}
              className={`dot ${idx === currentBanner ? "active" : ""}`}
              onClick={() => setCurrentBanner(idx)}
            />
          ))}
        </div>
      </div>

      <div className="products-page__header">
        <div>
          <h2>🎮 Perlengkapan Gaming</h2>
          <p className="products-page__subtitle">
            {filtered.length} produk tersedia
          </p>
        </div>
        <button
          className="btn btn-outline"
          onClick={() =>
            exportProductsToExcel(filtered, "produk-gamerzone.xlsx")
          }
        >
          📊 Export Excel
        </button>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="🔍 Cari produk gaming..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="filter-input"
        />

        <div className="custom-dropdown" ref={dropdownRef}>
          <button
            className="dropdown-toggle"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            type="button"
          >
            <i className={getCategoryIcon(categoryParam)}></i>
            <span>
              {categoryParam === "all" ? "Semua Kategori" : categoryParam}
            </span>
            <i
              className={`fa-solid fa-chevron-${dropdownOpen ? "up" : "down"}`}
            ></i>
          </button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`dropdown-item ${
                    categoryParam === cat ? "active" : ""
                  }`}
                  onClick={() => {
                    const newParams = new URLSearchParams(searchParams);
                    if (cat === "all") {
                      newParams.delete("category");
                    } else {
                      newParams.set("category", cat);
                    }
                    setSearchParams(newParams);
                    setDropdownOpen(false);
                  }}
                  type="button"
                >
                  <i className={getCategoryIcon(cat)}></i>
                  <span>{cat === "all" ? "Semua Kategori" : cat}</span>
                  {categoryParam === cat && (
                    <i className="fa-solid fa-check"></i>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <input
          type="number"
          placeholder="💰 Harga min"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="filter-input filter-input--small"
        />
        <input
          type="number"
          placeholder="💰 Harga max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="filter-input filter-input--small"
        />
      </div>

      <div className="products-grid">
        {filtered.length === 0 ? (
          <div className="products-empty">
            <div className="products-empty__icon">😔</div>
            <p>Tidak ada produk yang cocok dengan pencarian Anda</p>
            <button
              className="btn btn-primary"
              onClick={() => {
                setSearch("");
                setSearchParams(new URLSearchParams());
                setMinPrice("");
                setMaxPrice("");
              }}
            >
              Reset Filter
            </button>
          </div>
        ) : (
          filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </section>
  );
}

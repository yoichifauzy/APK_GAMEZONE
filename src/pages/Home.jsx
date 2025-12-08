import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import gamezoneImg from "../assets/gamezone.png";

export default function Home() {
  const [particles] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 10,
    }))
  );

  const [currentBanner, setCurrentBanner] = useState(0);

  const banners = [
    {
      title: "Gaming Gear Sale",
      subtitle: "Diskon hingga 50% untuk produk pilihan",
      image:
        "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80",
      cta: "Shop Now",
      link: "/products",
    },
    {
      title: "New Arrivals",
      subtitle: "Produk terbaru dari brand ternama",
      image:
        "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&q=80",
      cta: "Explore",
      link: "/products?category=Keyboard",
    },
    {
      title: "Pro Gaming Setup",
      subtitle: "Build setup impianmu dengan gear premium",
      image:
        "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80",
      cta: "Discover",
      link: "/products",
    },
    {
      title: "Free Shipping",
      subtitle: "Gratis ongkir untuk pembelian di atas 500K",
      image:
        "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800&q=80",
      cta: "Learn More",
      link: "/products",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <section className="home">
      <div className="home__particles">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="hero">
        <div className="hero__content">
          <div className="hero__badge">
            <span className="pulse-dot"></span>
            Ready Stock • Fast Delivery
          </div>
          <h1 className="hero__title">
            Setup Gaming <span className="gradient-text">Impianmu</span>
          </h1>
          <p className="hero__description">
            Perlengkapan gaming premium untuk performa maksimal. Keyboard
            mechanical, mouse presisi tinggi, headset immersive, dan kursi
            ergonomis untuk kenyamanan tanpa batas.
          </p>
          <div className="hero__actions">
            <Link to="/products" className="btn btn-primary btn-glow">
              <i className="fa-solid fa-gamepad"></i> Jelajahi Produk
            </Link>
            <Link to="/products" className="btn btn-outline">
              <i className="fa-solid fa-star"></i> Best Seller
            </Link>
          </div>
          <div className="hero__stats">
            <div className="stat">
              <div className="stat__number">500+</div>
              <div className="stat__label">Produk</div>
            </div>
            <div className="stat">
              <div className="stat__number">10K+</div>
              <div className="stat__label">Gamers</div>
            </div>
            <div className="stat">
              <div className="stat__number">4.9</div>
              <div className="stat__label">Rating</div>
            </div>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__logo-container">
            <img src={gamezoneImg} alt="GamerZone" className="hero__logo" />
            <div className="hero__logo-glow"></div>
          </div>
          <div className="floating-icons">
            <div className="floating-icon" style={{ animationDelay: "0s" }}>
              <i className="fa-solid fa-gamepad"></i>
            </div>
            <div className="floating-icon" style={{ animationDelay: "1s" }}>
              <i className="fa-solid fa-keyboard"></i>
            </div>
            <div className="floating-icon" style={{ animationDelay: "2s" }}>
              <i className="fa-solid fa-computer-mouse"></i>
            </div>
            <div className="floating-icon" style={{ animationDelay: "1.5s" }}>
              <i className="fa-solid fa-headphones"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="promo-banner">
        <div className="banner-slider">
          {banners.map((banner, index) => (
            <div
              key={index}
              className={`banner-slide ${
                index === currentBanner ? "active" : ""
              }`}
              style={{ backgroundImage: `url(${banner.image})` }}
            >
              <div className="banner-overlay"></div>
              <div className="banner-content">
                <h2>{banner.title}</h2>
                <p>{banner.subtitle}</p>
                <Link to={banner.link} className="btn btn-primary">
                  {banner.cta} <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="banner-indicators">
          {banners.map((_, index) => (
            <button
              key={index}
              className={index === currentBanner ? "active" : ""}
              onClick={() => setCurrentBanner(index)}
              aria-label={`Go to banner ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>

      <div className="features">
        <div className="feature-card">
          <div className="feature-icon">
            <i className="fa-solid fa-rocket"></i>
          </div>
          <h3>Pengiriman Cepat</h3>
          <p>Gratis ongkir untuk pembelian di atas 500K</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <i className="fa-solid fa-shield-halved"></i>
          </div>
          <h3>Garansi Resmi</h3>
          <p>Semua produk bergaransi resmi distributor</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <i className="fa-solid fa-credit-card"></i>
          </div>
          <h3>Pembayaran Aman</h3>
          <p>Berbagai metode pembayaran tersedia</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <i className="fa-solid fa-headset"></i>
          </div>
          <h3>Support 24/7</h3>
          <p>Customer service siap membantu kapan saja</p>
        </div>
      </div>
    </section>
  );
}

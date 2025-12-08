import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__section">
          <div className="footer__brand">
            <img
              src="https://cdn-icons-png.flaticon.com/512/686/686589.png"
              alt="GamerZone"
              className="footer__logo"
            />
            <h3>GamerZone</h3>
          </div>
          <p className="footer__tagline">
            Solusi lengkap perlengkapan gaming profesional untuk performa
            maksimal.
          </p>
          <div className="footer__social">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <i className="fa-brands fa-youtube"></i>
            </a>
          </div>
        </div>

        <div className="footer__section">
          <h4>Navigasi</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Produk</Link>
            </li>
            <li>
              <Link to="/cart">Keranjang</Link>
            </li>
            <li>
              <Link to="/checkout">Checkout</Link>
            </li>
          </ul>
        </div>

        <div className="footer__section">
          <h4>Kategori Produk</h4>
          <ul>
            <li>
              <Link to="/products?category=Keyboard">Keyboard</Link>
            </li>
            <li>
              <Link to="/products?category=Mouse">Mouse</Link>
            </li>
            <li>
              <Link to="/products?category=Headset">Headset</Link>
            </li>
            <li>
              <Link to="/products?category=Monitor">Monitor</Link>
            </li>
          </ul>
        </div>

        <div className="footer__section">
          <h4>Kontak Kami</h4>
          <ul className="footer__contact">
            <li>
              <span className="icon">
                <i className="fa-solid fa-location-dot"></i>
              </span>
              <div>
                <strong>Alamat</strong>
                <p>
                  Jl. Gaming Pro No. 123
                  <br />
                  Jakarta Selatan, 12345
                </p>
              </div>
            </li>
            <li>
              <span className="icon">
                <i className="fa-solid fa-envelope"></i>
              </span>
              <div>
                <strong>Email</strong>
                <p>
                  support@gamerzone.com
                  <br />
                  sales@gamerzone.com
                </p>
              </div>
            </li>
            <li>
              <span className="icon">
                <i className="fa-solid fa-phone"></i>
              </span>
              <div>
                <strong>Telepon</strong>
                <p>
                  +62 812-3456-7890
                  <br />
                  +62 21-1234-5678
                </p>
              </div>
            </li>
            <li>
              <span className="icon">
                <i className="fa-solid fa-clock"></i>
              </span>
              <div>
                <strong>Jam Operasional</strong>
                <p>
                  Senin - Sabtu: 09:00 - 21:00
                  <br />
                  Minggu: 10:00 - 18:00
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="footer__section">
          <h4>Pembayaran</h4>
          <p className="footer__payment-info">
            Kami menerima berbagai metode pembayaran:
          </p>
          <div className="footer__payment">
            <span className="payment-icon" data-tooltip="Credit/Debit Card">
              <i className="fa-solid fa-credit-card"></i>
            </span>
            <span className="payment-icon" data-tooltip="Transfer Bank">
              <i className="fa-solid fa-building-columns"></i>
            </span>
            <span
              className="payment-icon"
              data-tooltip="E-Wallet (GoPay, OVO, Dana)"
            >
              <i className="fa-solid fa-mobile-screen-button"></i>
            </span>
            <span
              className="payment-icon"
              data-tooltip="COD (Cash on Delivery)"
            >
              <i className="fa-solid fa-money-bill-wave"></i>
            </span>
          </div>
          <p className="footer__secure">
            <i className="fa-solid fa-lock"></i> Transaksi 100% Aman
          </p>
        </div>
      </div>

      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} GamerZone. All rights reserved.</p>
        <div className="footer__links">
          <a href="/privacy">Privacy Policy</a>
          <span>•</span>
          <a href="/terms">Terms of Service</a>
          <span>•</span>
          <a href="/shipping">Shipping Info</a>
        </div>
      </div>
    </footer>
  );
}

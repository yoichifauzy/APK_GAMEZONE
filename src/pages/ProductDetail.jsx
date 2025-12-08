import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import productsData from "../data/products.json";
import { useCart } from "../context/useCart";

export default function ProductDetail() {
  const { id } = useParams();
  const product = productsData.find((p) => p.id === Number(id));
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");

  if (!product) {
    return (
      <div className="product-not-found">
        <i className="fa-solid fa-box-open"></i>
        <h2>Produk tidak ditemukan</h2>
        <Link to="/products" className="btn btn-primary">
          <i className="fa-solid fa-arrow-left"></i> Kembali ke Produk
        </Link>
      </div>
    );
  }

  const rating = product.rating || 4.5;
  const reviews = product.reviews || 127;

  // Get related products from same category
  const relatedProducts = productsData
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const imageGallery = [
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  return (
    <div className="product-detail-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">
          <i className="fa-solid fa-house"></i> Home
        </Link>
        <i className="fa-solid fa-chevron-right"></i>
        <Link to="/products">Products</Link>
        <i className="fa-solid fa-chevron-right"></i>
        <Link to={`/products?category=${product.category}`}>
          {product.category}
        </Link>
        <i className="fa-solid fa-chevron-right"></i>
        <span>{product.name}</span>
      </div>

      {/* Main Product Section */}
      <section className="product-detail">
        {/* Image Gallery */}
        <div className="product-detail__gallery">
          <div className="gallery-main">
            <img src={imageGallery[selectedImage]} alt={product.name} />
            {product.label && (
              <span className="product-badge">{product.label}</span>
            )}
          </div>
          <div className="gallery-thumbs">
            {imageGallery.map((img, index) => (
              <button
                key={index}
                className={selectedImage === index ? "active" : ""}
                onClick={() => setSelectedImage(index)}
              >
                <img src={img} alt={`${product.name} ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="product-detail__info">
          <h1>{product.name}</h1>

          <div className="product-meta">
            <span className="category-badge">
              <i className="fa-solid fa-tag"></i> {product.category}
            </span>
            <span className="sku">
              SKU: GZ-{product.id.toString().padStart(5, "0")}
            </span>
          </div>

          <div className="rating-section">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <i
                  key={i}
                  className={`fa-${
                    i < Math.floor(rating) ? "solid" : "regular"
                  } fa-star`}
                ></i>
              ))}
            </div>
            <span className="rating-text">
              {rating} ({reviews} reviews)
            </span>
          </div>

          <div className="price-section">
            <h2 className="price">
              Rp {product.price.toLocaleString("id-ID")}
            </h2>
          </div>

          <div className="stock-section">
            {product.stock > 10 ? (
              <p className="stock-available">
                <i className="fa-solid fa-check-circle"></i> Stok Tersedia (
                {product.stock} unit)
              </p>
            ) : product.stock > 0 ? (
              <p className="stock-limited">
                <i className="fa-solid fa-exclamation-triangle"></i> Stok
                Terbatas ({product.stock} unit tersisa)
              </p>
            ) : (
              <p className="stock-out">
                <i className="fa-solid fa-times-circle"></i> Stok Habis
              </p>
            )}
          </div>

          <div className="quantity-section">
            <label>Quantity:</label>
            <div className="quantity-controls">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <i className="fa-solid fa-minus"></i>
              </button>
              <span>{quantity}</span>
              <button
                onClick={() =>
                  setQuantity(Math.min(product.stock, quantity + 1))
                }
                disabled={quantity >= product.stock}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>

          <div className="action-buttons">
            <button
              className="btn btn-primary btn-lg"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <i className="fa-solid fa-cart-shopping"></i> Tambah ke Keranjang
            </button>
            <button className="btn btn-outline btn-lg">
              <i className="fa-regular fa-heart"></i> Simpan
            </button>
          </div>

          <div className="product-features">
            <div className="feature">
              <i className="fa-solid fa-truck-fast"></i>
              <div>
                <strong>Free Shipping</strong>
                <span>Untuk pembelian diatas 500K</span>
              </div>
            </div>
            <div className="feature">
              <i className="fa-solid fa-shield-halved"></i>
              <div>
                <strong>Garansi Resmi</strong>
                <span>Garansi 1-2 tahun</span>
              </div>
            </div>
            <div className="feature">
              <i className="fa-solid fa-rotate"></i>
              <div>
                <strong>14 Hari Retur</strong>
                <span>Mudah & gratis</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="product-tabs">
        <div className="tabs-header">
          <button
            className={activeTab === "description" ? "active" : ""}
            onClick={() => setActiveTab("description")}
          >
            <i className="fa-solid fa-file-lines"></i> Deskripsi
          </button>
          <button
            className={activeTab === "specs" ? "active" : ""}
            onClick={() => setActiveTab("specs")}
          >
            <i className="fa-solid fa-list"></i> Spesifikasi
          </button>
          <button
            className={activeTab === "reviews" ? "active" : ""}
            onClick={() => setActiveTab("reviews")}
          >
            <i className="fa-solid fa-comments"></i> Reviews ({reviews})
          </button>
        </div>

        <div className="tabs-content">
          {activeTab === "description" && (
            <div className="tab-panel">
              <h3>Tentang Produk</h3>
              <p>{product.description}</p>
              <h4>Fitur Utama:</h4>
              <ul>
                <li>
                  <i className="fa-solid fa-check"></i> Build quality premium
                  dengan material terbaik
                </li>
                <li>
                  <i className="fa-solid fa-check"></i> Performa tinggi untuk
                  gaming kompetitif
                </li>
                <li>
                  <i className="fa-solid fa-check"></i> Design ergonomis untuk
                  kenyamanan maksimal
                </li>
                <li>
                  <i className="fa-solid fa-check"></i> RGB lighting
                  customizable
                </li>
              </ul>
            </div>
          )}

          {activeTab === "specs" && (
            <div className="tab-panel">
              <h3>Spesifikasi Teknis</h3>
              <table className="specs-table">
                <tbody>
                  <tr>
                    <td>Brand</td>
                    <td>{product.name.split(" ")[0]}</td>
                  </tr>
                  <tr>
                    <td>Model</td>
                    <td>{product.name}</td>
                  </tr>
                  <tr>
                    <td>Kategori</td>
                    <td>{product.category}</td>
                  </tr>
                  <tr>
                    <td>SKU</td>
                    <td>GZ-{product.id.toString().padStart(5, "0")}</td>
                  </tr>
                  <tr>
                    <td>Berat</td>
                    <td>Varies by product</td>
                  </tr>
                  <tr>
                    <td>Garansi</td>
                    <td>1-2 Tahun Resmi</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="tab-panel">
              <h3>Customer Reviews</h3>
              <div className="reviews-summary">
                <div className="summary-rating">
                  <h2>{rating}</h2>
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`fa-${
                          i < Math.floor(rating) ? "solid" : "regular"
                        } fa-star`}
                      ></i>
                    ))}
                  </div>
                  <p>Berdasarkan {reviews} reviews</p>
                </div>
                <div className="rating-bars">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="rating-bar">
                      <span>
                        {star} <i className="fa-solid fa-star"></i>
                      </span>
                      <div className="bar">
                        <div
                          className="fill"
                          style={{
                            width: `${
                              star === 5
                                ? 70
                                : star === 4
                                ? 20
                                : star === 3
                                ? 5
                                : star === 2
                                ? 3
                                : 2
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span className="percentage">
                        {star === 5
                          ? 70
                          : star === 4
                          ? 20
                          : star === 3
                          ? 5
                          : star === 2
                          ? 3
                          : 2}
                        %
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="reviews-list">
                <div className="review-item">
                  <div className="review-header">
                    <div className="user-info">
                      <div className="avatar">
                        <i className="fa-solid fa-user"></i>
                      </div>
                      <div>
                        <strong>ProGamer123</strong>
                        <div className="stars">
                          {[...Array(5)].map((_, i) => (
                            <i key={i} className="fa-solid fa-star"></i>
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="review-date">2 minggu lalu</span>
                  </div>
                  <p className="review-text">
                    Produk luar biasa! Build quality premium dan performa sangat
                    baik. Sangat recommended untuk yang serius gaming.
                  </p>
                  <div className="review-helpful">
                    <i className="fa-regular fa-thumbs-up"></i> Helpful (24)
                  </div>
                </div>

                <div className="review-item">
                  <div className="review-header">
                    <div className="user-info">
                      <div className="avatar">
                        <i className="fa-solid fa-user"></i>
                      </div>
                      <div>
                        <strong>TechEnthusiast</strong>
                        <div className="stars">
                          {[...Array(4)].map((_, i) => (
                            <i key={i} className="fa-solid fa-star"></i>
                          ))}
                          <i className="fa-regular fa-star"></i>
                        </div>
                      </div>
                    </div>
                    <span className="review-date">1 bulan lalu</span>
                  </div>
                  <p className="review-text">
                    Bagus, tapi harga sedikit mahal. Overall satisfied dengan
                    pembelian ini.
                  </p>
                  <div className="review-helpful">
                    <i className="fa-regular fa-thumbs-up"></i> Helpful (12)
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="related-products">
          <h2>Produk Terkait</h2>
          <div className="products-grid">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                to={`/products/${relatedProduct.id}`}
                className="related-product-card"
              >
                <div className="image-wrapper">
                  <img src={relatedProduct.image} alt={relatedProduct.name} />
                  {relatedProduct.label && (
                    <span className="badge">{relatedProduct.label}</span>
                  )}
                </div>
                <h4>{relatedProduct.name}</h4>
                <div className="stars-small">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`fa-${
                        i < Math.floor(relatedProduct.rating || 4.5)
                          ? "solid"
                          : "regular"
                      } fa-star`}
                    ></i>
                  ))}
                </div>
                <p className="price">
                  Rp {relatedProduct.price.toLocaleString("id-ID")}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

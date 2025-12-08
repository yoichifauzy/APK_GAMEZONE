import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/useCart";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isSaved, setIsSaved] = useState(false);
  const [showAddedAnimation, setShowAddedAnimation] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setShowAddedAnimation(true);
    setTimeout(() => setShowAddedAnimation(false), 1000);
  };

  const rating = product.rating || 4.5;
  const reviews = product.reviews || 127;

  return (
    <div className="product-card">
      {showAddedAnimation && (
        <div className="cart-added-animation">
          <div className="cart-added-icon">🛒✓</div>
          <p>Ditambahkan!</p>
        </div>
      )}

      <div className="product-card__image-wrapper">
        <img src={product.image} alt={product.name} />
        {product.label && (
          <span className="product-card__badge">{product.label}</span>
        )}
        <button
          className={`product-card__save ${isSaved ? "saved" : ""}`}
          onClick={() => setIsSaved(!isSaved)}
          aria-label="Save product"
        >
          <i className={`fa-${isSaved ? "solid" : "regular"} fa-heart`}></i>
        </button>
        <div className="product-card__overlay">
          <Link
            to={`/products/${product.id}`}
            className="btn btn-outline btn-sm"
          >
            <i className="fa-solid fa-eye"></i> Quick View
          </Link>
        </div>
      </div>

      <div className="product-card__content">
        <p className="product-card__category">{product.category}</p>
        <h3 className="product-card__title">{product.name}</h3>

        <div className="product-card__rating">
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

        <p className="product-card__price">
          Rp {product.price.toLocaleString("id-ID")}
        </p>

        <p className="product-card__stock">
          {product.stock > 10 ? (
            <span className="stock-high">
              <i className="fa-solid fa-check"></i> Stok Tersedia
            </span>
          ) : product.stock > 0 ? (
            <span className="stock-low">
              <i className="fa-solid fa-triangle-exclamation"></i> Stok Terbatas
              ({product.stock})
            </span>
          ) : (
            <span className="stock-out">
              <i className="fa-solid fa-xmark"></i> Habis
            </span>
          )}
        </p>

        <div className="product-card__actions">
          <Link
            to={`/products/${product.id}`}
            className="btn btn-outline btn-sm"
          >
            Detail
          </Link>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <i className="fa-solid fa-cart-shopping"></i> Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}

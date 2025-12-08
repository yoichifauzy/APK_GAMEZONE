import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/useCart";
import { exportCartToPDF } from "../utils/exportToPDF";

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, totalPrice } = useCart();
  const [selectedItems, setSelectedItems] = useState(
    cartItems.map((item) => item.id)
  );
  const [showModal, setShowModal] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("qris");
  const [insurance, setInsurance] = useState(false);
  const [trackingStage, setTrackingStage] = useState(0);

  const trackingStages = [
    { icon: "📦", label: "Pesanan Dibuat", status: "completed" },
    {
      icon: "✅",
      label: "Dikonfirmasi",
      status: trackingStage >= 1 ? "completed" : "pending",
    },
    {
      icon: "📮",
      label: "Dikemas",
      status: trackingStage >= 2 ? "completed" : "pending",
    },
    {
      icon: "🚚",
      label: "Dikirim",
      status: trackingStage >= 3 ? "completed" : "pending",
    },
    {
      icon: "🏠",
      label: "Tiba",
      status: trackingStage >= 4 ? "completed" : "pending",
    },
  ];

  const toggleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedItems((prev) =>
      prev.length === cartItems.length ? [] : cartItems.map((item) => item.id)
    );
  };

  const openModal = (type, data) => {
    setShowModal(type);
    setModalData(data);
  };

  const closeModal = () => {
    setShowModal(null);
    setModalData(null);
  };

  const confirmDelete = () => {
    if (modalData) {
      removeFromCart(modalData.id);
      closeModal();
    }
  };

  const selectedTotal = cartItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const shippingCost = selectedTotal > 500000 ? 0 : 25000;
  const insuranceCost = insurance ? selectedTotal * 0.01 : 0;
  const finalTotal = selectedTotal + shippingCost + insuranceCost;

  if (cartItems.length === 0) {
    return (
      <section className="cart-page">
        <div className="cart-empty">
          <div className="cart-empty__icon">🛒</div>
          <h2>Keranjang Belanja Kosong</h2>
          <p>Yuk mulai belanja perlengkapan gaming impianmu!</p>
          <Link to="/products" className="btn btn-primary">
            🎮 Mulai Belanja
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="cart-header">
        <h2>🛒 Keranjang Belanja</h2>
        <p className="cart-count">{cartItems.length} item dalam keranjang</p>
      </div>

      {/* Order Tracking */}
      <div className="order-tracking">
        <h3>📍 Lacak Pesanan</h3>
        <div className="tracking-steps">
          {trackingStages.map((stage, idx) => (
            <div key={idx} className={`tracking-step ${stage.status}`}>
              <div className="tracking-icon">{stage.icon}</div>
              <div className="tracking-label">{stage.label}</div>
              {idx < trackingStages.length - 1 && (
                <div
                  className={`tracking-line ${trackingStages[idx + 1].status}`}
                />
              )}
            </div>
          ))}
        </div>
        <button
          className="btn btn-outline btn-sm"
          onClick={() => setTrackingStage((prev) => Math.min(prev + 1, 4))}
        >
          Simulasi Progress →
        </button>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          <div className="cart-table-header">
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={selectedItems.length === cartItems.length}
                onChange={toggleSelectAll}
              />
              <span>
                Pilih Semua ({selectedItems.length}/{cartItems.length})
              </span>
            </label>
          </div>

          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleSelectItem(item.id)}
                  />
                </label>

                <div className="cart-item__image">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="cart-item__details">
                  <h4>{item.name}</h4>
                  <p className="cart-item__category">{item.category}</p>
                  <p className="cart-item__price">
                    Rp {item.price.toLocaleString("id-ID")}
                  </p>
                </div>

                <div className="cart-item__quantity">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="qty-btn"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, Number(e.target.value))
                    }
                    className="qty-input"
                  />
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>

                <div className="cart-item__subtotal">
                  <p>Subtotal</p>
                  <p className="amount">
                    Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                  </p>
                </div>

                <div className="cart-item__actions">
                  <button
                    className="action-btn"
                    onClick={() => openModal("view", item)}
                    title="Lihat Detail"
                  >
                    👁️
                  </button>
                  <button
                    className="action-btn"
                    onClick={() => openModal("edit", item)}
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    className="action-btn danger"
                    onClick={() => openModal("delete", item)}
                    title="Hapus"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="cart-sidebar">
          {/* Shipping Address */}
          <div className="cart-section">
            <h3>📍 Alamat Pengiriman</h3>
            <textarea
              placeholder="Masukkan alamat lengkap pengiriman..."
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              rows="3"
              className="address-input"
            />
          </div>

          {/* Payment Method */}
          <div className="cart-section">
            <h3>💳 Metode Pembayaran</h3>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="payment-select"
            >
              <option value="qris">QRIS</option>
              <option value="transfer">Transfer Bank</option>
              <option value="cod">COD (Bayar di Tempat)</option>
              <option value="credit">Kartu Kredit</option>
            </select>
          </div>

          {/* Insurance */}
          <div className="cart-section">
            <label className="insurance-checkbox">
              <input
                type="checkbox"
                checked={insurance}
                onChange={(e) => setInsurance(e.target.checked)}
              />
              <div>
                <strong>🛡️ Proteksi Barang</strong>
                <p>Lindungi barang dari kerusakan (1% dari total)</p>
              </div>
            </label>
          </div>

          {/* Summary */}
          <div className="cart-summary-box">
            <h3>Ringkasan Belanja</h3>
            <div className="summary-row">
              <span>Subtotal ({selectedItems.length} item)</span>
              <span>Rp {selectedTotal.toLocaleString("id-ID")}</span>
            </div>
            <div className="summary-row">
              <span>Ongkir</span>
              <span className={shippingCost === 0 ? "free" : ""}>
                {shippingCost === 0
                  ? "GRATIS"
                  : `Rp ${shippingCost.toLocaleString("id-ID")}`}
              </span>
            </div>
            {insurance && (
              <div className="summary-row">
                <span>Proteksi</span>
                <span>Rp {insuranceCost.toLocaleString("id-ID")}</span>
              </div>
            )}
            <div className="summary-divider" />
            <div className="summary-row total">
              <span>Total</span>
              <span>Rp {finalTotal.toLocaleString("id-ID")}</span>
            </div>

            <button
              className="btn btn-outline"
              onClick={() => exportCartToPDF(cartItems, totalPrice)}
            >
              📄 Export PDF
            </button>
            <Link
              to="/checkout"
              className="btn btn-primary"
              style={{ marginTop: "0.5rem" }}
            >
              Checkout ({selectedItems.length} item)
            </Link>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            {showModal === "view" && modalData && (
              <>
                <h3>👁️ Detail Produk</h3>
                <img
                  src={modalData.image}
                  alt={modalData.name}
                  className="modal-image"
                />
                <h4>{modalData.name}</h4>
                <p>
                  <strong>Kategori:</strong> {modalData.category}
                </p>
                <p>
                  <strong>Harga:</strong> Rp{" "}
                  {modalData.price.toLocaleString("id-ID")}
                </p>
                <p>
                  <strong>Quantity:</strong> {modalData.quantity}
                </p>
                <p>
                  <strong>Deskripsi:</strong>{" "}
                  {modalData.description || "Produk gaming berkualitas tinggi"}
                </p>
                <button className="btn btn-primary" onClick={closeModal}>
                  Tutup
                </button>
              </>
            )}
            {showModal === "edit" && modalData && (
              <>
                <h3>✏️ Edit Produk</h3>
                <p>
                  <strong>{modalData.name}</strong>
                </p>
                <label>
                  Jumlah:
                  <input
                    type="number"
                    min="1"
                    value={modalData.quantity}
                    onChange={(e) => {
                      const newQty = Number(e.target.value);
                      updateQuantity(modalData.id, newQty);
                      setModalData({ ...modalData, quantity: newQty });
                    }}
                    className="modal-input"
                  />
                </label>
                <button className="btn btn-primary" onClick={closeModal}>
                  Simpan
                </button>
              </>
            )}
            {showModal === "delete" && modalData && (
              <>
                <h3>🗑️ Hapus Produk</h3>
                <p>
                  Yakin ingin menghapus <strong>{modalData.name}</strong> dari
                  keranjang?
                </p>
                <div className="modal-actions">
                  <button className="btn btn-outline" onClick={closeModal}>
                    Batal
                  </button>
                  <button className="btn btn-danger" onClick={confirmDelete}>
                    Hapus
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

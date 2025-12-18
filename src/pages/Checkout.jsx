import { useState } from "react";
import { useCart } from "../context/useCart";
import QrisQRCode from "../components/QrisQRCode";
import { addOrder, createOrderId } from "../utils/storeData";

export default function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "qris",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Nama wajib diisi";
    if (!form.email.includes("@")) newErrors.email = "Email tidak valid";
    if (form.address.trim().length < 10)
      newErrors.address = "Alamat minimal 10 karakter";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const val = validate();
    setErrors(val);
    if (Object.keys(val).length === 0) {
      const order = {
        id: createOrderId(),
        createdAt: new Date().toISOString(),
        customer: {
          name: form.name,
          email: form.email,
          address: form.address,
        },
        paymentMethod: form.paymentMethod,
        items: cartItems,
        totalPrice,
        status: "Diterima",
      };

      addOrder(order);
      setSuccess(true);
      clearCart();
    }
  };

  if (cartItems.length === 0 && !success) {
    return <p>Keranjang kosong. Tambahkan produk terlebih dahulu.</p>;
  }

  return (
    <section className="checkout-page">
      <h2>Checkout</h2>

      {success && (
        <div className="alert success">
          Terima kasih, pesanan Anda sudah diterima!
        </div>
      )}

      <div className="checkout-layout">
        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-group">
            <label>Nama Lengkap</label>
            <input name="name" value={form.name} onChange={handleChange} />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label>Alamat Lengkap</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
            />
            {errors.address && <p className="error">{errors.address}</p>}
          </div>

          <div className="form-group">
            <label>Metode Pembayaran</label>
            <select
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleChange}
            >
              <option value="qris">QRIS</option>
              <option value="transfer">Transfer Bank</option>
              <option value="cod">COD</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            Bayar Sekarang
          </button>
        </form>

        <div className="checkout-summary">
          <div className="checkout-summary__header">
            <h3>Ringkasan Belanja</h3>
            <p className="checkout-summary__subtitle">
              Cek kembali pesanan sebelum membayar
            </p>
          </div>

          {cartItems.length > 0 ? (
            <ul className="checkout-summary__list">
              {cartItems.map((item) => (
                <li key={item.id} className="checkout-summary__item">
                  <div className="checkout-summary__item-info">
                    <p className="checkout-summary__item-name">{item.name}</p>
                    <span className="checkout-summary__item-meta">
                      x{item.quantity} | Rp {item.price.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <span className="checkout-summary__item-amount">
                    Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="checkout-summary__empty">
              Keranjang masih kosong. Tambahkan produk dahulu.
            </p>
          )}

          <div className="checkout-summary__total">
            <span>Total</span>
            <strong>Rp {totalPrice.toLocaleString("id-ID")}</strong>
          </div>

          {form.paymentMethod === "qris" && totalPrice > 0 && (
            <QrisQRCode
              value="https://gamerzone.com/qris"
              amount={totalPrice}
            />
          )}
        </div>
      </div>
    </section>
  );
}

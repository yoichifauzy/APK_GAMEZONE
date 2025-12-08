import { useState } from "react";
import { useCart } from "../context/useCart";
import QrisQRCode from "../components/QrisQRCode";

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
          <h3>Ringkasan Belanja</h3>
          {cartItems.length > 0 && (
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  {item.name} x {item.quantity} = Rp{" "}
                  {(item.price * item.quantity).toLocaleString("id-ID")}
                </li>
              ))}
            </ul>
          )}
          <p>Total: Rp {totalPrice.toLocaleString("id-ID")}</p>

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

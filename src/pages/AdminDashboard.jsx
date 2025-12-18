import { useEffect, useMemo, useState } from "react";
import { showAlert, showConfirm } from "../utils/showAlert";
import {
  createProductId,
  createUserId,
  getOrders,
  getProducts,
  getUsers,
  setOrders,
  setProducts,
  setUsers,
} from "../utils/storeData";

function formatMoney(value) {
  const n = Number(value || 0);
  return `Rp ${n.toLocaleString("id-ID")}`;
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString("id-ID");
  } catch {
    return String(iso || "");
  }
}

function ProductsManager() {
  const [products, setProductsState] = useState(() => getProducts());
  const [editingId, setEditingId] = useState(null);

  const emptyForm = useMemo(
    () => ({
      name: "",
      category: "",
      price: "",
      stock: "",
      image: "",
      label: "",
      rating: "",
      reviews: "",
      description: "",
    }),
    []
  );

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    setProductsState(getProducts());
  }, []);

  const startEdit = (p) => {
    setEditingId(p.id);
    setForm({
      name: p.name || "",
      category: p.category || "",
      price: String(p.price ?? ""),
      stock: String(p.stock ?? ""),
      image: p.image || "",
      label: p.label || "",
      rating: p.rating != null ? String(p.rating) : "",
      reviews: p.reviews != null ? String(p.reviews) : "",
      description: p.description || "",
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const normalizeProduct = (base) => {
    const price = Number(base.price);
    const stock = Number(base.stock);
    const rating = base.rating === "" ? undefined : Number(base.rating);
    const reviews = base.reviews === "" ? undefined : Number(base.reviews);

    return {
      ...base,
      price: Number.isFinite(price) ? price : 0,
      stock: Number.isFinite(stock) ? stock : 0,
      label: base.label?.trim() || undefined,
      rating: Number.isFinite(rating) ? rating : undefined,
      reviews: Number.isFinite(reviews) ? reviews : undefined,
      name: base.name?.trim() || "",
      category: base.category?.trim() || "",
      image: base.image?.trim() || "",
      description: base.description?.trim() || "",
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.category.trim()) {
      showAlert({
        title: "Validasi",
        text: "Nama dan kategori wajib diisi.",
        icon: "warning",
      });
      return;
    }

    const next = [...products];

    if (editingId != null) {
      const idx = next.findIndex((p) => p.id === editingId);
      if (idx === -1) {
        showAlert({
          title: "Gagal",
          text: "Produk tidak ditemukan.",
          icon: "error",
        });
        return;
      }

      next[idx] = normalizeProduct({ ...next[idx], ...form });
      setProducts(next);
      setProductsState(next);
      showAlert({
        title: "Berhasil",
        text: "Produk diperbarui.",
        icon: "success",
      });
      resetForm();
      return;
    }

    const newId = createProductId(next);
    const created = normalizeProduct({ id: newId, ...form });
    next.unshift(created);
    setProducts(next);
    setProductsState(next);
    showAlert({
      title: "Berhasil",
      text: "Produk ditambahkan.",
      icon: "success",
    });
    resetForm();
  };

  const handleDelete = async (id) => {
    const ok = await showConfirm({
      title: "Hapus Produk",
      text: "Yakin ingin menghapus produk ini?",
      confirmText: "Hapus",
    });
    if (!ok) return;

    const next = products.filter((p) => p.id !== id);
    setProducts(next);
    setProductsState(next);
    if (editingId === id) resetForm();
    showAlert({
      title: "Dihapus",
      text: "Produk berhasil dihapus.",
      icon: "success",
    });
  };

  return (
    <section className="admin-section">
      <div className="admin-section__header">
        <div>
          <h2>Kelola Produk</h2>
          <p className="admin-section__subtitle">
            CRUD produk (tersimpan di localStorage)
          </p>
        </div>
        <div className="admin-section__meta">Total: {products.length}</div>
      </div>

      <div className="admin-panel">
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="admin-form__title">
            {editingId != null ? "Edit Produk" : "Tambah Produk"}
          </div>

          <div className="admin-form__grid">
            <div className="form-group">
              <label>Nama</label>
              <input name="name" value={form.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Kategori</label>
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Keyboard / Mouse / Headset / ..."
              />
            </div>
            <div className="form-group">
              <label>Harga</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Stok</label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>
            <div className="form-group">
              <label>Label</label>
              <input name="label" value={form.label} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Rating</label>
              <input
                type="number"
                step="0.1"
                name="rating"
                value={form.rating}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Reviews</label>
              <input
                type="number"
                name="reviews"
                value={form.reviews}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Deskripsi</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <div className="admin-form__actions">
            <button className="btn btn-primary" type="submit">
              <i className="fa-solid fa-floppy-disk"></i>
              {editingId != null ? "Simpan Perubahan" : "Tambah"}
            </button>
            {editingId != null ? (
              <button
                type="button"
                className="btn btn-outline"
                onClick={resetForm}
              >
                Batal
              </button>
            ) : null}
          </div>
        </form>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama</th>
                <th>Kategori</th>
                <th>Harga</th>
                <th>Stok</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="admin-table__empty">
                    Belum ada produk.
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td className="admin-table__name">{p.name}</td>
                    <td>{p.category}</td>
                    <td>{formatMoney(p.price)}</td>
                    <td>{p.stock}</td>
                    <td className="admin-table__actions">
                      <button
                        type="button"
                        className="btn btn-outline"
                        onClick={() => startEdit(p)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDelete(p.id)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function OrdersManager() {
  const [orders, setOrdersState] = useState(() => getOrders());

  useEffect(() => {
    setOrdersState(getOrders());
  }, []);

  const updateStatus = (id, status) => {
    const next = orders.map((o) => (o.id === id ? { ...o, status } : o));
    setOrders(next);
    setOrdersState(next);
    showAlert({
      title: "Berhasil",
      text: "Status pesanan diperbarui.",
      icon: "success",
    });
  };

  const deleteOrder = async (id) => {
    const ok = await showConfirm({
      title: "Hapus Pesanan",
      text: "Yakin ingin menghapus pesanan ini?",
      confirmText: "Hapus",
    });
    if (!ok) return;
    const next = orders.filter((o) => o.id !== id);
    setOrders(next);
    setOrdersState(next);
    showAlert({
      title: "Dihapus",
      text: "Pesanan berhasil dihapus.",
      icon: "success",
    });
  };

  return (
    <section className="admin-section">
      <div className="admin-section__header">
        <div>
          <h2>Kelola Pesanan</h2>
          <p className="admin-section__subtitle">
            Pesanan dibuat saat user checkout
          </p>
        </div>
        <div className="admin-section__meta">Total: {orders.length}</div>
      </div>

      {orders.length === 0 ? (
        <div className="admin-empty">
          Belum ada pesanan. Buat pesanan dari halaman Checkout.
        </div>
      ) : (
        <div className="admin-orders">
          {orders.map((o) => (
            <div key={o.id} className="admin-order">
              <div className="admin-order__top">
                <div>
                  <div className="admin-order__id">{o.id}</div>
                  <div className="admin-order__meta">
                    {formatDate(o.createdAt)} •{" "}
                    {o.paymentMethod?.toUpperCase?.() || o.paymentMethod}
                  </div>
                </div>

                <div className="admin-order__right">
                  <div className="admin-order__total">
                    {formatMoney(o.totalPrice)}
                  </div>
                  <select
                    className="admin-order__status"
                    value={o.status || "Diterima"}
                    onChange={(e) => updateStatus(o.id, e.target.value)}
                  >
                    <option value="Diterima">Diterima</option>
                    <option value="Diproses">Diproses</option>
                    <option value="Dikirim">Dikirim</option>
                    <option value="Selesai">Selesai</option>
                    <option value="Dibatalkan">Dibatalkan</option>
                  </select>
                </div>
              </div>

              <div className="admin-order__customer">
                <div>
                  <strong>{o.customer?.name}</strong> — {o.customer?.email}
                </div>
                <div className="admin-order__address">
                  {o.customer?.address}
                </div>
              </div>

              <div className="admin-order__items">
                {Array.isArray(o.items) && o.items.length > 0 ? (
                  <ul>
                    {o.items.map((it) => (
                      <li key={`${o.id}-${it.id}`}>
                        {it.name} — x{it.quantity} ({formatMoney(it.price)})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="admin-order__empty">Item tidak tersedia.</div>
                )}
              </div>

              <div className="admin-order__actions">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteOrder(o.id)}
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function UsersManager() {
  const [users, setUsersState] = useState(() => getUsers());
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ username: "", password: "" });

  useEffect(() => {
    setUsersState(getUsers());
  }, []);

  const reset = () => {
    setEditingId(null);
    setForm({ username: "", password: "" });
  };

  const startEdit = (u) => {
    setEditingId(u.id);
    setForm({ username: u.username || "", password: u.password || "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username.trim() || !form.password) {
      showAlert({
        title: "Validasi",
        text: "Username dan password wajib diisi.",
        icon: "warning",
      });
      return;
    }

    const next = [...users];
    const normalized = {
      username: form.username.trim(),
      password: String(form.password),
    };

    if (editingId != null) {
      const idx = next.findIndex((u) => u.id === editingId);
      if (idx === -1) return;

      next[idx] = { ...next[idx], ...normalized };
      setUsers(next);
      setUsersState(next);
      showAlert({
        title: "Berhasil",
        text: "User diperbarui.",
        icon: "success",
      });
      reset();
      return;
    }

    if (next.some((u) => u.username === normalized.username)) {
      showAlert({
        title: "Gagal",
        text: "Username sudah digunakan.",
        icon: "error",
      });
      return;
    }

    const newId = createUserId(next);
    next.unshift({ id: newId, ...normalized });
    setUsers(next);
    setUsersState(next);
    showAlert({
      title: "Berhasil",
      text: "User ditambahkan.",
      icon: "success",
    });
    reset();
  };

  const handleDelete = async (id) => {
    const ok = await showConfirm({
      title: "Hapus User",
      text: "Yakin ingin menghapus user ini?",
      confirmText: "Hapus",
    });
    if (!ok) return;

    const next = users.filter((u) => u.id !== id);
    setUsers(next);
    setUsersState(next);
    if (editingId === id) reset();
    showAlert({
      title: "Dihapus",
      text: "User berhasil dihapus.",
      icon: "success",
    });
  };

  return (
    <section className="admin-section">
      <div className="admin-section__header">
        <div>
          <h2>Kelola User</h2>
          <p className="admin-section__subtitle">
            User login app diambil dari data ini
          </p>
        </div>
        <div className="admin-section__meta">Total: {users.length}</div>
      </div>

      <div className="admin-panel">
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="admin-form__title">
            {editingId != null ? "Edit User" : "Tambah User"}
          </div>

          <div className="admin-form__grid admin-form__grid--2">
            <div className="form-group">
              <label>Username</label>
              <input
                name="username"
                value={form.username}
                onChange={(e) =>
                  setForm((p) => ({ ...p, username: e.target.value }))
                }
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                name="password"
                value={form.password}
                onChange={(e) =>
                  setForm((p) => ({ ...p, password: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="admin-form__actions">
            <button className="btn btn-primary" type="submit">
              <i className="fa-solid fa-floppy-disk"></i>
              {editingId != null ? "Simpan" : "Tambah"}
            </button>
            {editingId != null ? (
              <button type="button" className="btn btn-outline" onClick={reset}>
                Batal
              </button>
            ) : null}
          </div>
        </form>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Password</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="admin-table__empty">
                    Belum ada user.
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td className="admin-table__name">{u.username}</td>
                    <td className="admin-table__mono">{u.password}</td>
                    <td className="admin-table__actions">
                      <button
                        type="button"
                        className="btn btn-outline"
                        onClick={() => startEdit(u)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDelete(u.id)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default function AdminDashboard({ adminUser, onLogout }) {
  return (
    <section className="admin-page">
      <header className="admin-header">
        <div className="admin-header__left">
          <div className="admin-header__badge" aria-hidden="true">
            <i className="fa-solid fa-shield-halved"></i>
          </div>
          <div>
            <h1 className="admin-header__title">Admin Dashboard</h1>
            <p className="admin-header__subtitle">
              Login sebagai <strong>{adminUser?.username || "admin"}</strong>
            </p>
          </div>
        </div>

        <button type="button" className="admin-logout" onClick={onLogout}>
          <i className="fa-solid fa-right-from-bracket"></i> Logout
        </button>
      </header>

      <div className="admin-stack">
        <ProductsManager />
        <OrdersManager />
        <UsersManager />
      </div>
    </section>
  );
}
